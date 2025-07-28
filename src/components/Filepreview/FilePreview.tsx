import React, { useEffect, useState } from 'react';
import { UploadedFile } from '../../types/file';
import { BarChart3, FileText, Database } from 'lucide-react';
import CSVLineChart from './LineCSV';
import TablePreview from './TablePreview';
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
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

        const formatted: ChartPoint[] = dates.map((date, index) => ({
          x: date,
          y: predictions[index],
        }));

        setChartData(formatted);
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

  return (
    <div className="w-full max-w-7xl mt-8 mx-auto">
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-8 text-center text-white flex items-center justify-center space-x-3">
          <BarChart3 className="h-7 w-7 text-blue-400" />
          <span>Prediction Preview</span>
        </h2>

        <div className="flex flex-col gap-8">
          {/* Prediction Chart */}
          <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-6 h-[400px]">
            <h3 className="text-xl font-semibold text-white mb-4">Prediction Trend</h3>
            <div className="w-full h-full flex items-center justify-center">
              {loading ? (
                <p className="text-white">Loading prediction...</p>
              ) : error ? (
                <p className="text-red-400">{error}</p>
              ) : chartData.length > 0 ? (
                <CSVLineChart xValues={chartData.map(d => d.x)} yValues={chartData.map(d => d.y)} />
              ) : (
                <p className="text-gray-400">No prediction data available.</p>
              )}
            </div>
          </div>

          {/* Table Preview */}
          <div className="flex flex-col h-full">
            <TablePreview uploadedFile={uploadedFile} />
          </div>

          {/* File Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 text-center border border-blue-500/30 hover:scale-105 transition-transform duration-300">
              <Database className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{uploadedFile.rows}</div>
              <div className="text-sm text-gray-400">Rows</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 text-center border border-green-500/30 hover:scale-105 transition-transform duration-300">
              <FileText className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{formatFileSize(uploadedFile.size)}</div>
              <div className="text-sm text-gray-400">Size</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 text-center border border-purple-500/30 hover:scale-105 transition-transform duration-300">
              <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">CSV</div>
              <div className="text-sm text-gray-400">Format</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
