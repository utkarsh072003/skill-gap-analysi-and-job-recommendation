import pickle
import pandas as pd
from flask_cors import CORS
from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from sklearn.feature_extraction.text import TfidfVectorizer

CORS(app, supports_credentials=True)

# Load job dataset
data_path = "dataset.csv"
df = pd.read_csv(data_path)
df['Apply Here'] = df['Apply Here'].fillna('')

# Ensure 'Date_Posted' is in datetime format
df['Date_Posted'] = pd.to_datetime(df['Date_Posted'], errors='coerce')
df = df.dropna(subset=['Date_Posted'])

#  Parse Salary Range Properly
def parse_salary(salary):
    try:
        min_salary, max_salary = salary.lower().replace('lpa', '').split('-')
        return float(min_salary.strip()), float(max_salary.strip())
    except:
        return None, None

df[['Min Salary', 'Max Salary']] = df['Salary_Range'].apply(lambda x: pd.Series(parse_salary(x)))
df[['Min Salary', 'Max Salary']] = df[['Min Salary', 'Max Salary']].fillna(0.0)  # Fill missing values

#  Load vectorizer and model from a single pickle file
with open("job_recom.pkl", "rb") as f:
    vectorizer, model = pickle.load(f)

# Load model and vectorizer
with open("model2.pkl", "rb") as model_file:
    model2 = pickle.load(model_file)

with open("vectorizer2.pkl", "rb") as vectorizer_file:
    vectorizer2 = pickle.load(vectorizer_file)

# Load job roles and skills data
job_data = pd.read_csv("job_roles_skills.csv")

# Optional: clean NaNs
job_data = job_data.dropna(subset=["Required_Skills"])

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

def recommend_jobs(user_skills, min_salary_lpa, user_date):
    user_vector = vectorizer.transform([user_skills])  #  Transform user input dynamically
    
    #  Use predict_proba() for ranking jobs by probability
    predictions = model.predict_proba(user_vector)[0]  # Get probabilities for each class
    job_scores = sorted(zip(model.classes_, predictions), key=lambda x: x[1], reverse=True)
    top_jobs = [job[0] for job in job_scores[:2]]  # Top 3 most relevant jobs
    
    
    date_gap = user_date - timedelta(days=120)
    filtered_jobs = df[df['Job_Title'].isin(top_jobs)]
    filtered_jobs = filtered_jobs[
        ((filtered_jobs['Min Salary'] >= min_salary_lpa) | (filtered_jobs['Max Salary'] >= min_salary_lpa)) &
        ((filtered_jobs['Date_Posted'] >= date_gap) & (filtered_jobs['Date_Posted'] <= user_date)) &
        (filtered_jobs['job_status'].str.lower() == 'open')
    ]
    
    return filtered_jobs[['Job_Title', 'Company_Name', 'Skills_Required', 'Salary_Range', 'Job_Type', 'Location', 'Date_Posted', 'Apply Here']].to_dict(orient='records')


@app.route("/recommend_jobs", methods=["POST", "OPTIONS"])
def get_recommendations():
    try:
        data = request.json
        user_skills = data.get("skills", "").strip()
        min_salary_lpa = float(data.get("min_salary_lpa", 0))
        user_date = datetime.strptime(data.get("date", ""), "%Y-%m-%d")

        recommended_jobs = recommend_jobs(user_skills, min_salary_lpa, user_date)
        return jsonify(recommended_jobs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

def recommend_roles_with_gaps(model, vectorizer, df, user_skills):
    user_vector = vectorizer.transform([user_skills])
    probabilities = model.predict_proba(user_vector)[0]
    role_indices = probabilities.argsort()[-2:][::-1]
    role_names = model.classes_
    top_roles = [(role_names[i], probabilities[i]) for i in role_indices]

    recommendations = []
    for role, prob in top_roles:
        role_data = df[df['Job_Role'] == role]
        if not role_data.empty:
            required_skills = set(map(str.lower, map(str.strip, role_data['Required_Skills'].iloc[0].split(","))))
            user_skills_set = set(map(str.lower, map(str.strip, user_skills.split(","))))
            missing_skills = required_skills - user_skills_set

            recommendations.append({
                "Role": role,
                "Probability": round(prob, 4),
                "Missing_Skills": list(missing_skills)
            })

    return {
        "User Skills": user_skills,
        "Recommendations": recommendations
    }

@app.route("/skill-gap-analysis", methods=["POST", "OPTIONS"])
def skill_gap_analysis():
    try:
        data = request.get_json()
        user_skills = data.get("skills", "")
        if not user_skills:
            return jsonify({"error": "No skills provided"}), 400

        recommendations = recommend_roles_with_gaps(model2, vectorizer2, job_data, user_skills)
        return jsonify(recommendations)

    except Exception as e:
        print("🔥 Error occurred:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

