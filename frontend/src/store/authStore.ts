import { defineStore } from "pinia";
import type { UserEntity } from "../domain/entity/UserEntity";
import { UserUsecase } from "../applications/usecases/UserUsecase";
import { UserRepositoryImpl } from "../data/repository/UserRepositoryImpl";
import type { UpdateUserDto } from "../data/dto/user/UpdateUserDto";
import type { CreateUserDto } from "../data/dto/user/CreateUserDto";
import type { LoginDto } from "../data/dto/auth/LoginDto";
import { AuthRepositoryImpl } from "../data/repository/AuthRepositoryImpl";
import { AuthUsecase } from "../applications/usecases/AuthUsecase";
import { FetchError } from "ofetch";

const authRepoImpl = new AuthRepositoryImpl();
const authUsecase = new AuthUsecase(authRepoImpl);
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    // users: [] as UserEntity[],
    // detail: null as UserEntity | null,
    token: null as string | null,
    errors: null as Record<string, any> | null,
    user: null as UserEntity | null,
    // currentUser: null as UserEntity | null,
  }),

  getters: {
    isAuthenticated: (state) => {
      return localStorage.getItem('token');
    },

    getterUser:(state) => state.user
  },

  actions: {

    async profile() {
      try {
        const response =  await authUsecase.profile();

        if(!this.user) {
          this.user = response;
        }

      }
      catch(error) {
        if(error instanceof FetchError) {
          this.errors =  error.response?._data?.errors;
          localStorage.removeItem("token");
          throw error;
         }

         console.log(error);
      }
    },
    async login(schema: LoginDto, successCallback?:() => void, errorCallback?:(err: Record<string, any>) => void) {
      try {
        const response = await authUsecase.login(schema);
        this.token = response as string
        localStorage.setItem('token', response as string);
      } catch (error) {
        if(error instanceof FetchError) {
          this.errors =  error.response?._data?.errors;
          localStorage.removeItem("token");
          if(errorCallback) {
            errorCallback(error.response?._data.errors)
          }
         }
      }
    },
  },
});
