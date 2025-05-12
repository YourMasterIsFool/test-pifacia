import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateSubTaskDto } from "../../data/dto/sub_task/CreateSubTaskDto";
import type { UpdateSubTaskDto } from "../../data/dto/sub_task/UpdateSubTaskDto";
import type { SubTaskEntity } from "../../domain/entity/SubTaskEntity";
import type { SubTaskRepository } from "../../domain/repository/SubTaskRepository";

export class SubTaskUsecase {
  constructor(private readonly repo: SubTaskRepository) {}

  async get(filter?: FilterData): Promise<SubTaskEntity[]> {
    return await this.repo.get(filter);
  }
  async create(schema: CreateSubTaskDto): Promise<SubTaskEntity | null> {
    return await this.repo.create(schema);
  }

  async detail(id: string): Promise<SubTaskEntity | null> {
    return await this.repo.detail(id);
  }

  async remove(id: string): Promise<number | null> {
    return await this.repo.remove(id);
  }

  async update(
    id: string,
    schema: UpdateSubTaskDto
  ): Promise<SubTaskEntity | null> {
    return await this.repo.update(id, schema);
  }

  async export(columns: string[]): Promise<void> {
    return await this.repo.export(columns);
  }
}
