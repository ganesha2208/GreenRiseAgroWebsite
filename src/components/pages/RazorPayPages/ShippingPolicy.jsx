import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const ShippingPolicy = () => {
  return (
    <Container className="py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Shipping Policy
        </h1>
        <p className="text-lg text-gray-600">
          Green Rise Agro Industries - Delivering Quality Across India
        </p>
      </div>

      {/* Main Content */}
      <Row className="g-4">
        {/* Payment Policy Card */}
        <Col md={6}>
          <Card className="h-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Card.Body className="p-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-wallet text-green-600 text-2xl mr-3"></i>
                <h2 className="text-xl font-semibold text-gray-800">Payment Policy</h2>
              </div>
              <Card.Text className="text-gray-600">
                <ul className="list-disc pl-5 space-y-2">
                  <li>100% advance payment required for all orders</li>
                  <li>Secure payment processing through Razorpay</li>
                  <li>Multiple payment options available</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Delivery Information Card */}
        <Col md={6}>
          <Card className="h-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Card.Body className="p-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-truck text-green-600 text-2xl mr-3"></i>
                <h2 className="text-xl font-semibold text-gray-800">Delivery Information</h2>
              </div>
              <Card.Text className="text-gray-600">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Pan India delivery available</li>
                  <li>Shipping charges borne by the customer</li>
                  <li>Delivery timeline varies by location</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Size Information */}
        <Col md={6}>
          <Card className="h-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Card.Body className="p-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-box text-green-600 text-2xl mr-3"></i>
                <h2 className="text-xl font-semibold text-gray-800">Minimum Order Size</h2>
              </div>
              <Card.Text className="text-gray-600">
                <p>Each product has a specific minimum order quantity:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Please check individual product pages for minimum order requirements</li>
                  <li>Bulk orders are welcome</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Information */}
        <Col md={6}>
          <Card className="h-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Card.Body className="p-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-headset text-green-600 text-2xl mr-3"></i>
                <h2 className="text-xl font-semibold text-gray-800">Need Help?</h2>
              </div>
              <Card.Text className="text-gray-600">
                <p>For any shipping-related queries:</p>
                <ul className="list-none pl-5 space-y-2 mt-2">
                  <li>📧 Email: support@greenriseagro.com</li>
                  <li>📞 Phone: +91-XXXXXXXXXX</li>
                  <li>⏰ Working Hours: Mon-Sat (9:00 AM - 6:00 PM)</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Information */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Additional Information
        </h3>
        <p className="text-gray-600">
          At Green Rise Agro Industries, we strive to provide the best shipping experience 
          to our customers. All orders are processed and shipped with utmost care to ensure 
          quality delivery. Shipping times may vary depending on your location and the 
          product availability.
        </p>
      </div>
    </Container>
  );
};

export default ShippingPolicy;
