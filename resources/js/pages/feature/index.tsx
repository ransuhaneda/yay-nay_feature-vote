import FeatureItem from '@/components/feature-item';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/features';
import { Feature, PaginatedData, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feature',
        href: index().url,
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
            <div className="px-4 mt-4">
                <Button>
                    <Link href={create()}>Create a Feature Request</Link>
                </Button>
            </div>
            <div className="my-4 flex flex-col gap-4">
                {features.data.map((feature) => (
                    <FeatureItem feature={feature} />
                ))}
            </div>
        </AppLayout>
    );
}
