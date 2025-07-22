import React, { useRef } from 'react';
import { Upload, CheckCircle, X } from 'lucide-react';
import { UploadedFile } from '../types/file';

interface FileUploadProps {
  dragActive: boolean;
  uploadedFile: UploadedFile | null;
  error: string;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  formatFileSize: (bytes: number) => string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  dragActive,
  uploadedFile,
  error,
  onDrag,
  onDrop,
  onFileInput,
  onRemoveFile,
  formatFileSize
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full max-w-4xl animate-fade-in-up">
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Upload CSV File</h2>
        
        {!uploadedFile ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-500 ${
              dragActive
                ? 'border-blue-400 bg-blue-500/20 scale-105 shadow-lg shadow-blue-500/25'
                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
            }`}
            onDragEnter={onDrag}
            onDragLeave={onDrag}
            onDragOver={onDrag}
            onDrop={onDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={onFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <Upload className={`mx-auto h-16 w-16 mb-6 transition-all duration-500 ${
              dragActive ? 'text-blue-400 scale-125 animate-bounce' : 'text-gray-400 hover:text-gray-300'
            }`} />
            
            <h3 className="text-xl font-medium mb-3 text-white">
              {dragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file'}
            </h3>
            
            <p className="text-gray-400 mb-6 text-lg">
              or click to browse files
            </p>
            
            <div className="text-sm text-gray-500 bg-gray-700/50 rounded-lg p-3 inline-block border border-gray-600/30">
              Supports: .csv files up to 10MB
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/30 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-10 w-10 text-green-400 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-white truncate">
                    {uploadedFile.name}
                  </h3>
                  <div className="flex items-center space-x-6 mt-2 text-sm text-gray-400">
                    <span className="bg-blue-500/20 px-2 py-1 rounded">{formatFileSize(uploadedFile.size)}</span>
                    <span className="bg-green-500/20 px-2 py-1 rounded">{uploadedFile.rows} rows</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onRemoveFile}
                className="ml-4 flex-shrink-0 text-gray-400 hover:text-red-400 transition-all duration-300 p-2 hover:bg-red-500/20 rounded-lg hover:scale-110"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl animate-shake">
            <p className="text-red-300">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;