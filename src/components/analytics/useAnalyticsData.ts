import { useMemo } from 'react';
import type { Bookmark } from '../../services/bookmarkService';
import { startOfWeek, subWeeks, format, isWithinInterval, startOfMonth, subMonths, startOfDay, subDays, isSameDay } from 'date-fns';

export interface ContentTypeData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export interface TimelineData {
  label: string;
  count: number;
  startDate: Date;
  endDate: Date;
}

export interface TagData {
  name: string;
  count: number;
  percentage: number;
}

export interface AnalyticsStats {
  totalBookmarks: number;
  totalFavorites: number;
  thisWeekSaves: number;
  mostUsedSource: 'extension' | 'web' | null;
}

export interface DailyData {
  date: string;
  count: number;
  fullDate: Date;
}

export interface AnalyticsData {
  contentTypes: ContentTypeData[];
  timeline: TimelineData[];
  topTags: TagData[];
  stats: AnalyticsStats;
  dailyData: DailyData[];
  hasEnoughData: boolean;
}

const CONTENT_TYPE_COLORS: Record<string, string> = {
  tweet: '#3B82F6',
  linkedin: '#6366F1',
  thread: '#A855F7',
  article: '#10B981',
  link: '#F59E0B',
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  tweet: 'Tweets',
  linkedin: 'LinkedIn',
  thread: 'Threads',
  article: 'Articles',
  link: 'Links',
};

export function useAnalyticsData(
  bookmarks: Bookmark[],
  timeRange: 'weekly' | 'monthly' = 'weekly'
): AnalyticsData {
  return useMemo(() => {
    const now = new Date();

    const contentBookmarks = bookmarks.filter(
      (b) =>
        !b.tags?.includes('profile') &&
        !b.isProfile &&
        !b.linkedinData?.isProfile &&
        !b.linkedinProfileData &&
        !b.twitterProfileData
    );

    const typeCount: Record<string, number> = {};
    contentBookmarks.forEach((b) => {
      const type = b.type === 'twitter' ? 'tweet' : b.type;
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    const contentTypes: ContentTypeData[] = Object.entries(typeCount)
      .map(([name, value]) => ({
        name: CONTENT_TYPE_LABELS[name] || name,
        value,
        color: CONTENT_TYPE_COLORS[name] || '#6B7280',
      }))
      .sort((a, b) => b.value - a.value);

    const timeline: TimelineData[] = [];
    const periods = timeRange === 'weekly' ? 8 : 6;

    for (let i = periods - 1; i >= 0; i--) {
      let startDate: Date;
      let endDate: Date;
      let label: string;

      if (timeRange === 'weekly') {
        startDate = startOfWeek(subWeeks(now, i), { weekStartsOn: 1 });
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        label = format(startDate, 'MMM d');
      } else {
        startDate = startOfMonth(subMonths(now, i));
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);
        label = format(startDate, 'MMM');
      }

      const count = contentBookmarks.filter((b) => {
        const createdAt = new Date(b.createdAt);
        return isWithinInterval(createdAt, { start: startDate, end: endDate });
      }).length;

      timeline.push({ label, count, startDate, endDate });
    }

    const tagCount: Record<string, number> = {};
    contentBookmarks.forEach((b) => {
      b.tags?.forEach((tag) => {
        if (tag !== 'profile') {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        }
      });
    });

    const maxTagCount = Math.max(...Object.values(tagCount), 1);
    const topTags: TagData[] = Object.entries(tagCount)
      .map(([name, count]) => ({
        name,
        count,
        percentage: (count / maxTagCount) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const thisWeekSaves = contentBookmarks.filter(
      (b) => new Date(b.createdAt) >= thisWeekStart
    ).length;

    const extensionCount = contentBookmarks.filter((b) => b.source === 'extension').length;
    const webCount = contentBookmarks.filter((b) => b.source === 'web').length;
    const mostUsedSource =
      extensionCount === 0 && webCount === 0
        ? null
        : extensionCount >= webCount
          ? 'extension'
          : 'web';

    const stats: AnalyticsStats = {
      totalBookmarks: contentBookmarks.length,
      totalFavorites: contentBookmarks.filter((b) => b.isFavorite).length,
      thisWeekSaves,
      mostUsedSource,
    };

    // Daily data for last 30 days
    const today = startOfDay(now);
    const dailyData: DailyData[] = [];

    for (let i = 29; i >= 0; i--) {
      const day = startOfDay(subDays(today, i));
      const count = contentBookmarks.filter((b) =>
        isSameDay(new Date(b.createdAt), day)
      ).length;
      dailyData.push({
        date: format(day, 'MMM d'),
        count,
        fullDate: day,
      });
    }

    return {
      contentTypes,
      timeline,
      topTags,
      stats,
      dailyData,
      hasEnoughData: contentBookmarks.length >= 5,
    };
  }, [bookmarks, timeRange]);
}
