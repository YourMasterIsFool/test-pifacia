import type { FilterData } from "../../data/dto/datatable/FilterDataDto";
import type { CreateUserDto } from "../../data/dto/user/CreateUserDto";
import type { UpdateUserDto } from "../../data/dto/user/UpdateUserDto";
import type { UserEntity } from "../entity/UserEntity";

export interface UserRepository {
  create(schema: CreateUserDto): Promise<UserEntity | null>;
  update(id: string, schema: UpdateUserDto): Promise<UserEntity | null>;
  detail(id: string): Promise<UserEntity | null>;
  delete(id: string): Promise<number | null>;
  get(filterData?: FilterData): Promise<UserEntity[] | []>;
}
