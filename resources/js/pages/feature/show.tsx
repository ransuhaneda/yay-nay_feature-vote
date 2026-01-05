import { ActionDropdown } from '@/components/action-dropdown';
import { TooltipWrapper } from '@/components/tooltip-wrapper';
import AppLayout from '@/layouts/app-layout';
import { destroy, edit, index } from '@/routes/features';
import { BreadcrumbItem, Feature } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { MessageCirclePlus, SquareMenuIcon } from 'lucide-react';
import { VoteButton } from '@/components/vote-button';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CommentForm } from '@/components/comment-form';

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
                    <div className="flex flex-col items-center gap-4 rounded-md bg-neutral-900 p-2 shadow-md">
                        <div className="flex flex-col items-center gap-1">
                            <VoteButton feature={feature} />
                        </div>

                        <div className="h-px w-8 bg-neutral-700/70"></div>

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
                <div className="flex-1 rounded-md border border-neutral-300 bg-white p-4 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
                    <div className="flex items-start gap-3">
                        {/* Content */}
                        <div className="min-w-0 flex-1">
                            {/* Title */}
                            <h2 className="mb-2 cursor-pointer text-lg font-semibold text-neutral-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-400">
                                {feature.name}
                            </h2>
                            {/* Post */}
                            <p className="mb-3 text-sm text-neutral-700 dark:text-neutral-300">
                                {feature.description}
                            </p>
                            {/* Author */}
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
                            {/* Comment Form */}
                            <div className="">
                              <CommentForm feature={feature} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
