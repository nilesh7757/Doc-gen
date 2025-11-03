import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, PenTool, Send, Download, User, Bot, Save, Edit, Eye } from 'lucide-react';
import axios from '../api/axios';
import { saveAs } from 'file-saver';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/MarkdownPreview.css';
import toast from 'react-hot-toast';

const DocumentCreation = () => {
  const { id: urlConversationId } = useParams();
  
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalDocument, setFinalDocument] = useState(null);
  const [conversationId, setConversationId] = useState(urlConversationId);
  const [isEditing, setIsEditing] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (conversationId) {
        try {
          const response = await axios.get(`/conversations/${conversationId}/`);
          const conversation = response.data;
          setMessages(conversation.messages || []);
          setTitle(conversation.title || '');
          if (conversation.latest_document) {
            setFinalDocument(conversation.latest_document);
          }
        } catch (error) {
          console.error('Error fetching conversation:', error);
          toast.error('Could not load conversation.');
          setConversationId(null); // Reset if fetch fails
        }
      }
    };
    fetchConversation();
  }, [conversationId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = { sender: 'user', text: chatMessage, type: 'display' };
    setMessages(prev => [...prev, userMessage]);
    setChatMessage('');
    setIsGenerating(true);

    let payloadMessages = [...messages, userMessage];

    // If a document already exists, create a special context for the update
    if (finalDocument) {
      payloadMessages = [
        { sender: 'user', text: `Here is the legal document we are working on. Please use this as the basis for any updates.\n\n---\n\n${finalDocument}` },
        { sender: 'bot', text: 'Okay, I have the document. What changes would you like to make?' },
        userMessage
      ];
    }

    try {
      const response = await axios.post('chat/', { messages: payloadMessages });
      const aiResponse = response.data;
      
      if (aiResponse.type === 'document') {
        const documentMarkdown = aiResponse.text;
        setFinalDocument(documentMarkdown);
        
        // Add the context and display messages to the *actual* history
        const newBotMessages = [
          { sender: 'bot', type: 'document_context', text: documentMarkdown },
          { sender: 'bot', type: 'display', text: "I have updated the document for you. You can review the changes and ask for more updates if needed." }
        ];
        setMessages(prev => [...prev, ...newBotMessages]);

      } else {
        setMessages(prev => [...prev, { sender: 'bot', type: 'display', text: aiResponse.text }]);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
      setMessages(prev => [...prev, { sender: 'bot', type: 'display', text: `Error: ${errorMessage}` }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveConversation = async () => {
    if (!title.trim() || messages.length === 0) {
      toast.error('Please provide a title and have at least one message in the conversation.');
      return;
    }

    const payload = {
      title: title,
      messages: messages,
      latest_document: finalDocument
    };

    try {
      if (conversationId) {
        // Update existing conversation
        await axios.put(`/conversations/${conversationId}/`, payload);
        toast.success('Conversation updated successfully!');
      } else {
        // Create new conversation
        const response = await axios.post('/conversations/', payload);
        setConversationId(response.data.id); // Set the new ID
        toast.success('Conversation saved successfully!');
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
      toast.error('Failed to save conversation.');
    }
  };

  const handleDownloadPdf = async () => {
    if (!finalDocument) return;

    try {
      const response = await axios.post('/download-pdf/', {
        document_content: finalDocument
      }, {
        responseType: 'blob',
      });
      saveAs(response.data, `${title || 'legal_document'}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Create New Document</h1>
          </div>
          <p className="text-xl text-gray-600">
            {conversationId ? 'Continue your conversation' : 'Build your legal document from scratch with our AI assistant.'}
          </p>
        </div>

        {/* Save Conversation Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 flex items-center space-x-4">
            <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter conversation title to save..."
                className="flex-1 px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
            />
            <button
                onClick={handleSaveConversation}
                className="px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
                <Save className="w-5 h-5" />
                <span>{conversationId ? 'Update' : 'Save'}</span>
            </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div ref={chatContainerRef} className="h-96 overflow-y-auto mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            {messages.filter(msg => msg.type !== 'document_context').map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 my-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <Bot className="w-6 h-6 text-blue-600 flex-shrink-0" />}
                <div className={`p-3 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <p style={{whiteSpace: 'pre-wrap'}}>{msg.text}</p>
                </div>
                {msg.sender === 'user' && <User className="w-6 h-6 text-gray-600 flex-shrink-0" />}
              </div>
            ))}
            {isGenerating && (
              <div className="flex items-start gap-3 my-4">
                <Bot className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="p-3 rounded-lg bg-gray-200 text-gray-800"><i>Typing...</i></div>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Continue the conversation..."
              className="flex-1 px-6 py-4 text-lg border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-blue-50 resize-none"
              rows={1}
              disabled={isGenerating}
            />
            <button
              onClick={handleSendMessage}
              disabled={isGenerating}
              className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:bg-gray-400"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>

        {finalDocument && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Generated Document Preview</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {isEditing ? <Eye className="w-4 h-4 text-gray-600" /> : <Edit className="w-4 h-4 text-gray-600" />}
                <span className="text-sm text-gray-700">{isEditing ? 'Preview' : 'Edit'}</span>
              </button>
            </div>

            {isEditing ? (
              <textarea
                value={finalDocument}
                onChange={(e) => setFinalDocument(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
              />
            ) : (
              <div className="markdown-preview">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{finalDocument}</ReactMarkdown>
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={handleDownloadPdf}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
              >
                <Download className="w-6 h-6" />
                <span>Download as PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCreation;
