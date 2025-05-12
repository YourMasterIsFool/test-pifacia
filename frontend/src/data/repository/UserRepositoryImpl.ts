import type { UserRepository } from "../../domain/repository/UserRepository";
import { apiClient } from "../../infrastructure/api/apiClient";
import type { UserEntity } from "../../domain/entity/UserEntity";
import type { CreateUserDto } from "../dto/user/CreateUserDto";
import type { UpdateUserDto } from "../dto/user/UpdateUserDto";
import type { FilterData } from "../dto/datatable/FilterDataDto";

export class UserRepositoryImpl implements UserRepository {
  async create(schema: CreateUserDto): Promise<UserEntity | null> {
    try {
      let response = await apiClient("/user", {
        body: schema,
        method: "POST",
      });

      return response.data as UserEntity;
    } catch (e) {
      throw e;
    }
  }
  async detail(id: string): Promise<UserEntity | null> {
    try {
      let response = await apiClient("/user/" + id, {
        method: "GET",
      });
      return response.data as UserEntity;
    } catch (e) {
      throw e;
    }
  }
  async update(id: string, schema: UpdateUserDto): Promise<UserEntity | null> {
    try {
      let response = await apiClient("/user/" + id, {
        method: "UPDATE",
        body: schema,
      });
      return response.data as UserEntity;
    } catch (e) {
      throw e;
    }
  }
  async get(filterData?: FilterData): Promise<UserEntity[] | []> {
    try {
      let response = await apiClient("/user", {
        method: "GET",
        params: filterData ? filterData : undefined,
      });
      return response.data as UserEntity[];
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string): Promise<number | null> {
    try {
      let response = await apiClient("/user/" + id, {
        method: "DELETE",
      });
      return response.data as number;
    } catch (e) {
      throw e;
    }
  }
}
