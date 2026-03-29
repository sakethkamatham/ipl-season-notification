'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface WicketsData {
  match: string;
  wickets: number;
  economy?: number;
}

interface WicketsChartProps {
  data: WicketsData[];
}

export default function WicketsChart({ data }: WicketsChartProps) {
  if (!data.length) return null;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="match" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="wickets"
            stroke="#FFB700"
            strokeWidth={2}
            dot={{ fill: '#FFB700' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
