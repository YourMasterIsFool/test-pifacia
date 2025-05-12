import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateRoleDto } from "../../data/dto/role/CreateRoleDto";
import type { UpdateRoleDto } from "../../data/dto/role/UpdateRoleDto";
import type { RoleEntity } from "../entity/RoleEntity";
import type { UserEntity } from "../entity/UserEntity";

export interface RoleRepository {
  create(schema: CreateRoleDto): Promise<RoleEntity | null>;
  update(id: string, schema: UpdateRoleDto): Promise<RoleEntity | null>;
  detail(id: string): Promise<RoleEntity | null>;
  remove(id: string): Promise<number | null>;
  get(filterData?: FilterData): Promise<RoleEntity[] | []>;
}
