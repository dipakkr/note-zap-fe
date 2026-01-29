import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface DailyData {
  date: string;
  count: number;
  fullDate: Date;
}

interface DailyBookmarksChartProps {
  data: DailyData[];
  thisWeekCount: number;
}

const CHART_COLOR = '#10b981'; // Emerald

export function DailyBookmarksChart({ data, thisWeekCount }: DailyBookmarksChartProps) {
  return (
    <div className="bg-card border border-border rounded-2xl">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" style={{ color: CHART_COLOR }} />
              Daily Bookmarks
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold" style={{ color: CHART_COLOR }}>
              {thisWeekCount}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-2">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorBookmarks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#888888"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                width={30}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
                        <p className="text-xs text-zinc-400 mb-1">{label}</p>
                        <p className="text-sm font-semibold" style={{ color: CHART_COLOR }}>
                          {payload[0].value} {Number(payload[0].value) === 1 ? 'bookmark' : 'bookmarks'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke={CHART_COLOR}
                fillOpacity={1}
                fill="url(#colorBookmarks)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
