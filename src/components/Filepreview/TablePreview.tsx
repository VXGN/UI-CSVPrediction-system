import React, { useState, useEffect, useRef } from 'react';
import { Bot, FileText, BarChart2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the UploadedFile type (assuming it has a 'content' property)
// You might already have this defined in '../../types/file'
interface UploadedFile {
    name: string;
    content: string; // The content of the CSV file as a string
    size: number;
    type: string;
}

// Define the structure for AnalysisData
interface AnalysisData {
    totalRows: number;
    totalCols: number;
    missingRows: number;
    dataTypes: { [key: string]: string };
    columnStats: { [key: string]: { mean: number; std: number; min: number; max: number } };
    predictedValues: { row: number; value: string; confidence: number }[];
    predictionStatus: string;
    predictionModel: string;
    accuracyScore: number;
}

// Dummy data yang lebih kompleks dan dinamis untuk simulasi
const dummyAnalysis: AnalysisData = {
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
const cleanedAnalysis: AnalysisData = {
    ...dummyAnalysis,
    missingRows: 10, // Mengurangi data hilang setelah 'dibersihkan'
    accuracyScore: 0.92, // Meningkatkan akurasi
};

// ---
// Komponen Data Summary yang lebih dinamis dan interaktif
// ---
const DataSummary = ({ analysis }: { analysis: AnalysisData }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-800/50 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700/50 flex flex-col h-full shadow-lg border border-gray-700/40"
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
                    <span className={`font-medium flex items-center ${analysis.missingRows > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {analysis.missingRows} {analysis.missingRows > 0 ? <AlertTriangle className="inline-block ml-1 h-4 w-4 text-red-400" /> : <CheckCircle className="inline-block ml-1 h-4 w-4 text-green-400" />}
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
                    <span className={`font-medium ${analysis.accuracyScore >= 0.9 ? 'text-green-400' : analysis.accuracyScore >= 0.8 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {(analysis.accuracyScore * 100).toFixed(1)}%
                    </span>
                </div>
                <div className="flex items-center justify-between transition-transform transform hover:scale-105">
                    <span>Prediction Status:</span>
                    <span className={`font-medium flex items-center ${analysis.predictionStatus === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {analysis.predictionStatus} {analysis.predictionStatus === 'Completed' ? <CheckCircle className="inline-block ml-1 h-4 w-4 text-green-400" /> : <XCircle className="inline-block ml-1 h-4 w-4 text-yellow-400" />}
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
                        className="bg-gray-700/50 rounded-md p-3 hover:bg-gray-600/50 transition-colors border border-gray-600/30"
                    >
                        <h6 className="text-xs font-semibold text-gray-300 flex items-center space-x-1 mb-2">
                            <BarChart2 className="w-4 h-4 text-purple-300" />
                            <span>{col} ({analysis.dataTypes[col]})</span>
                        </h6>
                        <ul className="text-xs text-gray-400 space-y-1">
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
interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
    actions?: { label: string; action: string }[];
}

interface AIChatbotProps {
    onAnalysisComplete: (analysis: AnalysisData) => void;
    uploadedFile: UploadedFile; // Pass the uploaded file to the chatbot
}

const AIChatbot: React.FC<AIChatbotProps> = ({ onAnalysisComplete, uploadedFile }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisState, setAnalysisState] = useState<'initial' | 'analyzed' | 'cleaned' | 'model_optimized'>('initial');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Initial message when a new file is uploaded
    useEffect(() => {
        setMessages([]); // Clear messages on new file upload
        setAnalysisState('initial'); // Reset analysis state
        processBotMessage(
            `Halo! Saya AI Asisten Anda. Saya siap membantu menganalisis file **"${uploadedFile.name}"**.`,
            [{ label: 'Mulai Analisis Data Awal', action: 'start_initial_analysis' }]
        );
    }, [uploadedFile.name]); // Re-run when uploadedFile.name changes (indicating a new file)

    const processBotMessage = (text: string, actions?: { label: string; action: string }[], delay: number = 1500) => {
        setIsLoading(true);
        setMessages(prev => [...prev, { sender: 'bot', text: '<div class="typing-indicator flex space-x-1"><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot"></div><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot delay-1"></div><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot delay-2"></div></div>' }]);
        setTimeout(() => {
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { sender: 'bot', text, actions };
                return newMessages;
            });
            setIsLoading(false);
        }, delay);
    };

    const handleActionClick = (action: string) => {
        if (isLoading) return;

        setMessages(prev => [...prev, { sender: 'user', text: getActionLabel(action) || action }]); // Display the label if available

        switch (action) {
            case 'start_initial_analysis':
                if (analysisState === 'initial') {
                    processBotMessage(
                        `Melakukan analisis data awal pada file Anda. Ini mungkin memakan waktu beberapa saat...`, [], 2000
                    );
                    setTimeout(() => {
                        const categoricalColumns = Object.keys(dummyAnalysis.dataTypes).filter(key => dummyAnalysis.dataTypes[key] === 'Categorical');
                        const initialMessage = `Analisis awal selesai. Saya mendeteksi **${dummyAnalysis.missingRows}** baris data yang hilang dan akurasi prediksi awal sebesar **${(dummyAnalysis.accuracyScore * 100).toFixed(1)}%** menggunakan model **${dummyAnalysis.predictionModel}**.`;
                        const followUpMessage = categoricalColumns.length > 0
                            ? `Saya juga menemukan bahwa kolom **'${categoricalColumns[0]}'** memiliki distribusi yang signifikan.`
                            : `Tidak ada kolom kategorikal yang signifikan terdeteksi.`;

                        processBotMessage(
                            `${initialMessage}<br/><br/>${followUpMessage}`,
                            [
                                { label: 'Tinjau Statistik Data', action: 'show_data_stats' },
                                { label: 'Lihat Ringkasan Prediksi', action: 'show_prediction_summary' },
                                { label: 'Tanyakan tentang Data Hilang', action: 'ask_missing_data' },
                            ], 3000
                        );
                        onAnalysisComplete(dummyAnalysis);
                        setAnalysisState('analyzed');
                    }, 2500);
                } else {
                    processBotMessage("Analisis awal sudah dilakukan. Silakan pilih opsi lain atau reset analisis untuk memulai ulang.");
                }
                break;

            case 'show_data_stats':
                const statsDetails = `Ringkasan data:
                <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
                    <li>Total Baris: **${currentAnalysis().totalRows}**</li>
                    <li>Total Kolom: **${currentAnalysis().totalCols}**</li>
                    <li>Baris Hilang: **${currentAnalysis().missingRows}**</li>
                </ul>
                <br/>Untuk detail statistik kolom, Anda bisa melihat panel "Data Summary" di sebelah kiri.`;
                processBotMessage(statsDetails, [
                    { label: 'Tanyakan tentang Data Hilang', action: 'ask_missing_data' },
                    { label: 'Lihat Ringkasan Prediksi', action: 'show_prediction_summary' },
                ]);
                break;

            case 'show_prediction_summary':
                const predictionSummary = `Prediksi berhasil dilakukan menggunakan model **${currentAnalysis().predictionModel}** dengan akurasi **${(currentAnalysis().accuracyScore * 100).toFixed(1)}%**.
                <br/><br/>Berikut adalah contoh hasil prediksi:
                <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
                    ${currentAnalysis().predictedValues
                        .map(p => `<li>Baris **${p.row}**: **${p.value}** (Confidence: ${(p.confidence * 100).toFixed(1)}%)</li>`)
                        .join('')}
                </ul>`;
                processBotMessage(predictionSummary, [
                    { label: 'Bagaimana cara meningkatkan akurasi?', action: 'ask_accuracy_improvement' },
                    { label: 'Lakukan Pembersihan Data', action: 'clean_data' },
                ]);
                break;

            case 'ask_missing_data':
                const missingDataAdvice = `Untuk mengatasi data yang hilang (${currentAnalysis().missingRows} baris terdeteksi), Anda bisa mencoba metode imputasi (misalnya, mengisi nilai kosong dengan **rata-rata** atau **median**). Atau, jika persentasenya kecil, menghapus baris yang memiliki nilai kosong juga merupakan opsi.`;
                processBotMessage(missingDataAdvice, [
                    { label: 'Lakukan Pembersihan Data Otomatis', action: 'clean_data' },
                    { label: 'Tinjau Statistik Data', action: 'show_data_stats' },
                ]);
                break;

            case 'ask_accuracy_improvement':
                const advice = `Akurasi model (**${(currentAnalysis().accuracyScore * 100).toFixed(1)}%**) bisa ditingkatkan dengan:
                <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
                    <li>Melakukan **Feature Engineering** untuk membuat fitur baru yang lebih informatif.</li>
                    <li>Menggunakan model yang lebih canggih seperti **Gradient Boosting** atau **Neural Network**.</li>
                    <li>Menghilangkan **outlier** yang dapat mengganggu pelatihan model.</li>
                </ul>`;
                processBotMessage(advice, [
                    { label: 'Lakukan Pembersihan Data', action: 'clean_data' },
                    { label: 'Coba Optimasi Model', action: 'optimize_model' },
                ]);
                break;

            case 'clean_data':
                if (analysisState !== 'cleaned') {
                    processBotMessage('Melakukan pembersihan data otomatis: mengisi nilai yang hilang dan menangani outlier...');
                    setTimeout(() => {
                        const newMissingRows = cleanedAnalysis.missingRows;
                        const newAccuracy = cleanedAnalysis.accuracyScore;
                        processBotMessage(
                            `Pembersihan data selesai! Baris data yang hilang sekarang menjadi **${newMissingRows}**. Akurasi model Anda meningkat menjadi **${(newAccuracy * 100).toFixed(1)}%**.`,
                            [
                                { label: 'Lanjutkan dengan Optimasi Model', action: 'optimize_model' },
                                { label: 'Lihat Ringkasan Prediksi Terbaru', action: 'show_prediction_summary' },
                            ]
                        );
                        onAnalysisComplete(cleanedAnalysis); // Update with cleaned analysis data
                        setAnalysisState('cleaned');
                    }, 3000);
                } else {
                    processBotMessage("Data sudah dibersihkan. Anda bisa melanjutkan ke optimasi model atau melihat ringkasan terbaru.");
                }
                break;

            case 'optimize_model':
                if (analysisState !== 'model_optimized') {
                    processBotMessage('Melakukan optimasi model dengan algoritma canggih dan fine-tuning hyperparameter...');
                    setTimeout(() => {
                        const optimizedAnalysis = {
                            ...cleanedAnalysis,
                            predictionModel: 'Gradient Boosting Machine',
                            accuracyScore: 0.95, // Even higher accuracy
                        };
                        processBotMessage(
                            `Model berhasil dioptimasi! Kami beralih ke **${optimizedAnalysis.predictionModel}** dan akurasi melonjak menjadi **${(optimizedAnalysis.accuracyScore * 100).toFixed(1)}%**.
                            <br/><br/>Model ini menunjukkan performa yang sangat baik.`,
                            [
                                { label: 'Lihat Ringkasan Prediksi Akhir', action: 'show_prediction_summary' },
                                { label: 'Apa langkah selanjutnya?', action: 'next_steps' },
                            ]
                        );
                        onAnalysisComplete(optimizedAnalysis);
                        setAnalysisState('model_optimized');
                    }, 4000);
                } else {
                    processBotMessage("Model sudah dioptimasi. Anda dapat melihat ringkasan prediksi akhir atau menanyakan langkah selanjutnya.");
                }
                break;

            case 'next_steps':
                processBotMessage(
                    `Dengan model yang sudah dioptimasi dan akurasi tinggi, Anda dapat:
                    <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
                        <li>**Ekspor hasil prediksi** ke format lain.</li>
                        <li>Melakukan **analisis sensitivitas** untuk memahami pengaruh fitur terhadap prediksi.</li>
                        <li>Menggunakan model ini untuk **prediksi data baru** secara real-time.</li>
                    </ul>`,
                    [
                        { label: 'Reset Analisis', action: 'reset_analysis' }
                    ]
                );
                break;

            case 'reset_analysis':
                setMessages([]);
                setAnalysisState('initial');
                processBotMessage(`Analisis data berhasil direset. Saya siap membantu menganalisis file **"${uploadedFile.name}"** lagi.`, [
                    { label: 'Mulai Analisis Data Awal', action: 'start_initial_analysis' },
                ]);
                onAnalysisComplete(dummyAnalysis); // Reset summary to initial dummy analysis
                break;

            default:
                processBotMessage("Maaf, saya tidak mengerti perintah itu. Bisakah Anda memilih dari opsi yang tersedia?");
                break;
        }
    };

    // Helper to get the label of an action for displaying in user messages
    const getActionLabel = (action: string) => {
        const allActions = [
            { label: 'Mulai Analisis Data Awal', action: 'start_initial_analysis' },
            { label: 'Tinjau Statistik Data', action: 'show_data_stats' },
            { label: 'Lihat Ringkasan Prediksi', action: 'show_prediction_summary' },
            { label: 'Tanyakan tentang Data Hilang', action: 'ask_missing_data' },
            { label: 'Bagaimana cara meningkatkan akurasi?', action: 'ask_accuracy_improvement' },
            { label: 'Lakukan Pembersihan Data Otomatis', action: 'clean_data' },
            { label: 'Coba Optimasi Model', action: 'optimize_model' },
            { label: 'Lanjutkan dengan Optimasi Model', action: 'optimize_model' }, // Duplicate for context
            { label: 'Lihat Ringkasan Prediksi Terbaru', action: 'show_prediction_summary' }, // Duplicate for context
            { label: 'Lihat Ringkasan Prediksi Akhir', action: 'show_prediction_summary' }, // Duplicate for context
            { label: 'Apa langkah selanjutnya?', action: 'next_steps' },
            { label: 'Reset Analisis', action: 'reset_analysis' },
        ];
        return allActions.find(a => a.action === action)?.label;
    };

    // Function to get the current analysis data based on state
    const currentAnalysis = () => {
        if (analysisState === 'cleaned' || analysisState === 'model_optimized') {
            return cleanedAnalysis; // After cleaning or optimization, use cleaned data for summary
        }
        return dummyAnalysis; // Otherwise, use initial dummy data
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 rounded-lg p-4 h-full flex flex-col transition-all duration-300 hover:bg-gray-700/50 shadow-lg border border-gray-700/40"
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
                                ${msg.sender === 'bot' ? 'bg-gray-700/50 text-gray-200 rounded-bl-none' : 'bg-purple-600 text-white rounded-br-none'}
                                `}
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
                                                className="px-3 py-1 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                                                disabled={isLoading}
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
                {isLoading && (
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
            {/* Add CSS for custom typing indicator animation */}
            <style jsx>{`
                @keyframes bounce-dot {
                    0%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-4px); }
                }
                .animate-bounce-dot {
                    animation: bounce-dot 1.4s infinite ease-in-out;
                }
                .delay-1 { animation-delay: 0.2s; }
                .delay-2 { animation-delay: 0.4s; }
            `}</style>
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
    const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisData>(dummyAnalysis); // Explicitly type useState
    const { content } = uploadedFile;
    const rows = content ? content.split('\n') : [];
    const headers = rows.length > 0 && rows[0] ? rows[0].split(',') : []; // Handle empty first row
    const previewRows = rows.slice(1, 6).filter(row => row.trim() !== '');

    const handleAnalysisComplete = (newAnalysis: AnalysisData) => {
        setCurrentAnalysis(newAnalysis);
    };

    return (
        <div className="bg-gradient-to-br from-gray-900/70 to-black/70 rounded-xl p-6 overflow-hidden border border-gray-700/50 mb-6 font-sans w-full max-w-7xl mx-auto shadow-2xl">
            {/* CSS for custom animations */}
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite ease-in-out;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s infinite ease-in-out;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #2a2a2a; /* Darker track */
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #6b46c1; /* Purple thumb */
                    border-radius: 10px;
                    border: 2px solid #2a2a2a; /* Border around thumb */
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #7e57c2; /* Lighter purple on hover */
                }
            `}</style>

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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto min-h-[400px]"> {/* Increased min-height for better balance */}
                <DataSummary analysis={currentAnalysis} />
                <AIChatbot onAnalysisComplete={handleAnalysisComplete} uploadedFile={uploadedFile} />
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
                                            No data to display. Please upload a CSV file.
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