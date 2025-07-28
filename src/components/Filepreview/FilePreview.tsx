import React, { useMemo, useEffect, useState } from 'react';
import { UploadedFile } from '../../types/file';
import { BarChart3, FileText, Database } from 'lucide-react';
import CSVLineChart from './LineCSV';
import TablePreview from './TablePreview';
import { motion } from 'framer-motion';
import axios from '../../api/axios';

interface FilePreviewProps {
    uploadedFile: UploadedFile;
    formatFileSize: (bytes: number) => string;
}

interface BackendResponse {
    dates: string[];
    predictions: number[];
}

interface ChartPoint {
    x: string;
    y: number;
}

const FilePreview: React.FC<FilePreviewProps> = ({ uploadedFile, formatFileSize }) => {
    const [predictionData, setPredictionData] = useState<ChartPoint[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const originalChartData = useMemo(() => {
        try {
            const lines = uploadedFile.content.split('\n').filter(line => line.trim());
            if (lines.length < 2) return [];

            const dataLines = lines.slice(1);

            return dataLines.map(line => {
                const [xRaw, yRaw] = line.split(',').map(col => col.trim());
                const y = parseFloat(yRaw);

                if (!isNaN(y) && xRaw) {
                    return { x: xRaw, y };
                }
            }).filter(Boolean).slice(0, 100);
        } catch {
            return [];
        }
    }, [uploadedFile.content]);

    useEffect(() => {
        const sendToBackend = async () => {
            setLoading(true);
            setError(null);
            try {
                const formData = new FormData();
                const blob = new Blob([uploadedFile.content], { type: 'text/csv' });
                formData.append('file', blob, uploadedFile.name);

                const response = await axios.post<BackendResponse>('/predict', formData);
                const { dates, predictions } = response.data;

                if (dates.length !== predictions.length) {
                    throw new Error('Invalid prediction response structure');
                }

                const formatted: ChartPoint[] = dates.map((date: any, index: string | number) => ({
                    x: date,
                    y: predictions[index],
                }));

                setPredictionData(formatted);
            } catch (err) {
                console.error('Prediction failed:', err);
                setError('Failed to generate prediction.');
            } finally {
                setLoading(false);
            }
        };

        if (uploadedFile) {
            sendToBackend();
        }
    }, [uploadedFile]);

    const chartData = predictionData.length > 0 ? predictionData : originalChartData;
    const xValues = chartData.map(d => d?.x);
    const yValues = chartData.map(d => d?.y);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-7xl mt-8 mx-auto font-sans"
        >
            <div className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-8 text-center text-white flex items-center justify-center space-x-3"
                >
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                    <span>File Preview</span>
                </motion.h2>

                {/* Tampilan Konten Vertikal */}
                <div className="flex flex-col gap-12">
                    {/* Statistik File dengan animasi berurutan */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 text-center border border-blue-500/30 hover:scale-105 transition-transform duration-300 shadow-md"
                        >
                            <Database className="h-10 w-10 text-blue-400 mx-auto mb-3 animate-pulse-slow" />
                            <div className="text-3xl font-bold text-blue-400">{uploadedFile.rows}</div>
                            <div className="text-sm text-gray-400 mt-1">Rows</div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 text-center border border-green-500/30 hover:scale-105 transition-transform duration-300 shadow-md"
                        >
                            <FileText className="h-10 w-10 text-green-400 mx-auto mb-3 animate-bounce-slow" />
                            <div className="text-3xl font-bold text-green-400">{formatFileSize(uploadedFile.size)}</div>
                            <div className="text-sm text-gray-400 mt-1">Size</div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 text-center border border-purple-500/30 hover:scale-105 transition-transform duration-300 shadow-md"
                        >
                            <BarChart3 className="h-10 w-10 text-purple-400 mx-auto mb-3 animate-pulse-slow" />
                            <div className="text-3xl font-bold text-purple-400">CSV</div>
                            <div className="text-sm text-gray-400 mt-1">Format</div>
                        </motion.div>
                    </motion.div>

                    {/* Bagian Grafik yang Diperbesar dan Lebih Vertikal */}
                    <motion.div
                        variants={itemVariants}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col items-center justify-center bg-gray-800/50 rounded-2xl p-6 h-[450px] shadow-xl border border-gray-700/50"
                    >
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                            <BarChart3 className="h-6 w-6 text-blue-300" />
                            <span>{predictionData.length > 0 ? 'Prediction Trend' : 'Data Trend'}</span>
                        </h3>
                        <div className="w-full h-full flex items-center justify-center">
                            {loading ? (
                                <p className="text-white">Loading prediction...</p>
                            ) : error ? (
                                <p className="text-red-400">{error}</p>
                            ) : chartData.length > 0 ? (
                                <CSVLineChart xValues={xValues} yValues={yValues} />
                            ) : (
                                <div className="text-gray-500 text-center">
                                    Tidak ada data numerik yang cukup untuk membuat grafik.
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Bagian Tabel Pratinjau */}
                    <motion.div
                        variants={itemVariants}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col h-full"
                    >
                        <TablePreview uploadedFile={uploadedFile} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default FilePreview;