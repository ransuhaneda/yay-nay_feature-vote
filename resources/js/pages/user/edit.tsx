import AppLayout from '@/layouts/app-layout';
import { index, update as userUpdate } from '@/routes/user';
import { BreadcrumbItem, Role, User } from '@/types';
import { Form } from '@inertiajs/react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    
  // const onRoleChange = (ev) => {
  //   console.log(ev.target.value, ev.target.checked);
  // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-4 rounded-md border border-neutral-300 bg-white p-4 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
                <Heading title={'Update User Roles: ' + user.name} />

                <Form
                    action={userUpdate(user.id)}
                    method="patch"
                    className="space-y-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={user.name}
                                    required
                                    autoComplete="name"
                                    disabled
                                    className="mt-1 block w-full border-neutral-300"
                                />

                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    defaultValue={user.email}
                                    required
                                    autoComplete="email"
                                    disabled
                                    className="mt-1 block w-full border-neutral-300"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="flex flex-col gap-3">
                                {roles.map((role) => (
                                    <div
                                        key={role.id}
                                        className="align-center flex space-x-2"
                                    >
                                        <Checkbox
                                            id={role.name}
                                            name="roles[]"
                                            // defaultChecked={user.roles?.some(
                                                
                                            // )}
                                            value={role.name}
                                            onChange={onRoleChange}
                                            tabIndex={3}
                                            className="h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 transition-all"
                                        />
                                        <Label htmlFor={role.name}>
                                            {roleLabels[role.name]}
                                        </Label>
                                    </div>
                                ))}
                            </div>

                            <Button disabled={processing}>
                                {processing ? 'Updating...' : 'Submit Update'}
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
