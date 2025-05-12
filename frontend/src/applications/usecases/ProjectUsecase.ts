import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateProjectDto } from "../../data/dto/project/CreateProjectDto";
import type { UpdateProjectDto } from "../../data/dto/project/UpdateProjectDto";
import type { ProjectEntity } from "../../domain/entity/ProjectEntity";
import type { ProjectRepository } from "../../domain/repository/ProjectRepository";

export class ProjectUsecase {
  constructor(private readonly repo: ProjectRepository) {}

  async get(filter?: FilterData): Promise<ProjectEntity[]> {
    return await this.repo.get(filter);
  }
  async create(schema: CreateProjectDto): Promise<ProjectEntity | null> {

    console.log('project use case', schema);
    return await this.repo.create(schema);
  }

  async detail(id: string): Promise<ProjectEntity | null> {
    return await this.repo.detail(id);
  }

  async remove(id: string): Promise<number | null> {
    return await this.repo.remove(id);
  }

  async update(
    id: string,
    schema: UpdateProjectDto
  ): Promise<ProjectEntity | null> {
    return await this.repo.update(id, schema);
  }

  async export(
    columns: string[]
   
  ): Promise<void> {
    return await this.repo.export(columns);
  }
}
