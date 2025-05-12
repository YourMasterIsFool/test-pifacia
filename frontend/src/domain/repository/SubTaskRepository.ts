import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateSubTaskDto } from "../../data/dto/sub_task/CreateSubTaskDto";
import type { UpdateSubTaskDto } from "../../data/dto/sub_task/UpdateSubTaskDto";
import type { SubTaskEntity } from "../entity/SubTaskEntity";
import type { UserEntity } from "../entity/UserEntity";

export interface SubTaskRepository {
  create(schema: CreateSubTaskDto): Promise<SubTaskEntity | null>;
  update(id: string, schema: UpdateSubTaskDto): Promise<SubTaskEntity | null>;
  detail(id: string): Promise<SubTaskEntity | null>;
  remove(id: string): Promise<number | null>;
  get(filterData?: FilterData): Promise<SubTaskEntity[] | []>;
  export(columns: string[]): Promise<void>;
}
