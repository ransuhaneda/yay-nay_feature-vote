import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface TooltipWrapperProps {
    tooltipText: string;
    href?: string;
    srText: string;
    icon: LucideIcon;
    iconSize?: number;
    className?: string;
    children?: React.ReactNode;
}

export function TooltipWrapper({
    tooltipText,
    href,
    srText,
    icon: Icon,
    className = '',
    iconSize,
    children,
}: TooltipWrapperProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1 rounded-full p-1 transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-neutral-800 ${className}`}
                    >
                        <span className="sr-only">{srText}</span>
                        <Icon size={iconSize} />
                        {children}
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
