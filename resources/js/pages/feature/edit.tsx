import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/features';
import { BreadcrumbItem, Feature } from '@/types';
import { Form } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputTextarea } from '@/components/ui/input-textarea';
import { Label } from '@/components/ui/label';
import { update } from '@/routes/features';
import Heading from '@/components/heading';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feature Update Form',
        href: index().url,
    },
];

export default function Edit({ feature }: { feature: Feature }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-4 rounded-md border border-neutral-300 bg-white p-4 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
                <Heading title={'Update Feature Request: ' + feature.name} />

                <Form
                    action={update(feature.id)}
                    method="patch"
                    className="space-y-6"
                >
                    {({ errors, processing, defaults }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Feature Name</Label>

                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={feature.name}
                                    onChange={() => {
                                        defaults();
                                    }}
                                    required
                                    autoComplete="name"
                                    className="mt-1 block w-full border-neutral-300"
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">
                                    Feature Description
                                </Label>

                                <InputTextarea
                                    id="description"
                                    name="description"
                                    defaultValue={feature.description}
                                    rows={6}
                                    className="mt-1 block w-full border-neutral-300"
                                />

                                <InputError message={errors.description} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>
                                    {processing
                                        ? 'Updating...'
                                        : 'Submit Update'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
