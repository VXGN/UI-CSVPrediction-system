import React from 'react';
import { Heart, Zap, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-20 py-16 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Kolom 1: Logo dan Deskripsi Singkat */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Predict
              </span>
            </div>
            <p className="text-sm">
              Satu langkah di depan untuk masa depan digital.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="inline-block">Dibuat dengan</span>
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Heart className="h-4 w-4 text-red-400" />
              </motion.div>
              <span>dan kopi.</span>
            </div>
          </div>

          {/* Kolom 2: Tautan Navigasi */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-white mb-2">Produk</h3>
            <a href="/features" className="text-sm hover:text-white transition-colors duration-300">
              Fitur
            </a>
            <a href="/pricing" className="text-sm hover:text-white transition-colors duration-300">
              Harga
            </a>
            <a href="/documentation" className="text-sm hover:text-white transition-colors duration-300">
              Dokumentasi
            </a>
          </div>

          {/* Kolom 3: Informasi Perusahaan */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-white mb-2">Perusahaan</h3>
            <a href="/about" className="text-sm hover:text-white transition-colors duration-300">
              Tentang Kami
            </a>
            <a href="/blog" className="text-sm hover:text-white transition-colors duration-300">
              Blog
            </a>
            <a href="/contact" className="text-sm hover:text-white transition-colors duration-300">
              Kontak
            </a>
          </div>

          {/* Kolom 4: Media Sosial & Hak Cipta */}
          <div className="flex flex-col space-y-4 lg:text-right">
            <h3 className="font-semibold text-white mb-2 lg:ml-auto">Ikuti Kami</h3>
            <div className="flex justify-start lg:justify-end items-center space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6 hover:text-blue-400 transition-colors duration-300" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                aria-label="GitHub"
              >
                <Github className="h-6 w-6 hover:text-gray-200 transition-colors duration-300" />
              </motion.a>
            </div>
            
            <div className="flex justify-start lg:justify-end items-center space-x-2 text-sm mt-8 pt-4 border-t border-gray-800">
              <span>© {currentYear} Nama Perusahaan.</span>
              <a 
                href="https://vitejs.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-white transition-colors duration-300 group"
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

        </div>
      </div>
    </footer>
  );
};

export default Footer;