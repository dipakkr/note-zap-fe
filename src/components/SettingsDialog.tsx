import { Dialog, DialogContent } from './ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { Moon, Sun, LogOut, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenUpgrade?: () => void;
}

export default function SettingsDialog({ isOpen, onClose, onOpenUpgrade }: SettingsDialogProps) {
    const { user, signOut } = useAuth();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Initialize theme state from document or local storage
        if (document.documentElement.classList.contains('dark')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [isOpen]);

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 gap-0 bg-card border-border shadow-2xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-muted/30 p-6 border-b border-border">
                    <h2 className="text-xl font-black text-foreground tracking-tight">Settings</h2>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Manage your account preferences.</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Account Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border border-border bg-muted overflow-hidden shrink-0">
                            {user.picture ? (
                                <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-muted-foreground bg-muted text-xl">
                                    {user.name?.charAt(0) || 'U'}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-foreground">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${user.subscription === 'pro' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                    {user.subscription === 'pro' ? 'Pro Plan' : 'Free Plan'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border/50" />

                    {/* Appearance */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Appearance</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleThemeChange('light')}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${theme === 'light'
                                    ? 'bg-primary/5 border-primary text-primary'
                                    : 'bg-card border-border text-muted-foreground hover:bg-muted/50'
                                    }`}
                            >
                                <Sun className="w-4 h-4" />
                                <span className="text-xs font-bold">Light Mode</span>
                            </button>
                            <button
                                onClick={() => handleThemeChange('dark')}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${theme === 'dark'
                                    ? 'bg-primary/5 border-primary text-primary'
                                    : 'bg-card border-border text-muted-foreground hover:bg-muted/50'
                                    }`}
                            >
                                <Moon className="w-4 h-4" />
                                <span className="text-xs font-bold">Dark Mode</span>
                            </button>
                        </div>
                    </div>

                    {/* Subscription Actions */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subscription</label>
                        {user.subscription !== 'pro' ? (
                            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-foreground mb-1">Upgrade to Pro</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Unlock unlimited bookmarks, AI features, and more.
                                        </p>
                                    </div>
                                    {onOpenUpgrade && (
                                        <button
                                            onClick={() => {
                                                onClose();
                                                onOpenUpgrade();
                                            }}
                                            className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                                        >
                                            Upgrade
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 rounded-xl bg-muted/30 border border-border">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-foreground mb-1">Pro Active</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Thanks for supporting PostZaper!
                                        </p>
                                    </div>
                                    <div className="px-2 py-1 bg-green-500/10 text-green-600 rounded text-[10px] font-bold flex items-center gap-1">
                                        <Shield className="w-3 h-3" />
                                        Active
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-muted/30 border-t border-border flex justify-end">
                    <button
                        onClick={() => {
                            signOut();
                            onClose();
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
