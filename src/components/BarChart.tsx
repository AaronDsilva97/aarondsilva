interface BarChartProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  maxValue?: number;
  height?: string;
}

export default function BarChart({ data, maxValue, height = '300px' }: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="bar-chart" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.25rem',
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary, #64748b)'
          }}>
            <span style={{ fontWeight: 500 }}>{item.label}</span>
            <span style={{ fontWeight: 600 }}>{item.value}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '32px',
            backgroundColor: 'rgba(148, 163, 184, 0.1)',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <div style={{
              width: `${(item.value / max) * 100}%`,
              height: '100%',
              backgroundColor: item.color || '#8b5cf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '0.5rem',
              transition: 'width 0.3s ease',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
