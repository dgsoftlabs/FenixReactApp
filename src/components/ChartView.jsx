import { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Palette that distinguishes series clearly
const COLORS = [
  '#4e79a7', '#f28e2b', '#e15759', '#76b7b2',
  '#59a14f', '#edc948', '#b07aa1', '#ff9da7',
];

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'second',
        displayFormats: { second: 'HH:mm:ss' },
      },
      title: { display: true, text: 'Time' },
    },
    y: {
      title: { display: true, text: 'Value' },
    },
  },
  plugins: {
    tooltip: { mode: 'index', intersect: false },
    legend: { position: 'top' },
  },
  animation: false,
};

const EMPTY_DATA = { datasets: [] };

export default function ChartView({ data }) {
  const chartRef = useRef(null);
  const hasData = data && data.length > 0;

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !hasData) return;

    // Update datasets in-place — no destroy/recreate, no flicker
    data.forEach((series, i) => {
      const points = series.data.map(([x, y]) => ({ x, y }));
      if (chart.data.datasets[i]) {
        chart.data.datasets[i].data = points;
      } else {
        chart.data.datasets[i] = {
          label: series.label ?? `Series ${i + 1}`,
          data: points,
          borderColor: COLORS[i % COLORS.length],
          backgroundColor: COLORS[i % COLORS.length] + '33',
          pointRadius: 3,
          tension: 0.2,
        };
      }
    });
    // Remove stale datasets if series count decreased
    chart.data.datasets.splice(data.length);
    chart.update('none');
  }, [data, hasData]);

  return (
    <div style={{ height: 500, position: 'relative' }}>
      {/* Always keep Line mounted to avoid Chart.js destroy/recreate */}
      <Line ref={chartRef} data={EMPTY_DATA} options={OPTIONS} />
      {!hasData && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--color-surface)',
        }}>
          <span className="chart-placeholder">Loading chart…</span>
        </div>
      )}
    </div>
  );
}
