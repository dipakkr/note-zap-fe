
export interface Tool {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    category: "Downloader" | "Generator" | "Utility" | "AI" | "Formatter" | "Analytics";
    iconName: string;
    seoTitle: string;
    seoDescription: string;
    faqs: { question: string; answer: string }[];
}

export const toolsData: Tool[] = [
    {
        id: "all-in-one-social-media-downloader",
        slug: "social-media-photo-video-downloader",
        title: "All-in-One Social Media Downloader",
        shortDescription: "Download videos and photos from Instagram, YouTube, TikTok, Twitter, and 40+ other platforms.",
        category: "Downloader",
        iconName: "Download",
        seoTitle: "Free Social Media Downloader - Video, Photo, Story Saver",
        seoDescription: "The best free tool to download videos, photos, stories, and reels from Instagram, TikTok, YouTube, Twitter, Facebook, and more. No watermark, high quality.",
        faqs: []
    },
    {
        id: "youtube-downloader",
        slug: "youtube-video-downloader",
        title: "YouTube Video Downloader",
        shortDescription: "Download high-quality YouTube videos in MP4 and MP3 formats.",
        category: "Downloader",
        iconName: "Youtube",
        seoTitle: "Free YouTube Video Downloader - Save YouTube Videos in HD",
        seoDescription: "Download YouTube videos in 1080p, 4K, MP4, and MP3 formats for free. Fast, secure, and no registration required.",
        faqs: [
            {
                question: "Is this YouTube Downloader free?",
                answer: "Yes, our YouTube Video Downloader is 100% free to use with no hidden fees."
            },
            {
                question: "Can I download 4K videos?",
                answer: "Absolutely. We support all available resolutions including 720p, 1080p, 2K, and 4K."
            }
        ]
    },
    {
        id: "youtube-shorts",
        slug: "youtube-shorts-downloader",
        title: "YouTube Shorts Downloader",
        shortDescription: "Download YouTube Shorts instantly in HD quality.",
        category: "Downloader",
        iconName: "Youtube",
        seoTitle: "Free YouTube Shorts Downloader | Save Shorts Videos Instantly",
        seoDescription: "Download YouTube Shorts videos in high quality. The best free tool to save Shorts to your device.",
        faqs: [
            {
                question: "How do I download YouTube Shorts?",
                answer: "Simply paste the link to the YouTube Short into the input box above and click Download."
            }
        ]
    },
    {
        id: "youtube-tags",
        slug: "youtube-tags-generator",
        title: "YouTube Tags Generator",
        shortDescription: "Generate high-ranking tags for your videos.",
        category: "Generator",
        iconName: "Hash",
        seoTitle: "Best YouTube Tags Generator 2026 - SEO Optimized",
        seoDescription: "Boost your video rankings with our free YouTube Tags Generator. Find high-volume keywords instantly.",
        faqs: [
            {
                question: "How do tags help my video?",
                answer: "Tags help YouTube understand your video's content, making it easier to surface in search results and recommendations."
            }
        ]
    },
    {
        id: "hashtag-generator",
        slug: "hashtag-generator",
        title: "Hashtag Generator",
        shortDescription: "Find viral hashtags for Instagram, TikTok, and Twitter.",
        category: "Generator",
        iconName: "Hash",
        seoTitle: "Free Hashtag Generator for Instagram & TikTok",
        seoDescription: "Generate trending hashtags for your social media posts to increase reach and engagement.",
        faqs: []
    },
    {
        id: "utm-generator",
        slug: "utm-generator",
        title: "UTM Generator",
        shortDescription: "Build trackable URLs for your marketing campaigns.",
        category: "Utility",
        iconName: "Link",
        seoTitle: "Google Analytics Campaign URL Builder (UTM Generator)",
        seoDescription: "Easily add campaign parameters to URLs so you can track Custom Campaigns in Google Analytics.",
        faqs: []
    },
    {
        id: "twitter-resizer",
        slug: "twitter-photo-resizer",
        title: "Twitter Photo Resizer",
        shortDescription: "Resize images perfectly for Twitter headers and posts.",
        category: "Formatter",
        iconName: "Twitter",
        seoTitle: "Free Twitter Image Resizer & Cropper",
        seoDescription: "Resize your images to fit Twitter's recommended dimensions for profiles, headers, and posts.",
        faqs: []
    },
    {
        id: "linkedin-resizer",
        slug: "linkedin-photo-resizer",
        title: "LinkedIn Photo Resizer",
        shortDescription: "Optimize images for LinkedIn profiles and banners.",
        category: "Formatter",
        iconName: "Linkedin",
        seoTitle: "LinkedIn Photo Resizer - Profile & Cover Photo",
        seoDescription: "Make your LinkedIn profile look professional with perfectly sized images for every section.",
        faqs: []
    },
    {
        id: "instagram-downloader",
        slug: "instagram-reel-downloader",
        title: "Instagram Reel Downloader",
        shortDescription: "Save Instagram Reels in high definition.",
        category: "Downloader",
        iconName: "Instagram",
        seoTitle: "Instagram Reels Downloader - Save Reels Video Online",
        seoDescription: "Download Instagram Reels videos in MP4 format. Free, fast, and high quality.",
        faqs: []
    },
    {
        id: "tiktok-downloader",
        slug: "tiktok-video-downloader",
        title: "TikTok Video Downloader",
        shortDescription: "Download TikToks without the watermark.",
        category: "Downloader",
        iconName: "Video",
        seoTitle: "TikTok Downloader Without Watermark",
        seoDescription: "Save TikTok videos without the watermark in HD quality. Supports MP4 video download.",
        faqs: []
    },
    {
        id: "ai-hook",
        slug: "ai-post-hook-generator",
        title: "AI Post Hook Generator",
        shortDescription: "Generate scroll-stopping hooks for your posts.",
        category: "AI",
        iconName: "Sparkles",
        seoTitle: "Free AI Hook Generator for Content Creators",
        seoDescription: "Use AI to generate catchy hooks and headlines for your social media posts and blogs.",
        faqs: []
    },
    {
        id: "twitter-thread",
        slug: "twitter-thread-maker",
        title: "Twitter Thread Maker",
        shortDescription: "Write and preview Twitter threads easily.",
        category: "Utility",
        iconName: "FileText",
        seoTitle: "Free Twitter Thread Maker & Preview Tool",
        seoDescription: "Compose perfect Twitter threads with character counting and live preview.",
        faqs: []
    },
    {
        id: "linkedin-formatter",
        slug: "linkedin-text-formatter",
        title: "LinkedIn Text Formatter",
        shortDescription: "Add bold and italic text to LinkedIn posts.",
        category: "Formatter",
        iconName: "Type",
        seoTitle: "LinkedIn Text Formatter - Bold, Italic & Unicode",
        seoDescription: "Format your LinkedIn posts with bold, italic, and stylish fonts to stand out in the feed.",
        faqs: []
    }
];
