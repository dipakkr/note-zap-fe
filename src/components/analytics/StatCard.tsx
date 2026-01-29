import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ label, value, icon, description, trend }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {trend && (
          <div
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              trend.isPositive
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'bg-rose-500/10 text-rose-500'
            }`}
          >
            {trend.isPositive ? '+' : '-'}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-black text-foreground tracking-tight mb-1">
        {value}
      </div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      {description && (
        <div className="text-[10px] text-muted-foreground/70 mt-1">{description}</div>
      )}
    </div>
  );
}
