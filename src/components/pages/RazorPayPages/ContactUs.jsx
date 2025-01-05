import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../../FirebaseConfig";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    email: "",
    companyName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone || !formData.message) {
      return toast.error("Please fill in all required fields");
    }

    // Regex validation for 10-digit phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      return toast.error("Please enter a valid 10-digit phone number");
    }

    // New validation for phone number length
    if (formData.phone.length !== 10) {
      return toast.error("Please enter exactly 10 digits for the phone number");
    }

    try {
      // Prepare contact data
      const contactData = {
        ...formData,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        status: "new",
      };

      // Prepare user data
      const userData = {
        name: formData.name,
        phoneNumber: formData.phone,
        email: formData.email || "",
        companyName: formData.companyName || "",
        role: "user",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // Add to both collections
      const contactRef = collection(fireDB, "contacts");
      const userRef = collection(fireDB, "user");

      await Promise.all([
        addDoc(contactRef, contactData),
        addDoc(userRef, userData),
      ]);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        message: "",
        email: "",
        companyName: "",
      });
      setShowAdditionalDetails(false);

      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <Container className="py- md:py-12">
      {/* Header Section */}
      <div className="text-center mb-4 md:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-4">
          Contact Us
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          We'd love to hear from you. Get in touch with us!
        </p>
      </div>

      <Row className="g-2 md:g-4">
        {/* Contact Information Card */}
        <Col lg={6}>
          <Card className="shadow-lg h-100">
            <Card.Body className="p-4 md:p-6">
              <div className="space-y-4 md:space-y-6">
                {/* Company Details */}
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">
                    Green Rise Agro Industries
                  </h2>
                  <div className="flex items-start space-x-2 md:space-x-3 text-gray-600">
                    <i className="fas fa-user-tie mt-1"></i>
                    <p>Chandrakant Jadhav (Partner)</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-2 md:space-x-3 text-gray-600">
                  <i className="fas fa-map-marker-alt mt-1 text-green-600"></i>
                  <p>
                    Survey No. 13, Office No. 6,
                    <br />
                    Shivanand Complex, Satavwadi
                    <br />
                    Hadapsar, Pune - 411028
                    <br />
                    Maharashtra, India
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <i className="fas fa-phone text-green-600"></i>
                    <a
                      href="tel:08048988846"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      080-4898-8846
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <i className="fas fa-envelope text-green-600"></i>
                    <a
                      href="mailto:contact@greenriseagro.com"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      contact@greenriseagro.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
                    Business Hours
                  </h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Form */}
        <Col lg={6}>
          <Card className="shadow-lg h-100">
            <Card.Body className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">
                Describe Your Requirement
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 md:mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="p-2 md:p-3 focus:ring-2 focus:ring-green-500"
                  />
                </Form.Group>

                <Form.Group className="mb-3 md:mb-4">
                  <div className="flex">
                    <select className="p-2 md:p-3 border rounded-l w-16 md:w-20 bg-gray-50">
                      <option>+91</option>
                    </select>
                    <Form.Control
                      type="tel"
                      placeholder="Enter Your Number"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="p-2 md:p-3 rounded-l-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3 md:mb-4">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="I would like to..."
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="p-2 md:p-3 focus:ring-2 focus:ring-green-500"
                  />
                </Form.Group>

                <div className="mb-3 md:mb-4">
                  <Button
                    variant="link"
                    className="text-green-600 p-0"
                    onClick={() =>
                      setShowAdditionalDetails(!showAdditionalDetails)
                    }
                  >
                    {showAdditionalDetails ? "- Hide" : "+ View"} Additional
                    Details
                  </Button>
                </div>

                {showAdditionalDetails && (
                  <div className="space-y-3 md:space-y-4 mb-3 md:mb-4">
                    <Form.Group>
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="p-2 md:p-3 focus:ring-2 focus:ring-green-500"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyName: e.target.value,
                          })
                        }
                        className="p-2 md:p-3 focus:ring-2 focus:ring-green-500"
                      />
                    </Form.Group>
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 
                           text-white py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-xl transition-all transform hover:scale-[1.02]"
                >
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Enhanced Map Section */}
      <div className="mt-8 md:mt-12">
        <Card className="shadow-2xl overflow-hidden">
          <Card.Body className="p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5767279963797!2d73.94499733!3d18.49550667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI5JzQzLjgiTiA3M8KwNTYnNDIuMCJF!5e0!3m2!1sen!2sin!4v1629789876543!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </Card.Body>
          <Card.Footer className="bg-white p-4 md:p-6">
            <div className="flex justify-between items-center flex-wrap gap-2 md:gap-4">
              <div className="text-base md:text-lg text-gray-700">
                <i className="fas fa-map-marker-alt text-green-600 mr-2 md:mr-3"></i>
                Satavwadi, Hadapsar, Pune - 411028
              </div>
              <a
                href="https://www.google.com/maps?q=18.49550667,73.94499733"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 
                         hover:to-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all transform hover:scale-[1.02]"
              >
                <i className="fas fa-directions mr-1 md:mr-2"></i>
                Get Directions
              </a>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default ContactUs;
