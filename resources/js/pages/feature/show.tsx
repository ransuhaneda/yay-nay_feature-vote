import { ActionDropdown } from '@/components/action-dropdown';
import { TooltipWrapper } from '@/components/tooltip-wrapper';
import AppLayout from '@/layouts/app-layout';
import { destroy, edit, index } from '@/routes/features';
import { BreadcrumbItem, Feature } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    
    MessageCirclePlus,
    SquareMenuIcon,
    ThumbsDown,
    ThumbsUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
                            <button className="p-1 text-neutral-500 transition-colors duration-200 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400">
                                <ThumbsUp size={24} />
                            </button>

                            <span className="my-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                2.3k
                            </span>

                            <button className="p-1 text-neutral-500 transition-colors duration-200 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400">
                                <ThumbsDown size={24} />
                            </button>
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
                            {/* Actions */}
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
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
