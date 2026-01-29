import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ContentTypeData } from './useAnalyticsData';

interface ContentTypePieChartProps {
  data: ContentTypeData[];
}

export function ContentTypePieChart({ data }: ContentTypePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No data available
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <div className="w-40 h-40 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as ContentTypeData;
                  return (
                    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-xs font-bold text-foreground">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.value} ({((item.value / total) * 100).toFixed(0)}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-foreground">{total}</span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Total
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground truncate">
                  {item.name}
                </span>
                <span className="text-xs font-bold text-muted-foreground ml-2">
                  {item.value}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.value / total) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
