import AppLayout from '@/layouts/app-layout';
import feature from '@/routes/feature';
import { Feature, PaginatedData, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feature',
        href: feature.index().url,
    },
];

export default function Index({
    features,
}: {
    features: PaginatedData<Feature>;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Features" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <pre>{JSON.stringify(features, undefined, 2)}</pre>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                {features.data.map((feature) => (
                    <>{feature.name}</>
                ))}
            </div>
        </AppLayout>
    );
}
