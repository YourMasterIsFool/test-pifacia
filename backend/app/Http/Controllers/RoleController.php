<?php

namespace App\Http\Controllers;

use App\Data\RoleData;
use App\Dto\Datatable\DatatableFilterDto;
use App\Services\RoleService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;


class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    use ResponseTrait;


    public function __construct(
        public RoleService $service
    )
    {
        
    }
    public function index(Request $request)
    {
        //
        $datatableFilter =  new DatatableFilterDto(
            $request->search,
            $request->sorting
        );
        return $this->successResponse($this->service->get($datatableFilter), "Successfully get data");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        try {
            $validated = RoleData::from($request);
        }
        catch(\Exception $e) {
            return $this->unProcessableEntity($e->errors());
        }

        return $this->successResponse($this->service->save($validated->toCreateDto()), "Succesfully created");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        return $this->successResponse($this->service->detail($id), "Succesfully get role");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //

        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        try {
            $validated = RoleData::from($request);
        } catch (\Exception $e) {
            return $this->unProcessableEntity($e->errors());
        }

        return $this->successResponse($this->service->update($id,$validated->toUpdateDto()), "Succesfully update");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        return $this->successResponse($this->service->delete($id), "Succesfully delete");
    }
}
