import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateTaskDto } from "../../data/dto/task/CreateTaskDto";
import type { UpdateTaskDto } from "../../data/dto/task/UpdateTaskDto";
import type { TaskEntity } from "../../domain/entity/TaskEntity";
import type { TaskRepository } from "../../domain/repository/TaskRepository";

export class TaskUsecase {
  constructor(private readonly repo: TaskRepository) {}

  async get(filter?: FilterData): Promise<TaskEntity[]> {
    return await this.repo.get(filter);
  }
  async create(schema: CreateTaskDto): Promise<TaskEntity | null> {
    return await this.repo.create(schema);
  }

  async detail(id: string): Promise<TaskEntity | null> {
    return await this.repo.detail(id);
  }

  async delete(id: string): Promise<number | null> {
    return await this.repo.delete(id);
  }

  async update(id: string, schema: UpdateTaskDto): Promise<TaskEntity | null> {
    return await this.repo.update(id, schema);
  }
  async export(columns: string[]): Promise<void> {
    return await this.repo.export(columns);
  }
}
