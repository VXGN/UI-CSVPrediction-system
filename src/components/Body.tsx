import React from 'react';
import { Info, HelpCircle, Users, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Fanndev', github: 'https://github.com/Fanndev', role: 'Frontend Developer' },
  { name: 'VXGN', github: 'https://github.com/vxgn', role: 'Backend Engineer' },
  { name: 'Zerofound', github: 'https://github.com/zerofound', role: 'Data Scientist' },
];

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  hover: {
    scale: 1.02,
    boxShadow: "0 15px 30px rgba(0,0,0,0.3)", // Stronger shadow
    transition: { type: "spring", stiffness: 300, damping: 10 }
  },
  tap: { scale: 0.98 }, // Added a tap variant for a "press down" feel
};

const iconVariants = {
  hover: { scale: 1.1, rotate: 10, transition: { type: "spring", stiffness: 400 } },
};

const Body: React.FC = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{
          backgroundImage: 'linear-gradient(135deg, #0f172a, #1e293b, #0f172a)',
          backgroundSize: '200% 200%',
        }}
      />
      
      <div className="relative z-10 space-y-9 px-4 py-8 md:px-8 lg:px-12">
        {/* Description & Help Section */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Description Card */}
          <motion.div
            className="flex-1 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl group cursor-pointer"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <motion.div variants={iconVariants} whileHover="hover">
                <Info className="h-6 w-6 text-blue-400 group-hover:animate-pulse" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">About</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              A powerful CSV file System prediction using python and tensorflow as the main engine
            </p>
          </motion.div>

          {/* How to Use Card */}
          <motion.div
            className="flex-1 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl group cursor-pointer"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <motion.div variants={iconVariants} whileHover="hover">
                <HelpCircle className="h-6 w-6 text-green-400 group-hover:animate-pulse" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">How to Use</h3>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-2 group hover:text-white transition-colors duration-300">
                <span className="w-2.5 h-2.5 bg-blue-400 rounded-full mt-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-150"></span>
                <span>Drag and drop your CSV file or click to browse</span>
              </li>
              <li className="flex items-start space-x-2 group hover:text-white transition-colors duration-300">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full mt-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-150"></span>
                <span>Preview your data instantly</span>
              </li>
              <li className="flex items-start space-x-2 group hover:text-white transition-colors duration-300">
                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full mt-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-150"></span>
                <span>Analyze file statistics and content</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Our Team Section */}
        <motion.div
          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <motion.div variants={iconVariants} whileHover="hover">
              <Users className="h-6 w-6 text-purple-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white">Our Team</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.a 
                key={member.name}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 md:p-6 rounded-xl bg-gray-700/30 overflow-hidden group border border-gray-700/50 flex items-center space-x-4 transition-all duration-300 transform-gpu hover:border-blue-400"
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: 5, // Subtle 3D effect on hover
                  boxShadow: "0 10px 20px rgba(0,0,0,0.3), 0 0 15px rgba(59, 130, 246, 0.5)", // Add a blue glow
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <div
                  className={`absolute inset-0 w-full h-full opacity-0 blur-sm transition-all duration-500 z-0
                    ${index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-green-400' : 'bg-purple-400'}`}
                />
                
                <div className="relative z-10 flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white
                    ${index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-green-400' : 'bg-purple-400'}`}
                  >
                    {member.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-white font-semibold group-hover:text-yellow-400 transition-colors duration-300">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {member.role}
                    </p>
                  </div>
                </div>
                
                <div className="relative z-10 p-2 rounded-full bg-gray-600/50 group-hover:bg-gray-600/80 transition-colors duration-300">
                  <Github className="h-5 w-5 text-gray-300 group-hover:text-white" aria-label={`Profil GitHub ${member.name}`} />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Body;