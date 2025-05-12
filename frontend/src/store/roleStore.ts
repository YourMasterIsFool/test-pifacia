import { defineStore } from "pinia";
import type { RoleEntity } from "../domain/entity/RoleEntity";
import { RoleUsecase } from "../applications/usecases/RoleUsecase";
import { RoleRepositoryImpl } from "../data/repository/RoleRepositoryImpl";
import type { UpdateRoleDto } from "../data/dto/role/UpdateRoleDto";
import type { CreateRoleDto } from "../data/dto/role/CreateRoleDto";
import type { FilterData } from "../data/dto/datatable/FilterDataDto";
import { FetchError } from "ofetch";

const roleRepoImpl = new RoleRepositoryImpl();
const roleUsecase = new RoleUsecase(roleRepoImpl);
const useRoleStore = defineStore("roleStore", {
  state: () => ({
    roles: [] as RoleEntity[],
    detailRole: null as RoleEntity | null,
  }),

  getters: {
    getterRoles: (state) => state.roles,
    getterDetailRole: (state) => state.detailRole,
  },
  actions: {
    async get(filter?: FilterData) {
      try {
        const response = await roleUsecase.get(filter);
        this.roles = response;
        console.log(this.roles);
      } catch (error) {
        console.log(error);
      }
    },

    async detail(id: string) {
      try {
        const response = await roleUsecase.detail(id);
        this.detailRole = response;
      } catch (error) {
        console.log(error);
      }
    },

    async update(
      id: string,
      schema: UpdateRoleDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await roleUsecase.update(id, schema);
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
      schema: CreateRoleDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await roleUsecase.create(schema);

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
        const response = await roleUsecase.remove(id);

        this.roles =  this.roles.filter((filter) => filter.id != id);
        if (successCallback) successCallback();
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },
  },
});

export { useRoleStore };
