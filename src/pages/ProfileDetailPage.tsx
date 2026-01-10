import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Users, Link as LinkIcon, ExternalLink, MessageSquare } from 'lucide-react';

export default function ProfileDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // This is a placeholder. In a real app, you'd fetch data based on the ID.
    return (
        <div className="min-h-screen bg-background text-foreground p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to library</span>
                </button>

                <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-xl shadow-primary/5">
                    {/* Cover Placeholder */}
                    <div className="h-48 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 relative">
                        <div className="absolute inset-0 backdrop-blur-3xl opacity-50" />
                    </div>

                    <div className="px-8 pb-8 relative">
                        {/* Profile Header */}
                        <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 mb-8">
                            <div className="w-32 h-32 rounded-3xl bg-card border-4 border-card shadow-2xl overflow-hidden ring-1 ring-border">
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <span className="text-4xl">👤</span>
                                </div>
                            </div>
                            <div className="flex-1 pb-2">
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-3xl font-black tracking-tight">Profile Details</h1>
                                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">LinkedIn</span>
                                </div>
                                <p className="text-muted-foreground font-medium">Capture ID: {id}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-5 py-2.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                                    Generate Hook
                                </button>
                                <button className="p-2.5 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">About</h3>
                                    <div className="p-6 bg-muted/30 rounded-2xl border border-border">
                                        <p className="text-sm leading-relaxed font-medium">
                                            This is a detailed view for the professional profile. Soon, all captured data like professional history, endorsements, and AI-generated insights will be displayed here.
                                        </p>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Insights</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-5 border border-border rounded-2xl hover:border-primary/20 transition-colors bg-card shadow-sm">
                                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                                                <MessageSquare className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <h4 className="font-bold text-sm mb-1">AI Recommendation</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">This profile specializes in growth marketing. Perfect for your next SaaS hooks cluster.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-6">
                                <div className="p-6 bg-muted/20 rounded-2xl border border-border space-y-4">
                                    <div className="flex items-center gap-3 text-sm font-bold">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span>Location Data</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold">
                                        <Briefcase className="w-4 h-4 text-primary" />
                                        <span>Current Role</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold">
                                        <Users className="w-4 h-4 text-primary" />
                                        <span>Network Stats</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold">
                                        <LinkIcon className="w-4 h-4 text-primary" />
                                        <span className="text-primary hover:underline cursor-pointer">Original Profile</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
