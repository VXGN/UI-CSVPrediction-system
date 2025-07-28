import React from 'react';
import { motion } from 'framer-motion';

// --- Varian Animasi untuk Seluruh Kontainer ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// --- Varian Animasi untuk Setiap Elemen Teks ---
const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const Hero: React.FC = () => {
  return (
    // Menggunakan div ini untuk memastikan konten tetap di tengah dan menambahkan padding
    <div className="relative z-20 w-full text-center px-4 py-16 md:py-32">
      <motion.section
        className="flex flex-col items-center justify-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Judul Utama --- */}
        <motion.h1
          className="font-extrabold mb-6 leading-tight"
          style={{ fontSize: 'min(12vw, 6rem)' }}
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            WELCOME TO CSV PREDICT
          </span>
        </motion.h1>

        {/* --- Subjudul dan Deskripsi --- */}
        <motion.p
          className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed"
          variants={itemVariants}
        >
          Effortlessly upload, preview, and analyze your CSV files with instant insights.
          <br />
          <span className="text-sm md:text-lg font-light italic text-gray-400">
            "Empowering your data-driven decisions."
          </span>
        </motion.p>

        {/* --- Tombol Call to Action (CTA) --- */}
        <motion.div variants={itemVariants}>
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Hero;