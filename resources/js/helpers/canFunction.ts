import { User } from '@/types';

export function userCan(user: User, permission: string): boolean {
  return user.permissions.includes(permission);
}
export function hasRole(user: User, role: string): boolean {
  return user.permissions.includes(role);
}