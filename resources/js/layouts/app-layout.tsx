import Toast from '@/components/ui/toast';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

interface PageProps {
    success?: boolean | string;
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {

  const success = (usePage().props as PageProps).success;

  return (
      <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
          {success && (
              <Toast
                  type="success"
                  message={success}
                  onClose={() => {
                    setTimeout(() => {
                        console.log('5 seconds have passed');
                    }, 1000);
                  }}
              />
          )}

          {children}
      </AppLayoutTemplate>
  );
};
