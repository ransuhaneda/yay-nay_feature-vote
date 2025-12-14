import FeatureItem from '@/components/feature-item';
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
            <div className="flex flex-col gap-4 my-4">
                {features.data.map((feature) => (
                    <FeatureItem feature={feature} />
                ))}
            </div>
        </AppLayout>
    );
}
