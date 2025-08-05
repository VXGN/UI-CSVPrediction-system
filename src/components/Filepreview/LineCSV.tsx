import React from 'react';
import { LineChart, axisClasses } from '@mui/x-charts';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

// Definisi props untuk komponen
interface CSVLineChartProps {
  xValues: (string | number)[];
  originalYValues: (number | null)[];
  predictedYValues?: (number | null)[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

// Komponen styled untuk container, memisahkan logika styling dan animasi
const ChartContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: '#182030',
  borderRadius: '16px', // Sudut yang lebih bulat
  boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
  padding: '24px', // Padding lebih besar untuk estetika
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
  },
}));

const CSVLineChart: React.FC<CSVLineChartProps> = ({
  xValues,
  originalYValues,
  predictedYValues,
  title = 'Visualisasi Data',
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
}) => {
  const chartHeight = 350;
  const gradientId = `areaGradient-${Math.random().toString(36).substr(2, 9)}`;

  // Objek konfigurasi gaya untuk memisahkan logika dari JSX
  const chartStyles = {
    [`.${axisClasses.root}`]: {
      [`.${axisClasses.line}`]: { stroke: 'rgba(255, 255, 255, 0.2)' },
      [`.${axisClasses.tick}`]: { stroke: 'rgba(255, 255, 255, 0.2)' },
      [`.${axisClasses.label}`]: { fill: 'white', fontWeight: 'bold' },
    },
    '& .MuiChartsGrid-line': {
      stroke: 'rgba(255, 255, 255, 0.1)',
      strokeDasharray: '4 4',
    },
    '& .MuiLineElement-root': {
      strokeWidth: 3,
      transition: 'stroke-width 0.3s ease-in-out, filter 0.3s ease-in-out',
      filter: 'drop-shadow(0 0 4px rgba(52, 152, 219, 0.6))',
      '&:hover': {
        strokeWidth: 5,
        filter: 'drop-shadow(0 0 10px rgba(52, 152, 219, 1))',
      },
    },
    '& .MuiMarkElement-root': {
      r: 4,
      fill: 'rgba(255, 255, 255, 0.8)',
      stroke: '#3498db',
      strokeWidth: 2,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        r: 8,
        strokeWidth: 4,
        stroke: '#ffffff',
        fill: '#87CEFA',
      },
    },
    '& .MuiChartsTooltip-root': {
      backgroundColor: 'rgba(24, 32, 48, 0.9) !important',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'white !important',
      // Peningkatan UX: Pastikan tooltip tidak terpotong
      zIndex: 9999,
    },
  };

  // Logika pembuatan series dipindahkan ke variabel untuk keterbacaan
  const series = [
    {
      data: originalYValues,
      curve: 'catmullRom',
      area: true,
      color: `url(#${gradientId})`, // Menggunakan gradien sebagai warna area
      animationDuration: 1200,
      animationEasing: 'easeInOutQuart',
      label: 'Data Asli', // Menambahkan label untuk legenda
    },
    // Logika kondisional untuk series prediksi
    ...(predictedYValues && predictedYValues.some(y => y !== null && y !== undefined)
      ? [{
          data: predictedYValues,
          curve: 'catmullRom',
          area: false,
          color: '#ff9800', // Warna oranye untuk prediksi
          animationDuration: 1200,
          animationEasing: 'easeInOutQuart',
          label: 'Data Prediksi',
        }]
      : []),
  ];

  return (
    <ChartContainer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {title && (
        <Typography
          variant="h6"
          align="center"
          color="#ffffff"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2 }}
        >
          {title}
        </Typography>
      )}
      <LineChart
        xAxis={[{
          data: xValues,
          scaleType: 'band',
          label: xLabel,
          tickLabelStyle: { fill: 'rgba(255, 255, 255, 0.7)' }, // Warna teks lebih soft
          labelStyle: { fill: 'white', fontWeight: 'bold' },
        }]}
        yAxis={[{
          label: yLabel,
          tickLabelStyle: { fill: 'rgba(255, 255, 255, 0.7)' },
          labelStyle: { fill: 'white', fontWeight: 'bold' },
        }]}
        series={series}
        grid={{ horizontal: true }}
        height={chartHeight}
        margin={{ top: 30, right: 30, bottom: 40, left: 60 }}
        sx={chartStyles}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3498db" stopOpacity={0.4} />
            <stop offset="90%" stopColor="#3498db" stopOpacity={0.05} />
          </linearGradient>
        </defs>
      </LineChart>
    </ChartContainer>
  );
};

export default CSVLineChart;