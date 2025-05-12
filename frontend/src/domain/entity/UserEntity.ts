import type { RoleEntity } from "./RoleEntity";

export interface UserEntity {
  name: string;
  email: string;
  role_id: string;
  id: string;
  role: RoleEntity;
}
