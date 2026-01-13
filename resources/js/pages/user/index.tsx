import AppLayout from '@/layouts/app-layout';
import { edit as editUser, index } from '@/routes/user';
import { User, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role Assign',
        href: index().url,
    },
];

type UserListProps = {
    user: User[];
};

export default function Index({ user }: UserListProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Roles" />

            <div className="bg-neutral-primary-soft rounded-base border-default relative m-8 overflow-x-auto border shadow-xs">
                <table className="text-body w-full text-left text-sm rtl:text-right">
                    <thead className="text-body bg-neutral-secondary-soft rounded-base border-default border-b text-sm">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Roles
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((userItem) => (
                            <tr
                                key={userItem.id}
                                className="bg-neutral-primary border-default border-b"
                            >
                                <th
                                    scope="row"
                                    className="text-heading px-6 py-4 font-medium whitespace-nowrap"
                                >
                                    {userItem.name}
                                </th>
                                <td className="px-6 py-4">{userItem.email}</td>
                                <td className="px-6 py-4">
                                    {userItem.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    {userItem.roles
                                        .join(', ')
                                        .toLocaleUpperCase()}
                                </td>
                                <td className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <DropdownMenuLabel className="p-0 font-normal">
                                                <Button className="cursor-pointer bg-amber-500 text-neutral-900 hover:bg-amber-600 dark:bg-amber-600 dark:text-white dark:hover:bg-amber-700">
                                                    Actions
                                                </Button>
                                            </DropdownMenuLabel>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-30 rounded-md border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                                            <DropdownMenuItem className="cursor-pointer items-center rounded p-2 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-white">
                                                <Link
                                                    href={editUser(userItem.id)}
                                                >
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer items-center rounded p-2 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-white">
                                                <Link>Delete</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
