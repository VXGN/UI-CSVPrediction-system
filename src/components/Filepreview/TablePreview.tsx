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
    const chatContainerRef = useRef<HTMLDivElement>(null);

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
                processBotMessage(
                    `Analisis telah direset. Anda sekarang dapat memulai analisis baru dengan file ini atau file lain.`,
                    [
                        { label: 'Mulai Analisis Data Awal', action: 'start_initial_analysis' }
                    ]
                );
                onAnalysisComplete(dummyAnalysis);
                setAnalysisState('initial');
                break;
            default:
                processBotMessage("Maaf, saya tidak mengerti permintaan Anda. Silakan pilih dari opsi yang tersedia.");
        }
    };

    const getActionLabel = (action: string) => {
        // Helper function to get the label from the action to display in the chat
        const allActions = [
            { label: 'Mulai Analisis Data Awal', action: 'start_initial_analysis' },
            { label: 'Tinjau Statistik Data', action: 'show_data_stats' },
            { label: 'Lihat Ringkasan Prediksi', action: 'show_prediction_summary' },
            { label: 'Tanyakan tentang Data Hilang', action: 'ask_missing_data' },
            { label: 'Bagaimana cara meningkatkan akurasi?', action: 'ask_accuracy_improvement' },
            { label: 'Lakukan Pembersihan Data', action: 'clean_data' },
            { label: 'Lakukan Pembersihan Data Otomatis', action: 'clean_data' },
            { label: 'Lanjutkan dengan Optimasi Model', action: 'optimize_model' },
            { label: 'Coba Optimasi Model', action: 'optimize_model' },
            { label: 'Lihat Ringkasan Prediksi Akhir', action: 'show_prediction_summary' },
            { label: 'Apa langkah selanjutnya?', action: 'next_steps' },
            { label: 'Reset Analisis', action: 'reset_analysis' }
        ];
        return allActions.find(a => a.action === action)?.label;
    };

    const currentAnalysis = () => {
        if (analysisState === 'cleaned' || analysisState === 'model_optimized') {
            return cleanedAnalysis;
        }
        return dummyAnalysis;
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen p-8 flex flex-col items-center font-sans">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                Table Analyzer AI
            </h1>
            <p className="text-gray-400 mb-8">Interactively analyze your data with AI.</p>
            
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 flex-grow">
                {/* Left Panel: Data Summary */}
                <div className="md:w-1/3 w-full flex-shrink-0">
                    <DataSummary analysis={currentAnalysis()} />
                </div>

                {/* Right Panel: AI Chatbot */}
                <div className="md:w-2/3 w-full flex flex-col flex-grow bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700/50">
                    <div className="p-4 border-b border-gray-700/50 flex items-center space-x-3 bg-gray-800/80">
                        <Bot className="w-6 h-6 text-green-400" />
                        <h3 className="font-semibold text-white">AI Chatbot</h3>
                    </div>

                    {/* Chat Window */}
                    <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar">
                        <AnimatePresence>
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`p-3 rounded-lg max-w-[80%] md:max-w-[70%] text-sm shadow-md ${
                                        msg.sender === 'bot' 
                                        ? 'bg-gray-700/70 text-gray-200 rounded-bl-none' 
                                        : 'bg-purple-600/70 text-white rounded-br-none'
                                    }`}>
                                        {/* Render HTML content for bot messages */}
                                        {msg.sender === 'bot' ? (
                                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                        ) : (
                                            msg.text
                                        )}
                                        
                                        {/* Action buttons for bot messages */}
                                        {msg.actions && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {msg.actions.map((action, actionIndex) => (
                                                    <motion.button
                                                        key={actionIndex}
                                                        onClick={() => handleActionClick(action.action)}
                                                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium rounded-full transition-colors duration-200"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
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
                        {/* The chatEndRef is kept, but it is no longer used for auto-scrolling */}
                        <div ref={chatEndRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatbot;