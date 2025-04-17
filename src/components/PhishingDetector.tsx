import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const PhishingDetector = () => {
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState<null | { risk: string; explanation: string }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuthStore();

  const analyzeEmail = async () => {
    if (!emailContent.trim()) {
      setError('Please enter email content to analyze');
      return;
    }

    if (!user) {
      setError('Please sign in to use the email analyzer');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-email`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'x-user-id': user.id,
        },
        body: JSON.stringify({ content: emailContent }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || typeof data.risk !== 'string') {
        throw new Error('Invalid response format');
      }

      setResult(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Mail className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold">Email Analysis Tool</h3>
      </div>

      <div className="mb-6">
        <label htmlFor="email-content" className="block text-sm font-medium text-gray-700 mb-2">
          Paste email content to analyze
        </label>
        <textarea
          id="email-content"
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          placeholder="Paste the suspicious email content here..."
        />
      </div>

      <button
        onClick={analyzeEmail}
        disabled={loading || !user}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Analyzing...
          </>
        ) : (
          'Analyze Email'
        )}
      </button>

      {!user && (
        <p className="mt-2 text-sm text-gray-600">
          Please sign in to use the email analyzer
        </p>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 rounded-md border">
          <div className="flex items-center mb-4">
            {result.risk === 'high' ? (
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            )}
            <span className={`font-semibold ${
              result.risk === 'high' ? 'text-red-700' : 'text-green-700'
            }`}>
              {result.risk === 'high' ? 'High Risk - Potential Phishing Detected' : 'Low Risk - Likely Safe'}
            </span>
          </div>
          <p className="text-gray-600">{result.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default PhishingDetector;