import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import type { TimelineData } from './useAnalyticsData';

interface ActivityTimelineProps {
  data: TimelineData[];
  timeRange: 'weekly' | 'monthly';
  onTimeRangeChange: (range: 'weekly' | 'monthly') => void;
}

export function ActivityTimeline({
  data,
  timeRange,
  onTimeRangeChange,
}: ActivityTimelineProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  if (data.every((d) => d.count === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">No activity in this period</p>
        <p className="text-[11px] mt-1">Start saving bookmarks to see your activity</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-muted rounded-lg p-0.5 border border-border">
          <button
            onClick={() => onTimeRangeChange('weekly')}
            className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
              timeRange === 'weekly'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => onTimeRangeChange('monthly')}
            className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
              timeRange === 'monthly'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              allowDecimals={false}
              width={30}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as TimelineData;
                  return (
                    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-xs font-bold text-foreground">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.count} bookmark{item.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.count === maxCount
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--primary) / 0.4)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
