import React from 'react';
import { Heart, Zap, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

// Variants for the entire footer container
const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15, // Stagger animation for each column
    },
  },
};

// Variants for each column/item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gray-900 text-gray-400 mt-20 py-16 border-t border-gray-800/50"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible" // Trigger animation when in view
      viewport={{ once: true, amount: 0.3 }} // Ensures animation only runs once
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Kolom 1: Logo dan Deskripsi Singkat */}
          <motion.div className="flex flex-col space-y-4" variants={itemVariants}>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Predict
              </span>
            </div>
            <p className="text-sm max-w-xs">
              Satu langkah di depan untuk masa depan digital.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-4">
              <span className="inline-block">Dibuat dengan</span>
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.4, rotate: 15 }} // Stronger bounce and rotate
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Heart className="h-4 w-4 text-red-400" />
              </motion.div>
              <span>dan kopi.</span>
            </div>
          </motion.div>

          {/* Kolom 2: Tautan Navigasi */}
          <motion.div className="flex flex-col space-y-3" variants={itemVariants}>
            <h3 className="font-semibold text-white mb-2">Produk</h3>
            <a href="/features" className="text-sm hover:text-white transition-all duration-300 transform hover:translate-x-1">
              Fitur
            </a>
            <a href="/pricing" className="text-sm hover:text-white transition-all duration-300 transform hover:translate-x-1">
              Harga
            </a>
            <a href="/documentation" className="text-sm hover:text-white transition-all duration-300 transform hover:translate-x-1">
              Dokumentasi
            </a>
          </motion.div>

          {/* Kolom 3: Informasi Perusahaan */}
          <motion.div className="flex flex-col space-y-3" variants={itemVariants}>
            <h3 className="font-semibold text-white mb-2">Predict</h3>
            <a href="/about" className="text-sm hover:text-white transition-all duration-300 transform hover:translate-x-1">
              Tentang Kami
            </a>
            <a href="/blog" className="text-sm hover:text-white transition-all duration-300 transform hover:translate-x-1">
              Blog
            </a>
            <a href="/contact" className="text-sm hover:text-white transition-all duration-300 transform hover:translate-x-1">
              Kontak
            </a>
          </motion.div>

          {/* Kolom 4: Media Sosial & Hak Cipta */}
          <motion.div className="flex flex-col space-y-4 lg:text-right" variants={itemVariants}>
            <h3 className="font-semibold text-white mb-2 lg:ml-auto">Ikuti Kami</h3>
            <div className="flex justify-start lg:justify-end items-center space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.3, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6 hover:text-blue-400 transition-colors duration-300" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.3, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                aria-label="GitHub"
              >
                <Github className="h-6 w-6 hover:text-gray-200 transition-colors duration-300" />
              </motion.a>
            </div>
            
            {/* Copyright and Credits Section */}
            <div className="pt-4 mt-auto text-xs text-gray-500 border-t border-gray-800">
              <div className="flex flex-col lg:items-end lg:space-y-1">
                <span>© {currentYear} Predict. All rights reserved.</span>
                <a 
                  href="https://vitejs.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-500 hover:text-white transition-colors duration-300 group"
                  aria-label="Powered by Vite"
                >
                  <span>Didukung oleh</span>
                  <Zap 
                    className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" 
                    aria-hidden="true"
                  />
                  <span className="font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-orange-300 transition-colors duration-300">
                    Vite
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;