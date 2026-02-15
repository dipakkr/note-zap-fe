/**
 * Bookmark Service
 * Handles all bookmark-related API calls
 */

import { apiClient } from './apiClient';

export interface BookmarkUser {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  picture?: string;
  subscription: 'free' | 'pro';
  bookmarkWorkspaceId: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LinkedInProfileData {
  name: string;
  headline: string;
  location?: string;
  currentCompany?: string;
  currentPosition?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  about?: string;
  profileUrl: string;
  connectionDegree?: string;
  connectionsCount?: string;
  followersCount?: string;
  website?: string;
}

export interface Cluster {
  id: string;
  _id?: string;
  userId: string;
  workspaceId: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface ToneAuthor {
  name: string;
  username: string;
  avatar: string | null;
  headline: string | null;
  postCount: number;
  platforms: string[];
  authorKey: string;
}

export interface Bookmark {
  id: string;
  _id?: string; // MongoDB ID
  url: string;
  title: string;
  description?: string;
  favicon?: string;
  thumbnail?: string;
  folder: string;
  tags: string[];
  isFavorite: boolean;
  isRead: boolean;
  isProfile?: boolean;
  type: 'link' | 'tweet' | 'linkedin' | 'linkedin-profile' | 'article' | 'thread' | 'twitter';
  source: 'web' | 'extension';
  createdAt: string;
  updatedAt: string;
  tweetData?: any;
  linkedinData?: any;
  linkedinProfileData?: LinkedInProfileData;
  twitterProfileData?: any;
  articleData?: any;
  threadData?: any;
  notes?: string;
}

export interface AuthResponse {
  user: BookmarkUser;
  workspaceId: string;
  accessToken?: string;
  refreshToken?: string;
  message: string;
}

export interface BookmarksResponse {
  bookmarks: Bookmark[];
  total: number;
  hasMore: boolean;
}

/**
 * Helper to ensure bookmark has id
 */
const mapBookmark = (b: any): Bookmark => ({
  ...b,
  id: b.id || b._id // Handle MongoDB _id
});

/**
 * Authentication
 */
export const authService = {
  register: (data: {
    firebaseUid: string;
    email: string;
    name: string;
    picture?: string;
  }) => apiClient.post<AuthResponse>('/api/bookmark-auth/register', data),

  login: (firebaseUid: string) =>
    apiClient.post<AuthResponse>('/api/bookmark-auth/login', { firebaseUid }),

  getMe: () => apiClient.get<AuthResponse>('/api/bookmark-auth/me'),

  redeemLicense: (firebaseUid: string, licenseToken: string) =>
    apiClient.post('/api/bookmark-auth/redeem-license', {
      firebaseUid,
      licenseToken,
    }),
};

/**
 * Bookmarks
 */
export const bookmarkService = {
  getBookmarks: async (
    workspaceId: string,
    options?: {
      type?: string;
      folder?: string;
      limit?: number;
      offset?: number;
      signal?: AbortSignal;
    }
  ) => {
    const params = new URLSearchParams();
    if (options?.type) params.append('type', options.type);
    if (options?.folder) params.append('folder', options.folder);
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());

    const query = params.toString();
    const response = await apiClient.get<BookmarksResponse>(
      `/api/bookmarks/workspace/${workspaceId}${query ? `?${query}` : ''}`,
      { signal: options?.signal }
    );

    return {
      ...response,
      bookmarks: response.bookmarks.map(mapBookmark)
    };
  },

  createBookmark: async (data: {
    workspaceId: string;
    url: string;
    title: string;
    description?: string;
    folder?: string;
    tags?: string[];
    type?: string;
  }) => {
    const response = await apiClient.post<{ bookmark: Bookmark }>('/api/bookmarks', {
      ...data,
      appId: 'postzaper-app'
    }, {
      headers: {
        'X-App-Id': 'bookmarky'
      }
    });
    return { bookmark: mapBookmark(response.bookmark) };
  },

  updateBookmark: async (id: string, data: Partial<Bookmark>) => {
    const response = await apiClient.put<{ bookmark: Bookmark }>(`/api/bookmarks/${id}`, data);
    return { bookmark: mapBookmark(response.bookmark) };
  },

  deleteBookmark: (id: string) =>
    apiClient.delete(`/api/bookmarks/${id}`),

  toggleFavorite: (id: string) =>
    apiClient.patch(`/api/bookmarks/${id}/favorite`, {}),

  getAuthors: async (workspaceId: string, signal?: AbortSignal) => {
    const response = await apiClient.get<{ authors: ToneAuthor[] }>(
      `/api/bookmarks/workspace/${workspaceId}/authors`,
      { signal }
    );
    return response;
  },
};

/**
 * Clusters
 */
export const clusterService = {
  getClusters: async (workspaceId: string, signal?: AbortSignal) => {
    const response = await apiClient.get<Cluster[]>(`/api/clusters/workspace/${workspaceId}`, { signal });
    return response.map(c => ({ ...c, id: c._id || c.id }));
  },

  createCluster: async (data: { workspaceId: string; name: string; color?: string }) => {
    const response = await apiClient.post<Cluster>('/api/clusters', data);
    return { ...response, id: response._id || response.id };
  },

  updateCluster: async (id: string, data: { name?: string; color?: string }) => {
    const response = await apiClient.put<Cluster>(`/api/clusters/${id}`, data);
    return { ...response, id: response._id || response.id };
  },

  deleteCluster: (id: string) =>
    apiClient.delete(`/api/clusters/${id}`),
};

/**
 * Content Studio
 */
export interface GeneratedPost {
  id: string;
  _id?: string;
  userId: string;
  workspaceId: string;
  content: string;
  platform: 'twitter' | 'linkedin';
  contentType: 'post' | 'hook';
  source: {
    type: 'cluster' | 'bookmarks';
    clusterId?: string;
    clusterName?: string;
    bookmarkIds: string[];
    toneAuthorKey?: string;
    toneAuthorName?: string;
    sourceBookmarkTitle?: string;
  };
  generation: {
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    responseTimeMs: number;
    regenerationCount: number;
  };
  status: 'generated' | 'edited' | 'saved' | 'used';
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string | null;
}

export interface GenerateContentRequest {
  workspaceId: string;
  clusterId?: string;
  bookmarkIds?: string[];
  platform: 'twitter' | 'linkedin';
  contentType: 'post' | 'hook';
  hookText?: string;
  toneAuthorKey?: string;
  model?: string;
}

export interface GenerateContentResponse {
  posts: GeneratedPost[];
  hooks?: string[];
  usage?: {
    dailyUsed: number;
    dailyLimit: number;
    subscription: string;
    remainingGenerations: number;
  };
}

export interface GeneratedPostsResponse {
  posts: GeneratedPost[];
  total: number;
  hasMore: boolean;
}

const mapPost = (p: any): GeneratedPost => ({
  ...p,
  id: p.id || p._id,
});

export const contentStudioService = {
  generate: async (data: GenerateContentRequest) => {
    const response = await apiClient.post<GenerateContentResponse>(
      '/api/content-studio/generate',
      data
    );
    return {
      ...response,
      posts: response.posts.map(mapPost),
    };
  },

  getPosts: async (
    workspaceId: string,
    options?: { platform?: string; contentType?: string; bookmarkId?: string; limit?: number; offset?: number; signal?: AbortSignal }
  ) => {
    const params = new URLSearchParams();
    if (options?.platform) params.append('platform', options.platform);
    if (options?.contentType) params.append('contentType', options.contentType);
    if (options?.bookmarkId) params.append('bookmarkId', options.bookmarkId);
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());

    const query = params.toString();
    const response = await apiClient.get<GeneratedPostsResponse>(
      `/api/content-studio/posts/${workspaceId}${query ? `?${query}` : ''}`,
      { signal: options?.signal }
    );
    return {
      ...response,
      posts: response.posts.map(mapPost),
    };
  },

  updatePost: async (id: string, data: { content?: string; status?: string }) => {
    const response = await apiClient.put<{ post: GeneratedPost }>(
      `/api/content-studio/${id}`,
      data
    );
    return { post: mapPost(response.post) };
  },

  deletePost: (id: string) =>
    apiClient.delete(`/api/content-studio/${id}`),

  regeneratePost: async (id: string) => {
    const response = await apiClient.post<{ post: GeneratedPost; usage?: any }>(
      `/api/content-studio/${id}/regenerate`,
      {}
    );
    return { post: mapPost(response.post), usage: response.usage };
  },

  schedulePost: async (id: string, scheduledDate: string) => {
    const response = await apiClient.patch<{ post: GeneratedPost }>(
      `/api/content-studio/${id}/schedule`,
      { scheduledDate }
    );
    return { post: mapPost(response.post) };
  },

  unschedulePost: async (id: string) => {
    const response = await apiClient.patch<{ post: GeneratedPost }>(
      `/api/content-studio/${id}/unschedule`,
      {}
    );
    return { post: mapPost(response.post) };
  },

  getCalendarPosts: async (workspaceId: string, start: string, end: string) => {
    const params = new URLSearchParams({ start, end });
    const response = await apiClient.get<{ posts: GeneratedPost[] }>(
      `/api/content-studio/calendar/${workspaceId}?${params.toString()}`
    );
    return { posts: response.posts.map(mapPost) };
  },
};
