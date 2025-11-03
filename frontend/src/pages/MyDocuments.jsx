import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Plus, Search, Edit, Download, Trash2 } from 'lucide-react';
import axios from '../api/axios';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

const MyDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('/conversations/');
        setConversations(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (error) {
        console.error('Error fetching conversations:', error);
        toast.error('Could not fetch document history.');
      }
    };
    fetchConversations();
  }, []);

  const handleNewDocument = () => {
    navigate('/document-creation');
  };

  const handleDownload = async (conv) => {
    try {
      const response = await axios.get(`/conversations/${conv._id}/download/`, {
        responseType: 'blob',
      });
      saveAs(response.data, `${conv.title || 'legal_document'}.pdf`);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Failed to download document. The document may not have been generated yet.');
    }
  };

  const handleDelete = async (convId) => {
    if (window.confirm('Are you sure you want to delete this document history?')) {
      try {
        await axios.delete(`/conversations/${convId}/`);
        setConversations(conversations.filter(c => c._id !== convId));
        toast.success('Conversation deleted.');
      } catch (error) {
        console.error('Error deleting conversation:', error);
        toast.error('Failed to delete conversation.');
      }
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-gray-400 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">My Documents</h1>
          </div>
          <button
            onClick={handleNewDocument}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>New Document</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="overflow-hidden">
            {filteredConversations.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <FileText className="w-8 h-8 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {conv.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Created on: {new Date(conv.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/document-creation/${conv._id}`}
                          className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Open</span>
                        </Link>
                        <button
                          onClick={() => handleDownload(conv)}
                          disabled={!conv.latest_document}
                          className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Download</span>
                        </button>
                        <button
                          onClick={() => handleDelete(conv._id)}
                          className="flex items-center space-x-1 px-3 py-2 border border-red-300 rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first document to get started'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDocuments;
