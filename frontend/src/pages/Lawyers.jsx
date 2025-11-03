import React, { useState } from "react";
import { User, Mail, Phone, GraduationCap, Building, Clock, DollarSign } from "lucide-react";

const LawyerProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    username: 'JohnDoe123',
    email: 'john.doe@example.com',
    phone: '1234567890',
    education: 'Juris Doctor(J.D),Corporate Law Doe',
    lawFirm: 'Doe & Associates LLC',
    experience: '10 Years',
    consultationFee: '1000/hour'
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

  const ProfileField = ({ icon, label, value, name, type = "text" }) => (
    <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <label className="text-gray-500 text-sm font-medium mb-1 block">{label}</label>
          {isEditing ? (
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleInputChange}
              className="w-full text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none transition-colors duration-200"
            />
          ) : (
            <div className="text-lg font-semibold text-gray-800">{value}</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  bg-white">
      {/* Main Content */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Profile Avatar and Name */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-xl mb-4">
              <span className="text-white text-4xl font-bold">
                {getInitials(profileData.fullName)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{profileData.fullName}</h1>
            <p className="text-gray-600 text-lg">{profileData.education}</p>
          </div>

          {/* Personal Information Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
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
              <ProfileField
                icon={<User className="w-6 h-6 text-gray-600" />}
                label="Full Name"
                value={profileData.fullName}
                name="fullName"
              />
              <ProfileField
                icon={<User className="w-6 h-6 text-gray-600" />}
                label="User Name"
                value={profileData.username}
                name="username"
              />
              <ProfileField
                icon={<Mail className="w-6 h-6 text-gray-600" />}
                label="Email"
                value={profileData.email}
                name="email"
                type="email"
              />
              <ProfileField
                icon={<Phone className="w-6 h-6 text-gray-600" />}
                label="Phone"
                value={profileData.phone}
                name="phone"
                type="tel"
              />
            </div>
          </div>

          {/* Professional Details Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Professional Details
            </h2>

            <div className="space-y-6">
              <ProfileField
                icon={<GraduationCap className="w-6 h-6 text-gray-600" />}
                label="Education"
                value={profileData.education}
                name="education"
              />
              <ProfileField
                icon={<Building className="w-6 h-6 text-gray-600" />}
                label="Law Firm"
                value={profileData.lawFirm}
                name="lawFirm"
              />
              <ProfileField
                icon={<Clock className="w-6 h-6 text-gray-600" />}
                label="Experience"
                value={profileData.experience}
                name="experience"
              />
              <ProfileField
                icon={<DollarSign className="w-6 h-6 text-gray-600" />}
                label="Consultation Fee"
                value={profileData.consultationFee}
                name="consultationFee"
              />
            </div>

            {/* Save/Edit Button */}
            <div className="flex justify-center mt-8">
              {isEditing ? (
                <button
                  onClick={handleSaveProfile}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Save Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;