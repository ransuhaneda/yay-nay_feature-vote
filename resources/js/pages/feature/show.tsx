import { ActionDropdown } from '@/components/action-dropdown';
import { CommentForm } from '@/components/comment-form';
import { CommentItem } from '@/components/comment-item';
import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VoteButton } from '@/components/vote-button';
import AppLayout from '@/layouts/app-layout';
import { destroy, edit, index } from '@/routes/features';
import { BreadcrumbItem, Feature } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { MessageCirclePlus, SquareMenuIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feature',
        href: index().url,
    },
];

export default function Show({ feature }: { feature: Feature }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Features' + feature.name} />
            <div className="m-4 flex flex-row gap-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-4 card-surface card-interactive p-2">
                        <div className="flex flex-col items-center gap-1">
                            <VoteButton feature={feature} />
                        </div>

                        <div className="divider"></div>

                        <TooltipWrapper
                            tooltipText="Jump to Comments"
                            href="#comments"
                            srText="Jump to Comments"
                            icon={MessageCirclePlus}
                            iconSize={20}
                        />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="bare">
                                    <TooltipWrapper
                                        tooltipText="Manage Post"
                                        srText="Manage Post"
                                        icon={SquareMenuIcon}
                                        iconSize={20}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Link href={edit(feature.id)}>
                                        Edit Request
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={destroy(feature.id)}>
                                        Delete Request
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <ActionDropdown />
                    </div>
                </div>
                <div className="flex-1 card-surface card-interactive p-4">
                    <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                            <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
                                {feature.name}
                            </h2>

                            <p className="mb-3 text-sm text-neutral-700 dark:text-neutral-300">
                                {feature.description}
                            </p>

                            <div className="flex flex-row justify-between">
                                <div className="mb-1 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                                    <span>Posted by</span>
                                    <span className="cursor-pointer hover:underline dark:hover:text-neutral-200">
                                        {feature.user.name}
                                    </span>
                                    <span>•</span>
                                    <span>{feature.created_at}</span>
                                </div>
                            </div>
                            <div className="mt-[36px] flex flex-col gap-3">
                                <CommentForm feature={feature} />
                                {feature.comments.map((comment) => (
                                    <CommentItem
                                        comment={comment}
                                        key={comment.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
