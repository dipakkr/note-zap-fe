import { ExternalLink, Trash2, Star, MapPin, Briefcase, Users, Globe, UserCheck } from 'lucide-react';
import type { Bookmark } from '../services/bookmarkService';

interface ProfilesTableProps {
  profiles: Bookmark[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProfilesTable({ profiles, onToggleFavorite, onDelete }: ProfilesTableProps) {
  const getProfileData = (bookmark: Bookmark) => {
    // 1. Try legacy or specific field
    if (bookmark.linkedinProfileData) return bookmark.linkedinProfileData;

    // 2. Try nested profileData within linkedinData
    const li = bookmark.linkedinData || {};
    const base = li.profileData || {};
    const author = li.author || {};

    // Intelligent fallbacks for Location and Headline if they are bundled in 'content'
    let location = base.location || li.location || '';
    let headline = base.headline || author.headline || bookmark.description || '-';

    if (!location && li.content && li.content.includes('|')) {
      const parts = li.content.split('|');
      if (parts.length > 1) {
        location = parts[parts.length - 1].trim();
      }
    }

    // Merge everything, prioritizing the most specific fields
    return {
      name: base.name || author.name || bookmark.title?.replace(' - LinkedIn Profile', '') || 'LinkedIn User',
      headline: headline,
      profilePhoto: base.profilePhoto || author.avatar || bookmark.thumbnail || bookmark.favicon || '',
      profileUrl: base.profileUrl || author.profileUrl || bookmark.url,
      location: location,
      currentCompany: base.currentCompany || li.currentCompany || '',
      connectionsCount: base.connectionsCount || li.connectionsCount || '',
      followersCount: base.followersCount || li.followersCount || '',
      connectionDegree: base.connectionDegree || li.connectionDegree || '',
      website: base.website || li.website || '',
      about: base.about || li.about || li.content || bookmark.description || '',
    };
  };

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl bg-muted/30 border border-dashed border-border transition-colors duration-300">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-card shadow-sm border border-border">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-black text-foreground mb-2">
          No profiles saved yet
        </h3>
        <p className="max-w-sm mb-8 leading-relaxed text-muted-foreground text-sm font-medium">
          Save LinkedIn profiles using the browser extension to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card transition-colors duration-300 shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="text-left text-[10px] font-black uppercase tracking-widest bg-muted/50 text-muted-foreground border-b border-border">
            <th className="px-6 py-4">Profile</th>
            <th className="px-6 py-4 hidden md:table-cell">Headline</th>
            <th className="px-6 py-4 hidden lg:table-cell">Location</th>
            <th className="px-6 py-4 hidden xl:table-cell">Network</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {profiles.map((bookmark) => {
            const profile = getProfileData(bookmark);
            if (!profile) return null;

            return (
              <tr
                key={bookmark.id}
                className="transition-colors hover:bg-muted/30 group/row cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {profile.profilePhoto ? (
                      <img
                        src={profile.profilePhoto}
                        alt={profile.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black bg-primary/10 text-primary shadow-sm">
                        {profile.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={bookmark.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-sm text-foreground hover:text-primary transition-colors truncate max-w-[160px]"
                        >
                          {profile.name}
                        </a>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover/row:opacity-100 transition-opacity" />
                        {profile.connectionDegree && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-primary/10 text-primary uppercase tracking-tighter shadow-sm">
                            {profile.connectionDegree}
                          </span>
                        )}
                      </div>
                      {profile.website && (
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] flex items-center gap-1 mt-1 text-primary hover:underline font-bold"
                        >
                          <Globe className="w-2.5 h-2.5" />
                          <span className="truncate max-w-[120px]">
                            {(() => { try { return new URL(profile.website).hostname; } catch { return profile.website; } })()}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-xs font-medium text-foreground/80 line-clamp-2 leading-relaxed max-w-[220px]">
                    {profile.headline || '-'}
                  </p>
                  {profile.currentCompany && (
                    <p className="text-[10px] mt-1.5 flex items-center gap-1.5 text-muted-foreground font-bold">
                      <Briefcase className="w-3 h-3" />
                      <span className="truncate max-w-[180px]">{profile.currentCompany}</span>
                    </p>
                  )}
                </td>

                <td className="px-6 py-4 hidden lg:table-cell">
                  {profile.location ? (
                    <span className="text-[11px] flex items-center gap-1.5 text-muted-foreground font-bold">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[140px]">{profile.location}</span>
                    </span>
                  ) : (
                    <span className="text-muted/50 text-[11px]">-</span>
                  )}
                </td>

                <td className="px-6 py-4 hidden xl:table-cell">
                  <div className="flex flex-col gap-1.5">
                    {profile.connectionsCount && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground font-bold">
                        <UserCheck className="w-3 h-3" />
                        {profile.connectionsCount}
                      </span>
                    )}
                    {profile.followersCount && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground font-bold">
                        <Users className="w-3 h-3" />
                        {profile.followersCount}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                    <button
                      onClick={() => onToggleFavorite(bookmark.id)}
                      className={`p-2 rounded-lg transition-all active:scale-95 ${bookmark.isFavorite
                        ? 'text-amber-400 bg-amber-400/10'
                        : 'text-muted-foreground hover:text-amber-400 hover:bg-amber-400/10'
                        }`}
                    >
                      <Star className={`w-4 h-4 ${bookmark.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => onDelete(bookmark.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all active:scale-95"
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
