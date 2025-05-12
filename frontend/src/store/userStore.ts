import { defineStore } from "pinia";
import type { UserEntity } from "../domain/entity/UserEntity";
import { UserUsecase } from "../applications/usecases/UserUsecase";
import { UserRepositoryImpl } from "../data/repository/UserRepositoryImpl";
import type { UpdateUserDto } from "../data/dto/user/UpdateUserDto";
import type { CreateUserDto } from "../data/dto/user/CreateUserDto";
import type { FilterData } from "../data/dto/datatable/FilterDataDto";
import { FetchError } from "ofetch";

const userRepoImpl = new UserRepositoryImpl();
const userUsecase = new UserUsecase(userRepoImpl);
const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as UserEntity[],
    detailUser: null as UserEntity | null,
  }),

  getters: {
    getterUsers: (state) => state.users,
    getterDetailUser: (state) => state.detailUser,
  },
  actions: {

     async exportData(
          columns: string[],
          successCallback?: () => void,
          errorCallback?: (err: Record<string, any>) => void
        ) {
          // try {
          //   const response = await userUsecase.export(columns);
    
          //   if (successCallback) successCallback();
          // } catch (error) {
          //   console.log(error);
    
          //   if (error instanceof FetchError)
          //     if (errorCallback) errorCallback(error.response?._data.errors);
          // }
        },
    async get(filter?: FilterData) {
      try {
        const response = await userUsecase.get(filter);
        this.users = response;
        console.log(this.users);
      } catch (error) {
        console.log(error);
      }
    },

    async detail(id: string) {
      try {
        const response = await userUsecase.detail(id);
        this.detailUser = response;
      } catch (error) {
        console.log(error);
      }
    },

    async update(
      id: string,
      schema: UpdateUserDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await userUsecase.update(id, schema);
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
      schema: CreateUserDto,
      successCallback?: () => void,
      errorCallback?: (err: Record<string, any>) => void
    ) {
      try {
        const response = await userUsecase.create(schema);

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
        const response = await userUsecase.delete(id);

        this.users =  this.users.filter((filter) => filter.id != id);
        if (successCallback) successCallback();
      } catch (error) {
        console.log(error);

        if (error instanceof FetchError)
          if (errorCallback) errorCallback(error.response?._data.errors);
      }
    },
  },
});

export { useUserStore };
