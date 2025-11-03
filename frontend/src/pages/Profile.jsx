import React, { useState } from "react";
import { User, Mail, Phone } from "lucide-react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    username: 'JohnDoe123',
    email: 'john.doe@example.com',
    phone: '1234567890'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', profileData);
    setIsEditing(false);
    // Here you would typically send the data to your backend
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/30 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            AdvocAI
          </div>
          <div className="flex items-center space-x-8">
            <a href="/home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Home</a>
            <a href="/document-analyser" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Document Analyser</a>
            <a href="/document-creation" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Document Creation</a>
            <a href="/lawyer-connect" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Lawyer Connect</a>
            <a href="/my-documents" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">My Documents</a>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                👤
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Profile Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-white text-4xl font-bold">
                {getInitials(profileData.fullName)}
              </span>
            </div>
          </div>

          {/* Profile Information Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Personal Information
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-500 text-sm font-medium mb-1 block">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        className="w-full text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none transition-colors duration-200"
                      />
                    ) : (
                      <div className="text-lg font-semibold text-gray-800">{profileData.fullName}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-500 text-sm font-medium mb-1 block">User Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleInputChange}
                        className="w-full text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none transition-colors duration-200"
                      />
                    ) : (
                      <div className="text-lg font-semibold text-gray-800">{profileData.username}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-500 text-sm font-medium mb-1 block">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none transition-colors duration-200"
                      />
                    ) : (
                      <div className="text-lg font-semibold text-gray-800">{profileData.email}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-500 text-sm font-medium mb-1 block">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none transition-colors duration-200"
                      />
                    ) : (
                      <div className="text-lg font-semibold text-gray-800">{profileData.phone}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSaveProfile}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Save Profile
                </button>
              </div>
            )}

            {!isEditing && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;