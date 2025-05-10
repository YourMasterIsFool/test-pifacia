<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        $datas = [
            [
                "code" => "administrator",
                "name"=> "administrator"
            ],
            [
                "code" => "staff",
                "name" => "staff"
            ]
        ];

    
        foreach($datas as $data) {
          $find = Role::where("code", $data['code'])->first();

          if(!$find) {
            Role::create($data);
          }
        }
        //
    }
}
