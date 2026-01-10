import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

// Custom SVG paths for platform specific content types
// Icon structure: 
// - path: main icon path (if single icon)
// - basePath: main platform logo path (if badged)
// - badgePath: small overlay icon path (if badged)
const ICONS = [
    {
        id: "LinkedIn Post",
        bg: "bg-[#0077b5]",
        basePath: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
        badgePath: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
        scale: 0.6,
        angle: 0,
        distance: 220
    },
    {
        id: "LinkedIn Profile",
        bg: "bg-[#0077b5]",
        basePath: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
        badgePath: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 0 0 0-8 4 4 0 0 0 0 8",
        badgeStroke: true,
        scale: 0.6,
        angle: 51,
        distance: 145
    },
    {
        id: "Twitter Content",
        bg: "bg-black",
        basePath: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
        badgePath: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
        scale: 0.55,
        angle: 103,
        distance: 220
    },
    {
        id: "Twitter Header",
        bg: "bg-black",
        basePath: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
        badgePath: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
        badgeStroke: true,
        scale: 0.6,
        angle: 154,
        distance: 145
    },
    {
        id: "Facebook",
        bg: "bg-[#1877f2]",
        path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
        scale: 0.6,
        angle: 206,
        distance: 220
    },
    {
        id: "Web Content",
        bg: "bg-orange-500",
        basePath: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
        baseStroke: true,
        badgePath: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
        scale: 0.6,
        angle: 257,
        distance: 145,
    },
    {
        id: "Web Page",
        bg: "bg-green-500",
        basePath: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
        baseStroke: true,
        badgePath: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
        badgeStroke: true,
        scale: 0.6,
        angle: 308,
        distance: 220
    }
];

const OrbitingNucleus = () => {
    return (
        <div className="relative flex items-center justify-center w-full h-[600px] overflow-visible my-12">

            {/* Center Nucleus */}
            <div className="absolute z-20 flex items-center justify-center w-24 h-24 rounded-3xl bg-black shadow-xl shadow-purple-500/20 animate-pulse">
                <Zap className="w-12 h-12 text-white" fill="white" />
            </div>

            {/* Nucleus Glow & Background */}
            <div className="absolute z-10 w-32 h-32 rounded-3xl bg-purple-500/20 blur-xl" />

            {/* SVG Canvas for Rings and Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <defs>
                    <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Inner Ring */}
                <circle
                    cx="50%" cy="50%" r="145"
                    fill="none" stroke="currentColor" strokeOpacity="0.1"
                    strokeWidth="1" strokeDasharray="6 6"
                    className="text-foreground"
                />

                {/* Outer Ring */}
                <circle
                    cx="50%" cy="50%" r="220"
                    fill="none" stroke="currentColor" strokeOpacity="0.05"
                    strokeWidth="1" strokeDasharray="8 8"
                    className="text-foreground"
                />
            </svg>

            {/* Icons & CSS Beams */}
            {ICONS.map((icon, index) => {
                const x = Math.cos((icon.angle * Math.PI) / 180) * icon.distance;
                const y = Math.sin((icon.angle * Math.PI) / 180) * icon.distance;

                return (
                    <div
                        key={icon.id}
                        className="absolute z-20 flex items-center justify-center"
                        style={{
                            transform: `translate(${x}px, ${y}px)`,
                            transition: 'all 0.5s ease-out'
                        }}
                    >
                        {/* Connection Line (Dotted Beam) - Rotated to point to center */}
                        <div
                            className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-l from-transparent via-purple-300/30 to-transparent -z-10 origin-left"
                            style={{
                                width: `${icon.distance}px`,
                                transform: `rotate(${icon.angle + 180}deg)`,
                                left: '50%',
                                top: '50%'
                            }}
                        >
                            {/* Traveling dot animation - Synchronized blinking */}
                            <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-beam-flow"
                                style={{ animationDuration: '3s' }} // Fixed duration, no delay
                            />
                        </div>

                        {/* Icon Itself */}
                        <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${icon.bg} text-white shadow-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer group`}>
                            {/* Render Main Icon (or Base) */}
                            <svg
                                viewBox="0 0 24 24"
                                className="w-full h-full p-2.5"
                                fill={icon.baseStroke ? "none" : "currentColor"}
                                stroke={icon.baseStroke ? "currentColor" : "none"}
                                strokeWidth={icon.baseStroke ? 2 : 0}
                            >
                                <path d={icon.basePath || icon.path} />
                            </svg>

                            {/* Render Badge Overlay if present */}
                            {icon.badgePath && (
                                <div className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black shadow-md border border-gray-100">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-3.5 w-3.5"
                                        fill={icon.badgeStroke ? "none" : "currentColor"}
                                        stroke={icon.badgeStroke ? "currentColor" : "none"}
                                        strokeWidth={icon.badgeStroke ? 2.5 : 0}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d={icon.badgePath} />
                                    </svg>
                                </div>
                            )}

                            {/* Hover Tooltip/Label */}
                            <div className="absolute mt-16 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-30">
                                {icon.id}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrbitingNucleus;
