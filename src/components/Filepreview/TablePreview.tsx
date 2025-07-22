import React from 'react';
import { UploadedFile } from '../../types/file';

interface TablePreview {
    uploadedFile: UploadedFile
}

const TablePreview: React.FC<TablePreview> = ({ uploadedFile }) => {
      return (   
        <div className="bg-gradient-to-br from-gray-900/70 to-black/70 rounded-xl p-6 overflow-hidden border border-gray-700/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <span>Content Preview</span>
            </h3>
          </div>
          <div className="overflow-auto max-h-36 rounded-lg border border-gray-700/40">
            <table className="min-w-full divide-y divide-gray-700 text-sm text-gray-300">
              <thead className="bg-gray-800/80 sticky top-0 z-10">
                <tr>
                  {uploadedFile.content
                    .split('\n')[0]
                    .split(',')
                    .map((header, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left font-medium text-gray-200 whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {uploadedFile.content
                  .split('\n')
                  .slice(1)
                  .map((row, i) => {
                    const cols = row.split(',');
                    return (
                      <tr key={i} className="hover:bg-gray-800/40">
                        {cols.map((col, j) => (
                          <td key={j} className="px-4 py-2 whitespace-nowrap">
                            {col}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        )
    }

export default TablePreview;