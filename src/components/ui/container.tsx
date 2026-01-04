import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Container({ children, className, fullWidth = false }: ContainerProps) {
  const isMobile = useIsMobile();
  
  return (
    <div
      className={cn(
        "w-full",
        isMobile ? "px-2 py-4" : "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8",
        fullWidth ? "px-0 sm:px-0 lg:px-0 max-w-none" : "",
        className
      )}
    >
      {children}
    </div>
  );
} 