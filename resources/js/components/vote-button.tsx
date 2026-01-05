// import UpvoteController from '@/actions/App/Http/Controllers/UpvoteController';
import { destroy as destroyVote, store as storeVote } from '@/routes/upvote';
import { Feature } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export function VoteButton({ feature }: { feature: Feature }) {
    // Update when theres a better way to write the following using inertia and wayfinder
    const upvoteForm = useForm({
        feature_id: feature.id,
        upvote: true,
    });
    const downvoteForm = useForm({
        feature_id: feature.id,
        upvote: false,
    });

    const upvoteDownvote = (upvote: boolean) => {
        if (
            feature.user_has_upvoted && upvote ||
            feature.user_has_downvoted && !upvote
        ) {
            router.delete(destroyVote(feature.id).url, {
                preserveScroll: true,
            });
        } else {
            let form = null;
            if (upvote) {
                form = upvoteForm;
            } else {
                form = downvoteForm;
            }

            form.post(storeVote(feature.id).url, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={() => upvoteDownvote(true)}
                className={
                    feature.user_has_upvoted
                        ? 'p-1 text-orange-500 hover:text-neutral-500 dark:text-orange-400 dark:hover:text-neutral-400'
                        : 'p-1 text-neutral-500 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400'
                }
            >
                <ThumbsUp size={24} />
            </button>
            <span
                className={`my-1 text-sm font-semibold ${
                    feature.user_has_upvoted
                        ? 'text-orange-500 dark:text-orange-400'
                        : feature.user_has_downvoted
                          ? 'text-blue-500 dark:text-blue-400'
                          : 'text-neutral-700 dark:text-neutral-300'
                }`}
            >
                {feature.upvote_count}
            </span>
            <button
                onClick={() => upvoteDownvote(false)}
                className={
                    feature.user_has_downvoted
                        ? 'p-1 text-blue-500 hover:text-neutral-500 dark:text-blue-400 dark:hover:text-neutral-400'
                        : 'p-1 text-neutral-500 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400'
                }
            >
                <ThumbsDown size={24} />
            </button>
        </div>
    );
}
