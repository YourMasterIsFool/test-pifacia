import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateUserDto } from "../../data/dto/user/CreateUserDto";
import type { UpdateUserDto } from "../../data/dto/user/UpdateUserDto";
import type { UserEntity } from "../../domain/entity/UserEntity";
import type { UserRepository } from "../../domain/repository/UserRepository";

export class UserUsecase {
  constructor(private readonly repo: UserRepository) {}

  async get(filter?: FilterData): Promise<UserEntity[]> {
    return await this.repo.get(filter);
  }
  async create(schema: CreateUserDto): Promise<UserEntity | null> {
    return await this.repo.create(schema);
  }

  async detail(id: string): Promise<UserEntity | null> {
    return await this.repo.detail(id);
  }

  async delete(id: string): Promise<number | null> {
    return await this.repo.delete(id);
  }

  async update(id: string, schema: UpdateUserDto): Promise<UserEntity | null> {
    return await this.repo.update(id, schema);
  }
}
