import React, { useState, useEffect, useRef } from 'react';
import { UploadedFile } from '../../types/file';
import { Bot, FileText, BarChart2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy data yang lebih kompleks dan dinamis untuk simulasi
const dummyAnalysis = {
    totalRows: 1500,
    totalCols: 7,
    missingRows: 50,
    dataTypes: {
        column1: 'Numeric',
        column2: 'Categorical',
        column3: 'Numeric',
        column4: 'Date',
        column5: 'Categorical',
        column6: 'Text',
        column7: 'Boolean',
    },
    columnStats: {
        column1: { mean: 50.2, std: 15.3, min: 10, max: 90 },
        column3: { mean: 1200, std: 250, min: 500, max: 2000 },
    },
    predictedValues: [
        { row: 10, value: 'High Risk', confidence: 0.95 },
        { row: 25, value: 'Low Risk', confidence: 0.88 },
        { row: 40, value: 'High Risk', confidence: 0.91 },
        { row: 60, value: 'Low Risk', confidence: 0.75 },
    ],
    predictionStatus: 'Completed',
    predictionModel: 'Random Forest Classifier',
    accuracyScore: 0.89,
};

// Dummy data untuk simulasi pembersihan data
const cleanedAnalysis = {
    ...dummyAnalysis,
    missingRows: 10, // Mengurangi data hilang setelah 'dibersihkan'
    accuracyScore: 0.92, // Meningkatkan akurasi
};

// ---
// Komponen Data Summary yang lebih dinamis
// ---

const DataSummary = ({ analysis }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-800/50 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700/50 flex flex-col h-full shadow-lg"
    >
        <h4 className="font-semibold text-gray-200 mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-400 animate-pulse-slow" />
            <span>Data Summary</span>
        </h4>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-3">
                <div className="flex items-center justify-between transition-transform transform hover:scale-105">
                    <span>Total Rows:</span>
                    <span className="font-medium text-white">{analysis.totalRows}</span>
                </div>
                <div className="flex items-center justify-between transition-transform transform hover:scale-105">
                    <span>Total Columns:</span>
                    <span className="font-medium text-white">{analysis.totalCols}</span>
                </div>
                <div className="flex items-center justify-between transition-transform transform hover:scale-105">
                    <span>Missing Rows:</span>
                    <span className={`font-medium ${analysis.missingRows > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {analysis.missingRows} {analysis.missingRows > 0 && <AlertTriangle className="inline-block ml-1 h-4 w-4 text-red-400" />}
                        {analysis.missingRows === 0 && <CheckCircle className="inline-block ml-1 h-4 w-4 text-green-400" />}
                    </span>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-3">
                <div className="flex items-center justify-between transition-transform transform hover:scale-105">
                    <span>Prediction Model:</span>
                    <span className="font-medium text-white">{analysis.predictionModel}</span>
                </div>
                <div className="flex items-center justify-between transition-transform transform hover:scale-105">
                    <span>Accuracy Score:</span>
                    <span className={`font-medium ${analysis.accuracyScore > 0.9 ? 'text-green-400' : 'text-yellow-400'}`}>{analysis.accuracyScore}</span>
                </div>
                <div className="flex items-center justify-between transition-transform transform hover:scale-105">
                    <span>Prediction Status:</span>
                    <span className={`font-medium ${analysis.predictionStatus === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {analysis.predictionStatus} <CheckCircle className="inline-block ml-1 h-4 w-4 text-green-400" />
                    </span>
                </div>
            </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-4 border-t border-gray-700/50 pt-4">
            <h5 className="font-semibold text-gray-300 mb-2">Column Statistics</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(analysis.columnStats).map(([col, stats]) => (
                    <motion.div
                        key={col}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-700/50 rounded-md p-3 hover:bg-gray-600/50 transition-colors"
                    >
                        <h6 className="text-xs font-semibold text-gray-300 flex items-center space-x-1">
                            <BarChart2 className="w-4 h-4 text-purple-300" />
                            <span>{col}</span>
                        </h6>
                        <ul className="text-xs text-gray-400 mt-2 space-y-1">
                            <li className="flex justify-between">Mean: <span className="font-medium text-white">{stats.mean.toFixed(2)}</span></li>
                            <li className="flex justify-between">Std Dev: <span className="font-medium text-white">{stats.std.toFixed(2)}</span></li>
                            <li className="flex justify-between">Min: <span className="font-medium text-white">{stats.min}</span></li>
                            <li className="flex justify-between">Max: <span className="font-medium text-white">{stats.max}</span></li>
                        </ul>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </motion.div>
);

// ---
// Komponen AI Chatbot yang ditingkatkan
// ---
const AIChatbot = ({ onAnalysisComplete }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // useEffect(() => {
    //     if (isUserNearBottom()) {
    //         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, [messages, isTyping]);

    const processBotMessage = (text: string, actions?: { label: string; action: string }[]) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text, actions }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleActionClick = (action: string) => {
        setMessages(prev => [...prev, { sender: 'user', text: action }]);

        if (action === 'start_analysis') {
            processBotMessage(
                `Melakukan analisis data otomatis...`
            );
            setTimeout(() => {
                const initialMessage = `Analisis awal selesai. Saya mendeteksi ${dummyAnalysis.missingRows} baris data yang hilang dan akurasi prediksi awal sebesar ${(dummyAnalysis.accuracyScore * 100).toFixed(1)}%.`;
                const followUpMessage = `Saya juga menemukan bahwa kolom '${Object.keys(dummyAnalysis.dataTypes).find(key => dummyAnalysis.dataTypes[key] === 'Categorical')}' memiliki distribusi yang signifikan.`;
                processBotMessage(
                    `${initialMessage}<br/><br/>${followUpMessage}`,
                    [
                        { label: 'Apa yang bisa saya lakukan dengan data hilang?', action: 'ask_missing_data' },
                        { label: 'Lihat ringkasan prediksi', action: 'show_prediction_summary' },
                    ]
                );
            }, 3000);
        } else if (action === 'show_prediction_summary') {
            const predictionSummary = `Prediksi berhasil dilakukan menggunakan model ${dummyAnalysis.predictionModel}.
            <br/><br/>Berikut adalah contoh hasil prediksi:
            <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
                ${dummyAnalysis.predictedValues
                    .map(p => `<li>Baris **${p.row}**: **${p.value}** (Confidence: ${(p.confidence * 100).toFixed(1)}%)</li>`)
                    .join('')}
            </ul>`;
            processBotMessage(predictionSummary, [
                { label: 'Bagaimana cara meningkatkan akurasi?', action: 'ask_accuracy_improvement' },
                { label: 'Coba pembersihan data', action: 'clean_data' },
            ]);
        } else if (action === 'ask_missing_data') {
            processBotMessage(
                `Untuk mengatasi data yang hilang, Anda bisa mencoba metode imputasi. Misalnya, mengisi nilai kosong dengan rata-rata atau median dari kolom tersebut. Opsi lain adalah menghapus baris yang memiliki terlalu banyak nilai kosong.`,
                [
                    { label: 'Coba pembersihan data', action: 'clean_data' },
                    { label: 'Lanjutkan ke ringkasan prediksi', action: 'show_prediction_summary' },
                ]
            );
        } else if (action === 'ask_accuracy_improvement') {
            const advice = `Akurasi model bisa ditingkatkan dengan:
            <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
                <li>Melakukan **Feature Engineering** untuk membuat fitur baru yang lebih informatif.</li>
                <li>Menggunakan model yang lebih canggih seperti **Gradient Boosting** atau **Neural Network**.</li>
                <li>Menghilangkan **outlier** yang dapat mengganggu pelatihan model.</li>
            </ul>`;
            processBotMessage(advice, [{ label: 'Coba pembersihan data', action: 'clean_data' }]);
        } else if (action === 'clean_data') {
            processBotMessage('Melakukan pembersihan data otomatis...');
            setTimeout(() => {
                processBotMessage(
                    `Pembersihan data selesai. Kami mengisi nilai yang hilang dan menghapus outlier.
                    <br/><br/>Baris data yang hilang sekarang menjadi ${cleanedAnalysis.missingRows}! Akurasi model Anda meningkat menjadi ${(cleanedAnalysis.accuracyScore * 100).toFixed(1)}%.`,
                    [{ label: 'Hebat! Analisis ulang', action: 'start_analysis' }]
                );
                onAnalysisComplete(cleanedAnalysis);
            }, 3000);
        } else if (action === 'reset') {
            setMessages([]);
            processBotMessage('Analisis data berhasil direset. Silakan unggah file baru atau klik tombol untuk memulai ulang.', [
                { label: 'Mulai analisis', action: 'start_analysis' },
            ]);
        }
    };

    useEffect(() => {
        handleActionClick('start_analysis');
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 rounded-lg p-4 h-64 flex flex-col transition-all duration-300 hover:bg-gray-700/50 shadow-lg"
        >
            <h4 className="font-semibold text-gray-200 mb-4 flex items-center space-x-2">
                <Bot className="w-5 h-5 text-cyan-400 animate-bounce-slow" />
                <span>AI Assistant Chat</span>
            </h4>
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-xl p-3 text-sm transition-colors duration-300
                                ${msg.sender === 'bot' ? 'bg-gray-700/50 text-gray-200 rounded-bl-none' : 'bg-purple-600 text-white rounded-br-none'}`}
                            >
                                <div dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                                {msg.actions && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {msg.actions.map((action: any, i: number) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleActionClick(action.action)}
                                                className="px-3 py-1 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                                            >
                                                {action.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-gray-700/50 text-gray-200 rounded-xl p-3 text-sm">
                            <div className="flex space-x-1">
                                <motion.div
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                ></motion.div>
                                <motion.div
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                ></motion.div>
                                <motion.div
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                ></motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={chatEndRef} />
            </div>
        </motion.div>
    );
};

// ---
// Komponen utama TablePreview dengan lebar yang diperlebar
// ---
interface TablePreviewProps {
    uploadedFile: UploadedFile;
}

const TablePreview: React.FC<TablePreviewProps> = ({ uploadedFile }) => {
    const [currentAnalysis, setCurrentAnalysis] = useState(dummyAnalysis);
    const { content } = uploadedFile;
    const rows = content ? content.split('\n') : [];
    const headers = rows.length > 0 ? rows[0]?.split(',') : [];
    const previewRows = rows.slice(1, rows.length).filter(row => row.trim() !== '');

    const handleAnalysisComplete = (newAnalysis) => {
        setCurrentAnalysis(newAnalysis);
    };

    return (
        <div className="bg-gradient-to-br from-gray-900/70 to-black/70 rounded-xl p-6 overflow-hidden border border-gray-700/50 mb-6 font-sans w-full max-w-7xl mx-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white flex items-center space-x-2">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-4 h-4 bg-green-400 rounded-full shadow-lg"
                    />
                    <span>Content Preview</span>
                </h3>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center space-x-2 bg-gray-800/60 py-1 px-3 rounded-full border border-gray-700/50"
                >
                    <Bot className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-gray-400 font-medium">AI Assistant</span>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto min-h-[350px]">
                <DataSummary analysis={currentAnalysis} />
                <AIChatbot onAnalysisComplete={handleAnalysisComplete} />
            </div>

            <div className="mt-6 border-t border-gray-700/50 pt-4">
                <h4 className="font-semibold text-gray-200 mb-2 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-green-400" />
                    <span>Table Content</span>
                </h4>
                <div className="overflow-auto max-h-64 rounded-lg border border-gray-700/40 shadow-inner">
                    <table className="min-w-full divide-y divide-gray-700 text-sm text-gray-300">
                        <thead className="bg-gray-800/80 sticky top-0 z-10 backdrop-blur-sm">
                            <tr>
                                {headers.length > 0 ? (
                                    headers.map((header, i) => (
                                        <th key={i} className="px-4 py-2 text-left font-medium text-gray-200 whitespace-nowrap">
                                            {header}
                                        </th>
                                    ))
                                ) : (
                                    <th className="px-4 py-2 text-left font-medium text-gray-200">No data available</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            <AnimatePresence>
                                {previewRows.length > 0 ? (
                                    previewRows.map((row, i) => {
                                        const cols = row.split(',');
                                        return (
                                            <motion.tr
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="hover:bg-gray-800/40 transition-colors"
                                            >
                                                {cols.map((col, j) => (
                                                    <td key={j} className="px-4 py-2 whitespace-nowrap">
                                                        {col}
                                                    </td>
                                                ))}
                                            </motion.tr>
                                        );
                                    })
                                ) : (
                                    <tr key="no-data">
                                        <td colSpan={headers.length || 1} className="px-4 py-4 text-center text-gray-500">
                                            No data to display.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TablePreview;