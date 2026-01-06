import { store as storeComment } from '@/routes/comment';
import { Feature } from '@/types';
import { useForm } from '@inertiajs/react';
import { Image, MapPin, Paperclip, Smile } from 'lucide-react';
import { FormEventHandler } from 'react';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';
import { InputTextarea } from './ui/input-textarea';
import { Label } from './ui/label';

export function CommentForm({ feature }: { feature: Feature }) {
    const { data, setData, post, processing } = useForm({
        comment: '',
        feature_id: feature.id,
    });

    const createComment: FormEventHandler = (ev) => {
        ev.preventDefault();

        post(storeComment(feature.id).url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setData('comment', ''),
        });
    };

    return (
        <form onSubmit={createComment}>
            <div className="mb-4 w-full rounded-lg border border-neutral-300 bg-white shadow-xs transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
                {/* Textarea Section */}
                <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-neutral-800">
                    <Label htmlFor="comment" className="sr-only">
                        Your comment
                    </Label>

                    <InputTextarea
                        id="comment"
                        name="comment"
                        rows={6}
                        placeholder='Write a comment...'
                        value={data.comment}
                        onChange={e => setData('comment', e.target.value)}
                        className="mt-1 block w-full bg-white text-sm text-neutral-700 placeholder:text-neutral-500 focus:ring-0 focus:outline-none dark:bg-neutral-800 dark:text-neutral-300 dark:placeholder:text-neutral-400"
                        required
                    />
                </div>

                <div className="flex items-center gap-2 border-t border-neutral-300 px-3 py-2 dark:border-neutral-700">
                    <Button type="submit" disabled={processing}>Comment</Button>

                    <div className="flex space-x-1 gap-1 rtl:space-x-reverse">
                        <TooltipWrapper
                            tooltipText="Add emoji"
                            srText="Add emoji"
                            icon={Smile}
                            iconSize={16}
                        />
                        <TooltipWrapper
                            tooltipText="Attach file"
                            srText="Attach file"
                            icon={Paperclip}
                            iconSize={16}
                        />
                        <TooltipWrapper
                            tooltipText="Embed map"
                            srText="Embed map"
                            icon={MapPin}
                            iconSize={16}
                        />
                        <TooltipWrapper
                            tooltipText="Upload image"
                            srText="Upload image"
                            icon={Image}
                            iconSize={16}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
