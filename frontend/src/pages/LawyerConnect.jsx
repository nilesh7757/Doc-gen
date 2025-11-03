import React from 'react';

const LawyerConnect = () => {
  // Sample lawyer data - you can replace this with data from your backend
  const lawyers = Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    name: "Jane Doe",
    specialization: "Juris Doctor (J.D.), Corporate Law",
    photo: null // Will show placeholder
  }));

  const handleViewProfile = (lawyerId) => {
    console.log('Viewing profile for lawyer:', lawyerId);
    // Here you would typically navigate to a detailed lawyer profile page
    // or open a modal with lawyer details
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lawyer Connect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with qualified lawyers for your legal needs. Browse our directory of experienced legal professionals.
          </p>
        </div>

        {/* Lawyers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              {/* Profile Photo Placeholder */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-blue-100 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">Photo</span>
                </div>
              </div>

              {/* Lawyer Information */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lawyer.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {lawyer.specialization}
                </p>
              </div>

              {/* View Profile Button */}
              <button
                onClick={() => handleViewProfile(lawyer.id)}
                className="w-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>

        {/* Load More Section (Optional) */}
        <div className="text-center mt-12">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Load More Lawyers
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerConnect;
