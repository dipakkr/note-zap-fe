
import { Link } from "react-router-dom";
import { Sparkles, Youtube, Hash, FileText, Download, Link as LinkIcon, Image as ImageIcon, Twitter, Linkedin, Instagram, Video, Type } from "lucide-react";

// Map icon strings to components - shared logic
const IconMap: Record<string, any> = {
    Youtube,
    Hash,
    FileText,
    Download,
    Link: LinkIcon,
    ImageIcon,
    Twitter,
    Linkedin,
    Instagram,
    Sparkles,
    Video,
    Type
};

interface ToolCardProps {
    tool: any; // Using any for simplicity with the import structure, strictly could be Tool interface
}

const ToolCard = ({ tool }: ToolCardProps) => {
    const IconComponent = IconMap[tool.iconName] || Sparkles;

    // Construct the "breadcrumb" style footer text
    // e.g., "Post Formatting -> Instagram"
    // For now, we'll try to derive it from the title or just use Category -> Title
    const footerText = `${tool.category} → ${tool.title.replace(' Downloader', '').replace(' Generator', '').replace(' Resizer', '')}`;

    return (
        <Link
            to={`/tools/${tool.slug}`}
            className="group relative flex flex-col rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 h-full"
        >
            <div className="flex items-start gap-4 mb-3">
                <div className="rounded-lg bg-primary/5 p-3 shrink-0 group-hover:bg-primary/10 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {tool.title}
                    </h3>
                </div>
            </div>

            <p className="mt-1 text-sm text-muted-foreground line-clamp-2 flex-grow mb-6 leading-relaxed">
                {tool.shortDescription}
            </p>

            <div className="mt-auto border-t pt-4">
                <span className="text-xs font-semibold text-primary/80 group-hover:text-primary flex items-center gap-1 transition-colors">
                    {footerText}
                </span>
            </div>
        </Link>
    );
};

export default ToolCard;
