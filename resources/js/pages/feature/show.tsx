import { ActionDropdown } from '@/components/action-dropdown';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/features';
import { BreadcrumbItem, Feature } from '@/types';
import { Head } from '@inertiajs/react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

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

            <div className="mx-4 border border-neutral-300 bg-white p-4 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
                <div className="flex items-start gap-3">
                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        {/* Metadata */}

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

                            <div className="flex flex-row items-center gap-2">
                                <div className="flex flex-row items-center rounded-full bg-neutral-900 p-2">
                                    <button className="p-1 text-neutral-500 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400">
                                        <ThumbsUp size={20} />
                                    </button>
                                    <span className="my-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                        2.3k
                                    </span>
                                    <button className="p-1 text-neutral-500 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400">
                                        <ThumbsDown size={20} />
                                    </button>
                                </div>
                                <ActionDropdown />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
