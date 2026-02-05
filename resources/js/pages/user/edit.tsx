import AppLayout from '@/layouts/app-layout';
import { index, update as userUpdate } from '@/routes/user';
import { BreadcrumbItem, Role, User } from '@/types';
import { Form } from '@inertiajs/react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { ReadOnlyField } from '@/components/input-readonly';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Update Form',
        href: index().url,
    },
];

type RoleUpdateProps = {
    user: User;
    roles: Role[];
    roleLabels: Record<string, string>;
};

export default function Edit({ user, roles, roleLabels }: RoleUpdateProps) {
    const initialRoles = user.roles || [];
    const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoles);

    const onRoleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = ev.target;

        setSelectedRoles((prev) =>
            checked ? [...prev, value] : prev.filter((role) => role !== value),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-4 rounded-md border border-neutral-300 bg-white p-4 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
                <Heading title={'Update User Roles: ' + user.name} />

                <Form
                    action={userUpdate(user.id)}
                    method="patch"
                    className="space-y-6"
                    key={user.id}
                >
                    {({ errors, processing }) => (
                        <>
                            <ReadOnlyField
                                label="Name"
                                value={user.name}
                                error={errors.name}
                            />
                            <ReadOnlyField
                                label="Email"
                                value={user.email}
                                error={errors.email}
                            />
                            <div className="flex flex-col gap-3">
                                {roles.map((role) => (
                                    <div
                                        key={role.id}
                                        className="align-center flex space-x-2"
                                    >
                                        <input
                                            id={role.name}
                                            name="roles[]"
                                            type="checkbox"
                                            checked={selectedRoles.includes(
                                                role.name,
                                            )}
                                            value={role.name}
                                            onChange={onRoleChange}
                                            tabIndex={1}
                                            className="rounder-xs h-4 w-4 cursor-pointer border border-slate-300 transition-all"
                                        />
                                        <Label htmlFor={role.name}>
                                            {roleLabels[role.name]}
                                        </Label>
                                    </div>
                                ))}

                                <InputError message={errors.roles} />
                            </div>

                            <Button disabled={processing} tabIndex={2}>
                                {processing ? 'Updating...' : 'Submit Update'}
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
