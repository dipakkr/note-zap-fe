interface LogoProps {
    className?: string;
    showText?: boolean;
}

export default function Logo({ className = "h-8", showText = true }: LogoProps) {
    if (showText) {
        return <img src="/logo.svg" alt="PostZaper" className={className} />;
    }
    return <img src="/icon.svg" alt="PostZaper" className={className} />;
}
