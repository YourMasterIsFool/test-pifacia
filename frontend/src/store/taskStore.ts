import { defineStore } from "pinia";
import type { TaskEntity } from "../domain/entity/TaskEntity";
import { TaskUsecase } from "../applications/usecases/TaskUsecase";
import { TaskRepositoryImpl } from "../data/repository/TaskRepositoryImpl";
import type { UpdateTaskDto } from "../data/dto/task/UpdateTaskDto";
import type { CreateTaskDto } from "../data/dto/task/CreateTaskDto";
import type { FilterData } from "../data/dto/datatable/FilterDataDto";
import { FetchError } from "ofetch";

const taskRepoImpl = new TaskRepositoryImpl();
const taskUsecase = new TaskUsecase(taskRepoImpl);
const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [] as TaskEntity[],
    detailTask: null as TaskEntity | null,
  }),

  getters: {
    getterTasks: (state) => state.tasks,
    getterDetailTask: (state) => state.detailTask,
  },
  actions: {

     async exportData(
          columns: string[],
          successCallback?: () => void,
          errorCallback?: (err: Record<string, any>) => void
        ) {
          try {
            const response = await taskUsecase.export(columns);
    
            if (successCallback) successCallback();
          } catch (error) {
            console.log(error);
    
            if (error instanceof FetchError)
              if (errorCallback) errorCallback(error.response?._data.errors);
          }
        },
    async get(filter?: FilterData) {
      try {
        const response = await taskUsecase.get(filter);
        this.tasks = response;
        console.log(this.tasks);
      } catch (error) {
        console.log(error);
      }
    },

    async detail(id: string) {
      try {
        const response = await taskUsecase.detail(id);
        this.detailTask = response;
      } catch (error) {
        console.log(error);
      }
    },

    async update(
      id: string,
      schema: UpdateTaskDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await taskUsecase.update(id, schema);
        if(successCallback){
          successCallback()
        }
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },

    async store(
      schema: CreateTaskDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await taskUsecase.create(schema);

        if (successCallback) {
          successCallback();
        }
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },

    async remove(
      id: string,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await taskUsecase.remove(id);

        this.tasks =  this.tasks.filter((filter) => filter.id != id);
        if (successCallback) successCallback();
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },
  },
});

export { useTaskStore };
