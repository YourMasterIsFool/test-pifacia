import { FetchError } from "ofetch";
import type { RoleRepository } from "../../domain/repository/RoleRepository";
import { apiClient } from "../../infrastructure/api/apiClient";
import type { LoginDto } from "../dto/Role/LoginDto";
import type { RoleEntity } from "../../domain/entity/RoleEntity";
import type { CreateRoleDto } from "../dto/role/CreateRoleDto";
import type { UpdateRoleDto } from "../dto/role/UpdateRoleDto";
import type { FilterData } from "../dto/datatable/FilterDataDto";

export class RoleRepositoryImpl implements RoleRepository {
  async create(schema: CreateRoleDto): Promise<RoleEntity | null> {
    try {
      let response = await apiClient("/role", {
        body: schema,
        method: "POST",
      });

      return response.data as RoleEntity;
    } catch (e) {
      throw e;
    }
  }
  async detail(id: string): Promise<RoleEntity | null> {
    try {
      let response = await apiClient("/role/" + id, {
        method: "GET",
      });
      return response.data as RoleEntity;
    } catch (e) {
      throw e;
    }
  }
  async update(id: string, schema: UpdateRoleDto): Promise<RoleEntity | null> {
    try {
      let response = await apiClient("/role/" + id, {
        method: "PUT",
        body: schema,
      });
      return response.data as RoleEntity;
    } catch (e) {
      throw e;
    }
  }
  async get(filterData?: FilterData): Promise<RoleEntity[] | []> {
    console.log(filterData, "filterData");
    try {
      let response = await apiClient("/role", {
        method: "GET",
        params: filterData ? filterData : undefined,
      });
      return response.data as RoleEntity[];
    } catch (e) {
      throw e;
    }
  }
  async remove(id: string): Promise<number | null> {

  
    try {
      let response = await apiClient("/role/" + id, {
        method: "DELETE",
      });
      return response.data as number;
    } catch (e) {
      throw e;
    }
  }
}
