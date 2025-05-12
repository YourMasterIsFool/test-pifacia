import { defineStore } from "pinia";
import type { ProjectEntity } from "../domain/entity/ProjectEntity";
import { ProjectUsecase } from "../applications/usecases/ProjectUsecase";
import { ProjectRepositoryImpl } from "../data/repository/ProjectRepositoryImpl";
import type { UpdateProjectDto } from "../data/dto/project/UpdateProjectDto";
import type { CreateProjectDto } from "../data/dto/project/CreateProjectDto";
import type { FilterData } from "../data/dto/datatable/FilterDataDto";
import { FetchError } from "ofetch";

const projectRepoImpl = new ProjectRepositoryImpl();
const projectUsecase = new ProjectUsecase(projectRepoImpl);
const useProjectStore = defineStore("projectStore", {
  state: () => ({
    projects: [] as ProjectEntity[],
    detailProject: null as ProjectEntity | null,
  }),

  getters: {
    getterProjects: (state) => state.projects,
    getterDetailProject: (state) => state.detailProject,
  },
  actions: {
    async exportData(
      columns: string[],
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await projectUsecase.export(columns);

        if (successCallback) successCallback();
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },

    async get(filter?: FilterData) {
      try {
        const response = await projectUsecase.get(filter);
        this.projects = response;
        console.log(this.projects);
      } catch (error) {
        console.log(error);
      }
    },

    async detail(id: string) {
      try {
        const response = await projectUsecase.detail(id);
        this.detailProject = response;
      } catch (error) {
        console.log(error);
      }
    },

    async update(
      id: string,
      schema: UpdateProjectDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await projectUsecase.update(id, schema);
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
      schema: CreateProjectDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await projectUsecase.create(schema);

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
        const response = await projectUsecase.remove(id);

        this.projects = this.projects.filter((filter) => filter.id != id);
        if (successCallback) successCallback();
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },
  },
});

export { useProjectStore };
