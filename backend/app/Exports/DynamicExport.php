<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithHeadings;

class DynamicExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */

    // definisikan dynamic model dan columns
    protected Model $model;
    protected array $columns;
    public function __construct(Model $model, array $columns)
    {       
        $this->model =  $model;
        $this->columns =  $columns;
    }
    public function collection()
    {
        //

        return $this->model::select($this->columns)->get();
    }

    public function headings(): array
    {
        return $this->columns;
    }
}
