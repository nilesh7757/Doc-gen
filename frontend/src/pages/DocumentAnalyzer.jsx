import React, { useState } from 'react';
import { Upload, Bot, MessageCircle, Send, FileText, Search } from 'lucide-react';

const DocumentAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'AdvocAI',
      message: "Hi! I've analyzed your document. Feel free to ask me any questions about the terms, risks, or anything else you'd like to understand better.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Here you would typically send the file to your backend for analysis
      console.log('File uploaded:', file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
      console.log('File dropped:', files[0].name);
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        sender: 'User',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory([...chatHistory, newMessage]);
      setChatMessage('');
      
      // Here you would typically send the message to your AI backend
      // and add the response to chatHistory
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Document Analyser</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your legal document and get instant AI-powered analysis, risk assessment, and plain English explanations of complex legal terms.
          </p>
        </div>

        {/* Main Content Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Document Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Upload className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Upload Document</h2>
            </div>
            
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="flex flex-col items-center">
                <FileText className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drag and drop your legal document here
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse files (PDF, DOCX, TXT)
                </p>
              </div>
            </div>

            {uploadedFile && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">{uploadedFile.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* AI Analysis Results Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Bot className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">AI Analysis Results</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Search className="w-20 h-20 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                Upload a document to see AI-powered analysis results here
              </p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Ask Questions About Your Document</h2>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'User' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'User'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'User' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="flex space-x-4">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your document...."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
