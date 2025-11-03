import React from 'react';
import { FileText, Users, PenTool, Brain, Upload, Search, Lightbulb, FileCheck, UserCheck } from 'lucide-react';

const AdvocAILanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Navigate Legal Documents
            <br />
            <span className="text-blue-600">with AI</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform complex legal jargon into plain English. Understand your rights,
            obligations, and risks with AI-powered analysis and expert lawyer support.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Powerful Features for Legal Clarity
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* AI Legal Assistant */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">AI Legal Assistant</h4>
              <p className="text-gray-600">
                Get instant answers to legal questions and guidance through
                complex processes with our intelligent chatbot.
              </p>
            </div>

            {/* Document Analyzer */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Document Analyzer</h4>
              <p className="text-gray-600">
                Upload any legal document and get a
                simplified breakdown, risk analysis,
                and key points highlighted.
              </p>
            </div>

            {/* Lawyer Connection */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Lawyer Connection</h4>
              <p className="text-gray-600">
                Connect with qualified lawyers for
                complex cases when AI assistance
                isn't enough.
              </p>
            </div>

            {/* Custom Document Creation */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Custom Document Creation</h4>
              <p className="text-gray-600">
                Generate tailored legal documents
                for various needs, from contracts to
                agreements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How AdvocAI Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How AdvocAI Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div className="mb-4">
                <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="text-xl font-bold text-gray-900">Upload or Create</h4>
              </div>
              <p className="text-gray-600">
                Upload your existing legal document OR start creating a
                custom document using our AI-powered templates and guided
                forms.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <div className="mb-4">
                <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="text-xl font-bold text-gray-900">AI Analysis</h4>
              </div>
              <p className="text-gray-600">
                Our AI breaks down complex legal language into simple,
                understandable terms and identifies key risks and
                important clauses.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div className="mb-4">
                <Lightbulb className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="text-xl font-bold text-gray-900">Get Clear Insights</h4>
              </div>
              <p className="text-gray-600">
                Receive a comprehensive summary, risk assessment, and
                actionable recommendations tailored to your specific
                situation.
              </p>
            </div>
          </div>

          {/* Steps 4-5 */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <div className="mb-4">
                <FileCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="text-xl font-bold text-gray-900">Custom Document Creation</h4>
              </div>
              <p className="text-gray-600">
                Generate tailored legal documents - contracts,
                agreements, wills, NDAs - using our intelligent templates and
                legal expertise.
              </p>
            </div>

            {/* Step 5 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">5</span>
              </div>
              <div className="mb-4">
                <UserCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="text-xl font-bold text-gray-900">Expert Support</h4>
              </div>
              <p className="text-gray-600">
                If needed, connect with qualified lawyers for additional
                guidance, review, and legal representation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvocAILanding;