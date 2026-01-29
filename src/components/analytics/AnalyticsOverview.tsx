import { Bookmark, TrendingUp, Star, Sparkles } from 'lucide-react';
import type { Bookmark as BookmarkType } from '../../services/bookmarkService';
import { useAnalyticsData } from './useAnalyticsData';
import { DailyBookmarksChart } from './DailyBookmarksChart';
import { ContentTypePieChart } from './ContentTypePieChart';
import { TopTagsList } from './TopTagsList';

interface AnalyticsOverviewProps {
  bookmarks: BookmarkType[];
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-8 px-4 text-center max-w-lg mx-auto animate-fade-in">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-primary/20">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-xl font-black text-foreground tracking-tight mb-3">
        Your Insights Are Coming
      </h2>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        Save at least 5 bookmarks to unlock your personal insights dashboard.
      </p>
    </div>
  );
}

export function AnalyticsOverview({ bookmarks }: AnalyticsOverviewProps) {
  const analytics = useAnalyticsData(bookmarks);

  if (!analytics.hasEnoughData) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-black text-foreground tracking-tight">
          Your Insights
        </h1>
        <p className="text-xs lg:text-sm text-muted-foreground mt-1">
          Track your bookmarking activity and discover patterns.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total Saved</span>
            <Bookmark className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-black text-emerald-500">
            {analytics.stats.totalBookmarks}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">This Week</span>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-black text-emerald-500">
            {analytics.stats.thisWeekSaves}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Favorites</span>
            <Star className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-black text-emerald-500">
            {analytics.stats.totalFavorites}
          </div>
        </div>
      </div>

      {/* Daily Bookmarks Chart */}
      <DailyBookmarksChart
        data={analytics.dailyData}
        thisWeekCount={analytics.stats.thisWeekSaves}
      />

      {/* Content Distribution & Top Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Type Distribution */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">
            What You Save
          </h3>
          <ContentTypePieChart data={analytics.contentTypes} />
        </div>

        {/* Top Tags */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">
            Your Top Topics
          </h3>
          <TopTagsList tags={analytics.topTags} />
        </div>
      </div>
    </div>
  );
}
