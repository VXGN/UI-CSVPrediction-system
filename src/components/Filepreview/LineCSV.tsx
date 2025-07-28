import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface CSVLineChartProps {
  xValues: (string | number)[];
  yValues: number[];
}

// Komponen untuk area gradient
const StyledPath = styled('path')(({ theme }) => ({
  stroke: 'none',
  fill: 'url(#areaGradient)',
  opacity: 0.6,
  pointerEvents: 'none',
}));

// Komponen pembantu untuk custom area dengan gradient
const CustomArea = ({ xValues, yValues }: CSVLineChartProps) => {
  const { top, bottom, left, width, height } = useDrawingArea();
  
  if (!xValues || xValues.length < 2) return null;

  // Logika untuk membuat path SVG dari data
  const yMax = Math.max(...yValues);
  const getPath = () => {
    let path = `M ${left} ${bottom}`;
    for (let i = 0; i < xValues.length; i++) {
        const x = left + (i / (xValues.length - 1)) * width;
        const y = top + (1 - yValues[i] / yMax) * height;
        path += ` L ${x} ${y}`;
    }
    path += ` L ${left + width} ${bottom} Z`;
    return path;
  };

  return <StyledPath d={getPath()} />;
};

const CSVLineChart: React.FC<CSVLineChartProps> = ({ xValues, yValues }) => {
  const chartHeight = 350;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ position: 'relative', width: '100%' }}
    >
      <LineChart
        xAxis={[{ 
          data: xValues, 
          scaleType: 'band', 
          tickLabelStyle: { fill: 'white' },
          labelStyle: { fill: 'white' },
        }]}
        yAxis={[{ 
          tickLabelStyle: { fill: 'white' }, 
          labelStyle: { fill: 'white' },
        }]}
        series={[{ 
          data: yValues, 
          curve: 'catmullRom', // Menggunakan kurva yang lebih halus
          area: true,
          color: '#3498db', // Warna garis utama
          animationDuration: 1200,
          animationEasing: 'easeInOutQuart',
        }]}
        grid={{ horizontal: true }}
        height={chartHeight}
        margin={{ top: 30, right: 30, bottom: 30, left: 60 }}
        sx={{
          '& .MuiChartsGrid-line': {
            stroke: 'rgba(255, 255, 255, 0.1)',
            strokeDasharray: '4 4',
          },
          '& .MuiChartsAxis-tick': {
            strokeOpacity: 0,
          },
          '& .MuiChartsAxis-line': {
            stroke: 'rgba(255, 255, 255, 0.2)',
          },
          '& .MuiLineElement-root': {
            strokeWidth: 3, // Garis lebih tebal
            transition: 'stroke-width 0.3s ease-in-out',
          },
          // Efek hover pada garis
          '& .MuiLineElement-root:hover': {
            strokeWidth: 5,
            filter: 'drop-shadow(0 0 8px rgba(52, 152, 219, 0.8))',
          },
          '& .MuiMarkElement-root': {
            strokeWidth: 0,
            fill: 'white',
            r: 4,
            transition: 'all 0.3s ease-in-out',
          },
          // Efek hover pada titik data
          '& .MuiMarkElement-root:hover': {
            strokeWidth: 4,
            r: 8,
            stroke: 'white',
            strokeOpacity: 0.8,
            fill: '#87CEFA',
          },
          '& .MuiChartsTooltip-root': {
            backgroundColor: 'rgba(24, 32, 48, 0.9) !important',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: 'white !important',
          },
          backgroundColor: '#182030',
          borderRadius: 3,
          marginBottom: 3,
        }}
      >
        {/* Definisi gradient untuk area */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3498db" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CustomArea xValues={xValues} yValues={yValues} />
      </LineChart>
    </motion.div>
  );
};

export default CSVLineChart;