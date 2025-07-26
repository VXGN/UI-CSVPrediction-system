import React, { useMemo } from 'react';
import { UploadedFile } from '../../types/file';
import { BarChart3, FileText, Database } from 'lucide-react';
import CSVLineChart from './LineCSV';
import TablePreview from './TablePreview';

interface FilePreviewProps {
  uploadedFile: UploadedFile;
  formatFileSize: (bytes: number) => string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ uploadedFile, formatFileSize }) => {
  const chartData = useMemo(() => {
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

  const xValues = chartData.map(d => d?.x);
  const yValues = chartData.map(d => d?.y);

  return (
    <div className="w-full max-w-7xl mt-8 mx-auto">
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-8 text-center text-white flex items-center justify-center space-x-3">
          <BarChart3 className="h-7 w-7 text-blue-400" />
          <span>File Preview</span>
        </h2>

        {/* Tampilan Konten Vertikal */}
        <div className="flex flex-col gap-8">
          {/* Bagian Grafik yang Diperbesar dan Lebih Vertikal */}
          <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-6 h-[400px]"> {/* Increased height */}
            <h3 className="text-xl font-semibold text-white mb-4">Data Trend</h3>
            <div className="w-full h-full flex items-center justify-center"> {/* Ensures chart takes full available space */}
              <CSVLineChart xValues={xValues} yValues={yValues} />
            </div>
          </div>

          {/* Bagian Tabel Pratinjau */}
          <div className="flex flex-col h-full">
            <TablePreview uploadedFile={uploadedFile} />
          </div>

          {/* Statistik File */}
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