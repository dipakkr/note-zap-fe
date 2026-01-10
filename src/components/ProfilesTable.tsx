import { ExternalLink, Trash2, Star, MapPin, Briefcase, Users, Globe, UserCheck } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { Bookmark } from '../services/bookmarkService';

interface ProfilesTableProps {
  profiles: Bookmark[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProfilesTable({ profiles, onToggleFavorite, onDelete }: ProfilesTableProps) {
  const { theme } = useTheme();

  // Extract profile data from either linkedinProfileData or linkedinData.profileData
  const getProfileData = (bookmark: Bookmark) => {
    if (bookmark.linkedinProfileData) {
      return bookmark.linkedinProfileData;
    }
    if (bookmark.linkedinData?.profileData) {
      return bookmark.linkedinData.profileData;
    }
    if (bookmark.linkedinData?.author) {
      // Fallback to author data for older format
      return {
        name: bookmark.linkedinData.author.name,
        headline: bookmark.linkedinData.author.headline,
        profilePhoto: bookmark.linkedinData.author.avatar,
        profileUrl: bookmark.linkedinData.author.profileUrl,
        location: '',
        currentCompany: '',
        connectionsCount: '',
        followersCount: '',
        connectionDegree: '',
        website: '',
        about: '',
      };
    }
    return null;
  };

  if (profiles.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-32 text-center rounded-3xl ${theme === 'dark' ? 'bg-gray-900/30 ring-1 ring-dashed ring-gray-700/30' : 'bg-gray-50/50 border border-dashed border-gray-200'}`}>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white shadow-sm border border-gray-100'}`}>
          <Users className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
        </div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          No profiles saved yet
        </h3>
        <p className={`max-w-sm mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Save LinkedIn profiles using the browser extension to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden border ${theme === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
      <table className="w-full">
        <thead>
          <tr className={`text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
            <th className="px-4 py-3">Profile</th>
            <th className="px-4 py-3 hidden md:table-cell">Headline</th>
            <th className="px-4 py-3 hidden lg:table-cell">Location</th>
            <th className="px-4 py-3 hidden xl:table-cell">Network</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-gray-100'}`}>
          {profiles.map((bookmark) => {
            const profile = getProfileData(bookmark);
            if (!profile) return null;

            return (
              <tr
                key={bookmark.id}
                className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}
              >
                {/* Profile Column */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {profile.profilePhoto ? (
                      <img
                        src={profile.profilePhoto}
                        alt={profile.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
                      />
                    ) : (
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                        {profile.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={bookmark.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-medium text-sm hover:underline truncate max-w-[160px] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                        >
                          {profile.name}
                        </a>
                        <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        {profile.connectionDegree && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                            {profile.connectionDegree}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 md:hidden truncate max-w-[180px] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {profile.headline}
                      </p>
                      {profile.website && (
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs flex items-center gap-1 mt-0.5 hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                        >
                          <Globe className="w-3 h-3" />
                          <span className="truncate max-w-[120px]">
                            {(() => { try { return new URL(profile.website).hostname; } catch { return profile.website; } })()}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </td>

                {/* Headline Column */}
                <td className="px-4 py-3 hidden md:table-cell">
                  <p className={`text-sm truncate max-w-[220px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {profile.headline || '-'}
                  </p>
                  {profile.currentCompany && (
                    <p className={`text-xs mt-0.5 flex items-center gap-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      <Briefcase className="w-3 h-3" />
                      <span className="truncate max-w-[180px]">{profile.currentCompany}</span>
                    </p>
                  )}
                </td>

                {/* Location Column */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  {profile.location ? (
                    <span className={`text-xs flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[140px]">{profile.location}</span>
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>

                {/* Network Column - Connections & Followers */}
                <td className="px-4 py-3 hidden xl:table-cell">
                  <div className="flex flex-col gap-1">
                    {profile.connectionsCount && (
                      <span className={`inline-flex items-center gap-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <UserCheck className="w-3 h-3" />
                        {profile.connectionsCount} connections
                      </span>
                    )}
                    {profile.followersCount && (
                      <span className={`inline-flex items-center gap-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Users className="w-3 h-3" />
                        {profile.followersCount} followers
                      </span>
                    )}
                    {!profile.connectionsCount && !profile.followersCount && (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </div>
                </td>

                {/* Actions Column */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onToggleFavorite(bookmark.id)}
                      className={`p-1.5 rounded-md transition-colors ${bookmark.isFavorite
                        ? 'text-yellow-500 hover:bg-yellow-500/10'
                        : theme === 'dark'
                          ? 'text-gray-500 hover:text-yellow-500 hover:bg-gray-800'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
                        }`}
                      title={bookmark.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`w-4 h-4 ${bookmark.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => onDelete(bookmark.id)}
                      className={`p-1.5 rounded-md transition-colors ${theme === 'dark'
                        ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/20'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                      title="Delete profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
