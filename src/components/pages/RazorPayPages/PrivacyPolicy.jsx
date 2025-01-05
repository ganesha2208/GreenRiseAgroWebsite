import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "collection", title: "1. Information We Collect" },
    { id: "usage", title: "2. How We Use Your Information" },
    { id: "security", title: "3. Data Security" },
    { id: "cookies", title: "4. Cookie Policy" },
    { id: "rights", title: "5. Your Rights" },
    { id: "updates", title: "6. Policy Updates" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl py-10 px-6 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-center text-blue-100 text-lg">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg">
          {/* Table of Contents */}
          <nav className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className={`p-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-50 text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Content Section */}
          <div className="p-8 space-y-10">
            {/* Information Collection */}
            <section id="collection" className="scroll-mt-20 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
                1. Information We Collect
              </h2>
              <div className="grid gap-4">
                <div className="bg-blue-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Personal Information
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Name, email address, and contact details
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Billing and shipping information
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Technical Information
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Device and browser information
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      IP address and usage data
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section id="usage" className="scroll-mt-20 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
                2. How We Use Your Information
              </h2>
              <div className="grid gap-4">
                <div className="bg-blue-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Usage Purposes
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      To provide and maintain our service
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      To notify you about changes to our service
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section id="security" className="scroll-mt-20 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
                3. Data Security
              </h2>
              <div className="grid gap-4">
                <div className="bg-blue-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Security Measures
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      We implement various security measures
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Data encryption and access controls
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Policy */}
            <section id="cookies" className="scroll-mt-20 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
                4. Cookie Policy
              </h2>
              <div className="grid gap-4">
                <div className="bg-blue-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Use of Cookies
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      We use cookies to enhance user experience
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      You can manage your cookie preferences
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section id="rights" className="scroll-mt-20 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
                5. Your Rights
              </h2>
              <div className="grid gap-4">
                <div className="bg-blue-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    User Rights
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Right to access your personal data
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Right to request deletion of your data
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Policy Updates */}
            <section id="updates" className="scroll-mt-20 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
                6. Policy Updates
              </h2>
              <div className="grid gap-4">
                <div className="bg-blue-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Update Notifications
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      We will notify you of any changes
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Review the updated policy regularly
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Section - Enhanced */}
            <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Contact Our Privacy Team
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Get in Touch
                  </h3>
                  <p className="text-gray-600">
                    Have questions about our privacy practices? We're here to
                    help.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:privacy@yourwebsite.com"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      greenriseagro@gmail.com
                    </a>
                    <p className="flex items-center text-blue-600">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +91 08857026429
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Response Time
                  </h3>
                  <p className="text-gray-600">
                    We typically respond to privacy-related inquiries within
                    24-48 business hours.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
