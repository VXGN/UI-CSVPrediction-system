import React from 'react';
import { LineChart } from '@mui/x-charts';

interface CSVLineChartProps {
  xValues: (string | number)[];
  yValues: number[];
}

const CSVLineChart: React.FC<CSVLineChartProps> = ({ xValues, yValues }) => {
  return (
    <LineChart
      xAxis={[{ data: xValues, scaleType: 'band', tickLabelStyle: { fill: 'white' } }]}
      yAxis={[{tickLabelStyle: { fill: 'white' }, }]}
      series={[{ data: yValues, curve: 'linear'}]}
      grid={{ horizontal: true }}
      height={350}
      sx={{
        '& .MuiChartsGrid-line': {
          stroke: 'white',
          strokeOpacity: 0.6,
        },
        '& .MuiChartsAxis-tick': {
          strokeOpacity: 0,
        },
        '& .MuiLineElement-root': {
          stroke: '#90caf9',
        },
        backgroundColor: '#182030',
        borderRadius: 3,
        marginBottom: 3,
      }}
    />
  );
};

export default CSVLineChart;
