import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateRoleDto } from "../../data/dto/role/CreateRoleDto";
import type { UpdateRoleDto } from "../../data/dto/role/UpdateRoleDto";
import type { RoleEntity } from "../../domain/entity/RoleEntity";
import type { RoleRepository } from "../../domain/repository/RoleRepository";

export class RoleUsecase {
  constructor(private readonly repo: RoleRepository) {}

  async get(filter?: FilterData): Promise<RoleEntity[]> {
    return await this.repo.get(filter);
  }
  async create(schema: CreateRoleDto): Promise<RoleEntity | null> {
    return await this.repo.create(schema);
  }

  async detail(id: string): Promise<RoleEntity | null> {
    return await this.repo.detail(id);
  }

  async remove(id: string): Promise<number | null> {
    return await this.repo.remove(id);
  }

  async update(id: string, schema: UpdateRoleDto): Promise<RoleEntity | null> {
    return await this.repo.update(id, schema);
  }
}
