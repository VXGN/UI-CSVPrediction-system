import React, { useRef } from 'react';
import { Upload, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Varian animasi untuk framer-motion
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

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
    <motion.div
      className="w-full max-w-5xl lg:max-w-6xl mx-auto"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-10 lg:p-16 border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
          Upload CSV File
        </h2>
        
        <AnimatePresence mode="wait">
          {!uploadedFile ? (
            <motion.div
              key="uploader"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`relative border-2 border-dashed rounded-2xl p-16 lg:p-24 text-center transition-all duration-500 min-h-[300px] flex flex-col justify-center cursor-pointer group
                ${dragActive
                  ? 'border-blue-400 bg-blue-500/20 scale-[1.02] shadow-lg shadow-blue-500/25'
                  : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
                }`}
              onDragEnter={onDrag}
              onDragLeave={onDrag}
              onDragOver={onDrag}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={onFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <motion.div
                key="upload-icon"
                initial={{ scale: 1 }}
                animate={{ scale: dragActive ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mx-auto"
              >
                <Upload 
                  className={`h-20 w-20 mb-6 transition-colors duration-300
                    ${dragActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}`} 
                />
              </motion.div>
              
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {dragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file'}
              </h3>
              
              <p className="text-gray-400 mb-8 text-lg">
                or click to browse files
              </p>
              
              <div className="text-sm text-gray-500 bg-gray-700/50 rounded-full px-4 py-2 inline-block border border-gray-600/30 self-center">
                Supports: .csv files up to 10MB
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="uploaded"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-green-500/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6 flex-1 min-w-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="flex-shrink-0"
                  >
                    <CheckCircle className="h-12 w-12 text-green-400" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-medium text-white truncate">
                      {uploadedFile.name}
                    </h3>
                    <div className="flex items-center space-x-6 mt-3 text-sm text-gray-400">
                      <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 font-medium">
                        {formatFileSize(uploadedFile.size)}
                      </span>
                      <span className="bg-green-500/20 px-3 py-1 rounded-full text-green-300 font-medium">
                        {uploadedFile.rows} rows
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={onRemoveFile}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-4 flex-shrink-0 text-gray-400 hover:text-red-400 transition-colors duration-300 p-3 hover:bg-red-500/20 rounded-full"
                  aria-label="Remove file"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-6 bg-red-900/50 border border-red-500/50 rounded-2xl"
            >
              <p className="text-red-300 text-lg">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FileUpload;