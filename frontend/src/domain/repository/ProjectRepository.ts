import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateProjectDto } from "../../data/dto/project/CreateProjectDto";
import type { UpdateProjectDto } from "../../data/dto/project/UpdateProjectDto";
import type { ProjectEntity } from "../entity/ProjectEntity";

export interface ProjectRepository {
  create(schema: CreateProjectDto): Promise<ProjectEntity | null>;
  update(id: string, schema: UpdateProjectDto): Promise<ProjectEntity | null>;
  detail(id: string): Promise<ProjectEntity | null>;
  remove(id: string): Promise<number | null>;
  get(filterData?: FilterData): Promise<ProjectEntity[] | []>;
  export(columns: string[]): Promise<void>;
}
