<?php

namespace App\Http\Controllers;

use App\Data\TaskData;
use App\Dto\Datatable\DatatableFilterDto;
use App\Services\TaskService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    use ResponseTrait;


    public function __construct(
        public TaskService $service
    ) {}
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
            $validated = TaskData::from($request);
        } catch (\Exception $e) {
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

        return $this->successResponse($this->service->detail($id), "Succesfully get Task");
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
            $validated = TaskData::from($request);
        } catch (\Exception $e) {
            return $this->unProcessableEntity($e->errors());
        }

        return $this->successResponse($this->service->update($id, $validated->toUpdateDto()), "Succesfully update");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        return $this->successResponse($this->service->delete($id), "Succesfully delete Task");
    }

    public function export(Request $request)
    {
        if (!$request->columns) {
            return $this->badRequestResponse(null, "coba centang minimal 1");
        }
        return $this->service->export($request->columns);
    }
}
