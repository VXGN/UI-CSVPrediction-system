import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';


interface UploadedFile {
  name: string;
  size: number;
  content: string;
  rows: number;
}

function App() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please upload a CSV file only.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { 
      setError('File size must be less than 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const rows = content.split('\n').filter(row => row.trim()).length;
      
      setUploadedFile({
        name: file.name,
        size: file.size,
        content,
        rows
      });
    };
    reader.readAsText(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <h1 className="text-xl font-semibold">CSV Dashboard</h1>
            </div>
            <div className="text-sm text-gray-400">
              Upload and manage your CSV files
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-medium mb-4">Upload CSV File</h2>
              
              {!uploadedFile ? (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <Upload className={`mx-auto h-12 w-12 mb-4 transition-colors ${
                    dragActive ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  
                  <h3 className="text-lg font-medium mb-2">
                    {dragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file'}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    or click to browse files
                  </p>
                  
                  <div className="text-sm text-gray-500">
                    Supports: .csv files up to 10MB
                  </div>
                </div>
              ) : (
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">
                          {uploadedFile.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                          <span>{formatFileSize(uploadedFile.size)}</span>
                          <span>{uploadedFile.rows} rows</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="ml-4 flex-shrink-0 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* File Preview */}
            {uploadedFile && (
              <div className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-medium mb-4">File Preview</h2>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    {uploadedFile.content.split('\n').slice(0, 10).join('\n')}
                    {uploadedFile.rows > 10 && '\n... and more rows'}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-medium mb-4">File Statistics</h3>
              
              {uploadedFile ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">File Name:</span>
                    <span className="text-white truncate ml-2">{uploadedFile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">File Size:</span>
                    <span className="text-white">{formatFileSize(uploadedFile.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Rows:</span>
                    <span className="text-white">{uploadedFile.rows}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Format:</span>
                    <span className="text-white">CSV</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  Upload file for data training using the format of csv with the maximum of a comma.
                </p>
              )}
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-medium mb-4">Supported Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Drag & Drop Upload</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>File Size Validation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>CSV Format Check</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;