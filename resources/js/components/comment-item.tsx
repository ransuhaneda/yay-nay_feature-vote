import { Comment } from '@/types';
import { Link } from '@inertiajs/react';
import { MessageCircle, MoreVertical, ThumbsUp } from 'lucide-react';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { destroy as destroyComment } from '@/routes/comment';

export function CommentItem({ comment }: { comment: Comment }) {
    const getInitials = useInitials();
    
    return (
        <div className="flex gap-3 card-surface card-interactive p-4">
            <div className="shrink-0">
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage
                        src={comment.user.avatar}
                        alt={comment.user.name}
                    />
                    <AvatarFallback className="rounded-lg bg-neutral-700 text-white dark:bg-neutral-200 dark:text-black">
                        {getInitials(comment.user.name)}
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                            {comment.user.name}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                            {comment.created_at}
                        </span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="bare">
                                <TooltipWrapper
                                    tooltipText="Manage Comment"
                                    srText="Manage Comment"
                                    icon={MoreVertical}
                                    iconSize={20}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link>
                                    Edit Comment
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={destroyComment(comment.id)}
                                    preserveScroll
                                >
                                    Delete Comment
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mb-3">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        {comment.comment}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-400">
                        <ThumbsUp size={14} />
                        <span>Like</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-400">
                        <MessageCircle size={14} />
                        <span>Reply</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
