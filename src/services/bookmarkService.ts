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
  type: 'link' | 'tweet' | 'linkedin' | 'linkedin-profile' | 'article' | 'thread';
  source: 'web' | 'extension';
  createdAt: string;
  updatedAt: string;
  tweetData?: any;
  linkedinData?: any;
  linkedinProfileData?: LinkedInProfileData;
  articleData?: any;
  threadData?: any;
  notes?: string;
}

export interface AuthResponse {
  user: BookmarkUser;
  workspaceId: string;
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
    }
  ) => {
    const params = new URLSearchParams();
    if (options?.type) params.append('type', options.type);
    if (options?.folder) params.append('folder', options.folder);
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());

    const query = params.toString();
    const response = await apiClient.get<BookmarksResponse>(
      `/api/bookmarks/workspace/${workspaceId}${query ? `?${query}` : ''}`
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
};

/**
 * Clusters
 */
export const clusterService = {
  getClusters: async (workspaceId: string) => {
    const response = await apiClient.get<Cluster[]>(`/api/clusters/workspace/${workspaceId}`);
    return response.map(c => ({ ...c, id: c._id || c.id }));
  },

  createCluster: async (data: { workspaceId: string; name: string; color?: string }) => {
    const response = await apiClient.post<Cluster>('/api/clusters', data);
    return { ...response, id: response._id || response.id };
  },

  deleteCluster: (id: string) =>
    apiClient.delete(`/api/clusters/${id}`),
};
