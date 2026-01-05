import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/features';
import { BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputTextarea } from '@/components/ui/input-textarea';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/features';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feature Create Form',
        href: index().url,
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new Feature Request" />

            <div className="mx-4 border border-neutral-300 rounded-md bg-white p-4 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
                <Form action={store()} method="post" className="space-y-6">
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Feature Name</Label>

                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Feature name"
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
                                    rows={6}
                                    placeholder="Feature description"
                                    className="mt-1 block w-full border-neutral-300"
                                />

                                <InputError message={errors.description} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>
                                    Submit Feature Request
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
