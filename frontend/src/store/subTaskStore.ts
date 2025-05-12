import { defineStore } from "pinia";
import type { SubTaskEntity } from "../domain/entity/SubTaskEntity";
import { SubTaskUsecase } from "../applications/usecases/SubTaskUsecase";
import { SubTaskRepositoryImpl } from "../data/repository/SubTaskRepositoryImpl";
import type { UpdateSubTaskDto } from "../data/dto/sub_task/UpdateSubTaskDto";
import type { CreateSubTaskDto } from "../data/dto/sub_task/CreateSubTaskDto";
import type { FilterData } from "../data/dto/datatable/FilterDataDto";
import { FetchError } from "ofetch";

const subTaskRepoImpl = new SubTaskRepositoryImpl();
const subTaskUsecase = new SubTaskUsecase(subTaskRepoImpl);
const useSubTaskStore = defineStore("subTaskStore", {
  state: () => ({
    subTasks: [] as SubTaskEntity[],
    detailSubTask: null as SubTaskEntity | null,
  }),

  getters: {
    getterSubTasks: (state) => state.subTasks,
    getterDetailSubTask: (state) => state.detailSubTask,
  },
  actions: {

     async exportData(
          columns: string[],
          successCallback?: () => void,
          errorCallback?: (err: Record<string, any>) => void
        ) {
          try {
            const response = await subTaskUsecase.export(columns);
    
            if (successCallback) successCallback();
          } catch (error) {
            console.log(error);
    
            if (error instanceof FetchError)
              if (errorCallback) errorCallback(error.response?._data.errors);
          }
        },
    async get(filter?: FilterData) {
      try {
        const response = await subTaskUsecase.get(filter);
        this.subTasks = response;
        console.log(this.subTasks);
      } catch (error) {
        console.log(error);
      }
    },

    async detail(id: string) {
      try {
        const response = await subTaskUsecase.detail(id);
        this.detailSubTask = response;
      } catch (error) {
        console.log(error);
      }
    },

    async update(
      id: string,
      schema: UpdateSubTaskDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await subTaskUsecase.update(id, schema);
        if (successCallback) {
          successCallback();
        }
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },

    async store(
      schema: CreateSubTaskDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await subTaskUsecase.create(schema);

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
        const response = await subTaskUsecase.remove(id);

        this.subTasks = this.subTasks.filter((filter) => filter.id != id);
        if (successCallback) successCallback();
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },
  },
});

export { useSubTaskStore };
