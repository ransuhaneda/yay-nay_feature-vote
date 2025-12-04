<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\Feature;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $userRole = Role::firstOrCreate(['name' => RolesEnum::User->value]);
        $commenterRole = Role::firstOrCreate(['name' => RolesEnum::Commenter->value]);
        $adminRole = Role::firstOrCreate(['name' => RolesEnum::Admin->value]);

        $manageFeaturesPermission = Permission::firstOrCreate(['name' => PermissionsEnum::ManageFeatures->value]);
        $manageCommentsPermission = Permission::firstOrCreate(['name' => PermissionsEnum::ManageComments->value]);
        $manageUsersPermission = Permission::firstOrCreate(['name' => PermissionsEnum::ManageUsers->value]);
        $upvoteDownvotePermission = Permission::firstOrCreate(['name' => PermissionsEnum::UpvoteDownvote->value]);

        $userRole->syncPermissions([$upvoteDownvotePermission]);
        $commenterRole->syncPermissions([$upvoteDownvotePermission, $manageCommentsPermission]);
        $adminRole->syncPermissions([$upvoteDownvotePermission, $manageCommentsPermission, $manageUsersPermission, $manageFeaturesPermission]);

        User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Normal User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        )->assignRole(RolesEnum::User);
        User::firstOrCreate(
            ['email' => 'commenter@example.com'],
            [
                'name' => 'Commenter User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        )->assignRole(RolesEnum::Commenter);
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        )->assignRole(RolesEnum::Admin);

        Feature::factory(100)->create();
    }
}
