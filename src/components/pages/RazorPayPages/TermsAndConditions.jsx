import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
            Terms and Conditions
          </h1>
          <p className="text-center text-blue-100 italic">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-8">
          {/* Payment Terms */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              1. Payment Terms
            </h2>
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                All payments are processed securely through RazorPay Payment Gateway
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                We accept payments through Credit Cards, Debit Cards, Net Banking, UPI, and Wallets
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                All transactions are encrypted and processed in Indian Rupees (INR)
              </p>
            </div>
          </section>

          {/* Refund Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              2. Refund Policy
            </h2>
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Refund requests will be processed within 5-7 business days
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Refunds will be credited to the original payment method
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Processing fees are non-refundable
              </p>
            </div>
          </section>

          {/* Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              3. Security & Privacy
            </h2>
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                All transaction data is encrypted using industry-standard SSL technology
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                We do not store any sensitive payment information
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Your data is protected as per our Privacy Policy and Indian laws
              </p>
            </div>
          </section>

          {/* User Obligations */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              4. User Obligations
            </h2>
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Users must provide accurate and complete information
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Users are responsible for maintaining account confidentiality
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Fraudulent transactions will be reported to authorities
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: support@yourwebsite.com
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone: +91 XXXXXXXXXX
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
