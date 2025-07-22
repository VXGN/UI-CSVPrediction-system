import React from 'react';
import { Info, HelpCircle, Users } from 'lucide-react';

const Body: React.FC = () => {
  return (
    <div className="space-y-9">
      <div className="flex flex-row space-x-6 animate-slide-in-right">

      {/* Description */}
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Info className="h-6 w-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">About</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">
          A powerful CSV file System prediction using python and tensorflow as the main engine
        </p>
      </div>
    
      {/* Help */}
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <HelpCircle className="h-6 w-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">How to Use</h3>
        </div>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
            <span>Drag and drop your CSV file or click to browse</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
            <span>Preview your data instantly</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
            <span>Analyze file statistics and content</span>
          </li>
        </ul>
      </div>
      </div>
      
      {/* Team */}
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-6 w-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Our Team</h3>
        </div>
        <div className="flex flex-row space-x-3">
          {['Fanndev', 'VXGN', 'Zerofound'].map((member, index) => (
            <div key={member} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group">
              <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-green-400' : 'bg-purple-400'
                } group-hover:scale-110 transition-transform`}></div>
              <span className="text-gray-300 group-hover:text-white transition-colors">{member}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;