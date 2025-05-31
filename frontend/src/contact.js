import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>
          Have questions or need assistance? Reach out to us, and we’ll be happy to help you!
        </p>

        <div className="contact-info">
          <div className="info-box">
            <h3>Email</h3>
            <p>support@skillanalyzer.com</p>
          </div>
          <div className="info-box">
            <h3>Phone</h3>
            <p>+91-9523865110</p>
          </div>
          <div className="info-box">
            <h3>Address</h3>
            <p>New Delhi, India</p>
          </div>
        </div>

        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="btn btn-blue">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
