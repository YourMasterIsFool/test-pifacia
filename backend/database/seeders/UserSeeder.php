<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $datas = [
            [
                "email" => "admin@gmail.com",
                "name" => "test_admin",
                'role' => "administrator",
                "password" => Hash::make("test123")
            ],
            [
                "email" => "user@gmail.com",
                "name" => "test_user",
                'role' => "staff",
                "password" => Hash::make("test123")
            ]
        ];


        foreach ($datas as $data) {
            $find = User::where("email", $data['email'])->first();
            $findRole = Role::where('code', $data['role'])->first();
            // dd($findRole);
            if (!$find) {
                User::create([
                    'email' => $data['email'],
                    'name' => $data['name'],
                    'password' => $data['password'],
                    'role_id' => $findRole->id,
                ]);
            }
        }
    }
}
