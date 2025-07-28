import React, { useRef, useState, useEffect } from 'react';
import { Upload, CheckCircle, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Asumsi definisi tipe data
interface UploadedFile {
    name: string;
    size: number;
    rows: number;
}

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

// Varian animasi untuk Framer Motion
const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: -5, transition: { type: 'spring', stiffness: 400, damping: 10 } },
    active: { scale: 1.2, rotate: 10, transition: { type: 'spring', stiffness: 400, damping: 10 } },
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
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (uploadedFile) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 80);
            return () => clearInterval(interval);
        }
    }, [uploadedFile]);

    return (
        <motion.div
            className="w-full max-w-5xl lg:max-w-6xl mx-auto"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="bg-gradient-to-br  from-gray-900/70 to-black/70 backdrop-blur-lg rounded-3xl p-10 lg:p-16 border border-gray-800/80 shadow-3xl text-gray-200">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-white tracking-tight">
                    Upload Your CSV File
                </h2>

                <AnimatePresence mode="wait">
                    {!uploadedFile ? (
                        <motion.label
                            key="uploader"
                            htmlFor="file-input"
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
                        >
                            <input
                                id="file-input"
                                ref={fileInputRef}
                                type="file"
                                accept=".csv"
                                onChange={onFileInput}
                                className="hidden"
                            />

                            <motion.div
                                variants={iconVariants}
                                animate={dragActive ? 'active' : 'initial'}
                                className="mx-auto mb-6"
                            >
                                <Upload
                                    className={`h-20 w-20 transition-colors duration-300
                                        ${dragActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}`}
                                />
                            </motion.div>

                            <h3 className="text-3xl font-semibold mb-3 text-white">
                                {dragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file'}
                            </h3>

                            <p className="text-gray-400 mb-8 text-lg">
                                or click to browse files
                            </p>

                            <div className="text-sm text-gray-500 bg-gray-700/50 rounded-full px-4 py-2 inline-block border border-gray-600/30 self-center">
                                Supports: .csv files up to 10MB
                            </div>
                        </motion.label>
                    ) : (
                        <motion.div
                            key="uploaded"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-green-500/30 shadow-xl"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-6 flex-1 min-w-0">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                        className="flex-shrink-0 bg-green-500/20 p-3 rounded-full"
                                    >
                                        <CheckCircle className="h-8 w-8 text-green-400" />
                                    </motion.div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold text-white truncate">
                                            {uploadedFile.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-gray-400">
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
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="ml-4 flex-shrink-0 text-gray-400 hover:text-red-400 transition-all duration-300 p-3 hover:bg-red-500/20 rounded-full"
                                    aria-label="Remove file"
                                >
                                    <X className="h-6 w-6" />
                                </motion.button>
                            </div>
                            {/* Simulated Progress Bar */}
                            <motion.div className="h-2 mt-4 rounded-full bg-gray-700 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1, ease: 'linear' }}
                                    className="h-full bg-gradient-to-r from-blue-400 to-green-400"
                                />
                            </motion.div>
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
                            className="mt-8 p-6 bg-red-900/50 border border-red-500/50 rounded-2xl flex items-center space-x-4"
                        >
                            <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0" />
                            <p className="text-red-300 text-lg">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default FileUpload;