import React, { useState, useEffect, useRef } from 'react';
import { UploadedFile } from '../../types/file';
import { Bot, FileText, BarChart2, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
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

// ---
// Komponen Data Summary yang lebih dinamis
// ---
const DataSummary = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800/50 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700/50 flex flex-col h-full"
  >
    <h4 className="font-semibold text-gray-200 mb-2 flex items-center space-x-2">
      <FileText className="w-5 h-5 text-purple-400" />
      <span>Data Summary</span>
    </h4>
    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Total Rows:</span>
          <span className="font-medium text-white">{dummyAnalysis.totalRows}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total Columns:</span>
          <span className="font-medium text-white">{dummyAnalysis.totalCols}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Missing Rows:</span>
          <span className={`font-medium ${dummyAnalysis.missingRows > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {dummyAnalysis.missingRows}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Prediction Model:</span>
          <span className="font-medium text-white">{dummyAnalysis.predictionModel}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Accuracy Score:</span>
          <span className="font-medium text-white">{dummyAnalysis.accuracyScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Prediction Status:</span>
          <span className={`font-medium ${dummyAnalysis.predictionStatus === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
            {dummyAnalysis.predictionStatus}
          </span>
        </div>
      </div>
    </div>
    <div className="mt-4 border-t border-gray-700 pt-4">
      <h5 className="font-semibold text-gray-300 mb-2">Column Statistics</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(dummyAnalysis.columnStats).map(([col, stats]) => (
          <div key={col} className="bg-gray-700/50 rounded-md p-2">
            <h6 className="text-xs font-semibold text-gray-300">{col}</h6>
            <ul className="text-xs text-gray-400 mt-1 space-y-1">
              <li>Mean: <span className="font-medium text-white">{stats.mean.toFixed(2)}</span></li>
              <li>Std Dev: <span className="font-medium text-white">{stats.std.toFixed(2)}</span></li>
              <li>Min: <span className="font-medium text-white">{stats.min}</span></li>
              <li>Max: <span className="font-medium text-white">{stats.max}</span></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// ---
// Komponen AI Chatbot yang lebih interaktif
// ---
const AIChatbot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
        `Analisis data selesai. Kami mendeteksi **${dummyAnalysis.missingRows}** baris data yang hilang.`,
        [
          { label: 'Lihat ringkasan prediksi', action: 'show_prediction_summary' },
          { label: 'Tanya tentang data hilang', action: 'ask_missing_data' },
        ]
      );
    } else if (action === 'show_prediction_summary') {
      const predictionSummary = `Prediksi berhasil dilakukan dengan akurasi **${(dummyAnalysis.accuracyScore * 100).toFixed(1)}%** menggunakan model **${dummyAnalysis.predictionModel}**.
      <br/><br/>Berikut contoh hasil prediksi pada beberapa baris data:
      <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
        ${dummyAnalysis.predictedValues
          .map(p => `<li>Baris **${p.row}**: **${p.value}** (Confidence: ${(p.confidence * 100).toFixed(1)}%)</li>`)
          .join('')}
      </ul>`;
      processBotMessage(predictionSummary, [
        { label: 'Bagaimana cara meningkatkan akurasi?', action: 'ask_accuracy_improvement' },
        { label: 'Analisis ulang', action: 'start_analysis' },
      ]);
    } else if (action === 'ask_missing_data') {
      processBotMessage(
        `Untuk mengatasi data yang hilang, Anda bisa mencoba metode berikut:
        <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Mengisi nilai yang hilang dengan rata-rata atau median.</li>
          <li>Menghapus baris atau kolom yang memiliki terlalu banyak nilai hilang.</li>
        </ul>
        <br/>Ini dapat membantu meningkatkan kualitas prediksi.`,
        [
          { label: 'Lanjutkan ke ringkasan prediksi', action: 'show_prediction_summary' },
          { label: 'Tanya lagi', action: 'reset' },
        ]
      );
    } else if (action === 'ask_accuracy_improvement') {
      const advice = `Untuk meningkatkan akurasi, pertimbangkan hal-hal ini:
      <ul class="list-disc list-inside mt-2 space-y-1 text-gray-300">
        <li>Melakukan **Feature Engineering** untuk membuat fitur baru dari data yang ada.</li>
        <li>Menggunakan model prediksi yang lebih canggih seperti Gradient Boosting atau Neural Network.</li>
        <li>Membersihkan data Anda lebih lanjut, terutama nilai yang hilang dan outlier.</li>
      </ul>`;
      processBotMessage(advice, [{ label: 'Analisis ulang', action: 'start_analysis' }]);
    } else if (action === 'reset') {
      setMessages([]);
      processBotMessage('Halo! Saya AI Assistant. Klik tombol di bawah untuk memulai analisis data.', [
        { label: 'Mulai analisis', action: 'start_analysis' },
      ]);
    }
  };

  useEffect(() => {
    processBotMessage('Halo! Saya AI Assistant. Saya siap membantu Anda menganalisis data. Klik tombol di bawah untuk memulai.', [
      { label: 'Mulai analisis', action: 'start_analysis' },
    ]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 rounded-lg p-4 h-64 flex flex-col transition-all duration-300 hover:bg-gray-700/50"
    >
      <h4 className="font-semibold text-gray-200 mb-2">AI Assistant Chat</h4>
      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
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
  const { content } = uploadedFile;
  const rows = content ? content.split('\n') : [];
  const headers = rows.length > 0 ? rows[0]?.split(',') : [];
  const previewRows = rows.slice(1, 6).filter(row => row.trim() !== '');

  return (
    <div className="bg-gradient-to-br from-gray-900/70 to-black/70 rounded-xl p-6 overflow-hidden border border-gray-700/50 mb-6 font-sans w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-4 h-4 bg-green-400 rounded-full"
          />
          <span>Content Preview</span>
        </h3>
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-cyan-400" />
          <span className="text-sm text-gray-400">AI Assistant</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto min-h-[350px]">
        <DataSummary />
        <AIChatbot />
      </div>

      <div className="mt-6 border-t border-gray-700/50 pt-4">
        <h4 className="font-semibold text-gray-200 mb-2 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-green-400" />
          <span>Table Content</span>
        </h4>
        <div className="overflow-auto max-h-64 rounded-lg border border-gray-700/40">
          <table className="min-w-full divide-y divide-gray-700 text-sm text-gray-300">
            <thead className="bg-gray-800/80 sticky top-0 z-10">
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
              {previewRows.length > 0 ? (
                previewRows.map((row, i) => {
                  const cols = row.split(',');
                  return (
                    <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                      {cols.map((col, j) => (
                        <td key={j} className="px-4 py-2 whitespace-nowrap">
                          {col}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={headers.length || 1} className="px-4 py-4 text-center text-gray-500">
                    No data to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablePreview;