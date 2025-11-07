import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import { Download, History, Edit } from 'lucide-react';

const DocumentAnalyzer = () => {
  const { id: conversationId } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);
  const [selectedVersionContent, setSelectedVersionContent] = useState('');
  const [selectedVersionNumber, setSelectedVersionNumber] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(`conversations/${conversationId}/`);
        setConversation(response.data);
        // Do not set initial selected version, let user choose
        // if (response.data.document_versions && response.data.document_versions.length > 0) {
        //   const latestVersion = response.data.document_versions[response.data.document_versions.length - 1];
        //   setSelectedVersionContent(latestVersion.content);
        //   setSelectedVersionNumber(latestVersion.version_number);
        // }
      } catch (error) {
        console.error('Error fetching conversation:', error);
        toast.error('Could not load conversation details.');
        navigate('/my-documents'); // Redirect if conversation not found or error
      }
    };

    fetchConversation();
  }, [conversationId, navigate]);

  const handleVersionChange = (event) => {
    const versionNum = parseInt(event.target.value);
    setSelectedVersionNumber(versionNum);
    const version = conversation.document_versions.find(v => v.version_number === versionNum);
    if (version) {
      setSelectedVersionContent(version.content);
    }
  };

  const handleDownloadVersionPdf = async () => {
    if (!conversation || selectedVersionNumber === null) {
      toast.error('Please select a version to download.');
      return;
    }
    try {
      const response = await axios.get(`conversations/${conversationId}/versions/${selectedVersionNumber}/download/`, {
        responseType: 'blob',
      });
      const filename = `${conversation.title || 'document'}_v${selectedVersionNumber}.pdf`;
      saveAs(response.data, filename);
      toast.success(`Version ${selectedVersionNumber} PDF downloaded!`);
    } catch (error) {
      console.error('Error downloading version PDF:', error);
      toast.error(`Failed to download PDF for version ${selectedVersionNumber}.`);
    }
  };

  if (!conversation) {
    return <div className="text-center py-8">Loading conversation...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{conversation.title}</h1>
          <p className="text-xl text-gray-600">Analyze and review document versions.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><History className="w-6 h-6" /> Document Versions</h2>
            <div className="flex items-center gap-3">
              <select
                onChange={handleVersionChange}
                value={selectedVersionNumber || ''}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="" disabled>Select Version</option>
                {conversation.document_versions.map((version) => (
                  <option key={version.version_number} value={version.version_number}>
                    Version {version.version_number} ({new Date(version.uploaded_at).toLocaleString()})
                  </option>
                ))}
              </select>
              <button
                onClick={() => navigate(`/document-creation/${conversationId}?version=${selectedVersionNumber}`)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                disabled={selectedVersionNumber === null}
              >
                <Edit className="w-5 h-5" />
                Edit this Version
              </button>
              <button
                onClick={handleDownloadVersionPdf}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                disabled={selectedVersionNumber === null}
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>

          {selectedVersionContent ? (
            <div className="markdown-preview p-4 border border-gray-200 rounded-lg bg-gray-50" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedVersionContent) }} />
          ) : (
            <p className="text-gray-500 text-center">Select a version to view its content.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
