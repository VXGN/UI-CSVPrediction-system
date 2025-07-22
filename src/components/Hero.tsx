import React from 'react';

const Hero: React.FC = () => (
  <section className="w-full text-center py-12 mb-28">
    <h1 className="text-4xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
      WELCOME TO CSV PREDICT
    </h1>
    <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
      Effortlessly upload, preview, and analyze your CSV files with instant insights.<br/>
      "Empowering your data-driven decisions."
    </p>
  </section>
);

export default Hero; 