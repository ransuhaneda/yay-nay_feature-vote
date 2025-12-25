import { Feature } from '@/types';
import { Button } from '@/components/ui/button';
import {
    MessageCircleIcon,
    ThumbsDown,
    ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { show } from '@/routes/features';
import { ActionDropdown } from './action-dropdown';



export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mx-4 rounded-lg border border-neutral-300 bg-white p-4 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
            <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                    <button className="p-1 text-neutral-500 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400">
                        <ThumbsUp size={24} />
                    </button>
                    <span className="my-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                        2.3k
                    </span>
                    <button className="p-1 text-neutral-500 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400">
                        <ThumbsDown size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    {/* Metadata */}
                    <div className="mb-1 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                        <span>Posted by</span>
                        <span className="cursor-pointer hover:underline dark:hover:text-neutral-200">
                            u/developer42
                        </span>
                        <span>•</span>
                        <span>{feature.created_at}</span>
                    </div>

                    {/* Title */}
                    <h2 className="mb-2 cursor-pointer text-lg font-semibold text-neutral-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-400">
                        <Link href={show(feature.id).url}>{feature.name}</Link>
                    </h2>

                    {/* Post */}
                    <p className="mb-3 text-sm text-neutral-700 dark:text-neutral-300">
                        {isExpanded
                            ? `${feature.description} \u00A0`
                            : `${feature.description.slice(0, 130)}...\u00A0`}
                        <Button
                            variant="secondary"
                            size="bare"
                            className={
                                isExpanded
                                    ? 'text-blue-700 hover:underline dark:text-blue-400'
                                    : 'text-amber-700 hover:underline dark:text-amber-500'
                            }
                            onClick={toggleReadMore}
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </Button>
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                        <button className="flex items-center gap-1 rounded px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                            <MessageCircleIcon size={16} />
                            <span>423 Comments</span>
                        </button>

                        <ActionDropdown />
                    </div>
                </div>
            </div>
        </div>
    );
}
