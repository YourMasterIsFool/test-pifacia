import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateTaskDto } from "../../data/dto/task/CreateTaskDto";
import type { UpdateTaskDto } from "../../data/dto/task/UpdateTaskDto";
import type { TaskEntity } from "../entity/TaskEntity";

export interface TaskRepository {
  create(schema: CreateTaskDto): Promise<TaskEntity | null>;
  update(id: string, schema: UpdateTaskDto): Promise<TaskEntity | null>;
  detail(id: string): Promise<TaskEntity | null>;
  delete(id: string): Promise<number | null>;
  get(filterData?: FilterData): Promise<TaskEntity[] | []>;
  export(columns: string[]): Promise<void>;
}
