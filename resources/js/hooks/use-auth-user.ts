import { User } from '@/types';
import { usePage } from '@inertiajs/react';

/**
 * Hook for accessing currently authenticated user
 * @returns The authenticated user object or null if not authenticated
 */
export function useAuthUser(): User | null {
    const { props } = usePage<{ auth: { user: User | null } }>();

    return props.auth.user;
}

/**
 * Hook for accessing authenticated user
 * @returns The authenticated user object
 * @throws {Error} When user is not authenticated
 */
export function useAuthUserStrict(): User {
    const { props } = usePage<{ auth: { user: User | null } }>();
    const user = props.auth.user;

    if (!user) {
        throw new Error('User is not authenticated');
    }

    return user;
}