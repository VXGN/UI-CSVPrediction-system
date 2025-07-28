import React from 'react';
import { LineChart, axisClasses } from '@mui/x-charts';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

// Definisi props untuk komponen, menambahkan label dan judul opsional
interface CSVLineChartProps {
  xValues: (string | number)[];
  yValues: number[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

// Styling untuk container chart
const ChartContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: '#182030',
  borderRadius: '12px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
  },
}));

// Komponen utama
const CSVLineChart: React.FC<CSVLineChartProps> = ({ xValues, yValues, title, xLabel, yLabel }) => {
  const chartHeight = 350;

  return (
    <ChartContainer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {title && (
        <Typography 
          variant="h6" 
          align="center" 
          color="white" 
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
          tickLabelStyle: { fill: 'white' },
          labelStyle: { fill: 'white', fontWeight: 'bold' },
        }]}
        yAxis={[{
          label: yLabel,
          tickLabelStyle: { fill: 'white' },
          labelStyle: { fill: 'white', fontWeight: 'bold' },
        }]}
        series={[{
          data: yValues,
          curve: 'catmullRom',
          area: true,
          color: '#3498db',
          animationDuration: 1200,
          animationEasing: 'easeInOutQuart',
          showMark: true, // Menampilkan titik data secara default
        }]}
        grid={{ horizontal: true }}
        height={chartHeight}
        margin={{ top: 30, right: 30, bottom: 40, left: 60 }}
        sx={{
          // Gaya untuk grid, garis sumbu, dan label
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.line}`]: { stroke: 'rgba(255, 255, 255, 0.2)' },
            [`.${axisClasses.tick}`]: { stroke: 'rgba(255, 255, 255, 0.2)' },
            [`.${axisClasses.label}`]: { fill: 'white', fontWeight: 'bold' },
          },
          '& .MuiChartsGrid-line': {
            stroke: 'rgba(255, 255, 255, 0.1)',
            strokeDasharray: '4 4',
          },
          // Garis utama chart
          '& .MuiLineElement-root': {
            strokeWidth: 3,
            transition: 'stroke-width 0.3s ease-in-out, filter 0.3s ease-in-out',
            filter: 'drop-shadow(0 0 4px rgba(52, 152, 219, 0.6))',
            '&:hover': {
              strokeWidth: 5,
              filter: 'drop-shadow(0 0 10px rgba(52, 152, 219, 1))',
            },
          },
          // Titik data
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
          // Tooltip
          '& .MuiChartsTooltip-root': {
            backgroundColor: 'rgba(24, 32, 48, 0.9) !important',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: 'white !important',
          },
        }}
      >
        {/* Definisi gradient untuk area. Lebih sederhana dan terintegrasi */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3498db" stopOpacity={0.4} />
            <stop offset="90%" stopColor="#3498db" stopOpacity={0.05} />
          </linearGradient>
        </defs>
      </LineChart>
    </ChartContainer>
  );
};

export default CSVLineChart;