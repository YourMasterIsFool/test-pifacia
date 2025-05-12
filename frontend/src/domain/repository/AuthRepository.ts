import type { UserEntity } from "@/domain/entity/UserEntity";
import type { LoginDto } from "../../data/dto/auth/LoginDto";

export interface AuthRepository {
  login(schema: LoginDto): Promise<string | undefined>;
  logout(): Promise<void>;
  profile(): Promise<UserEntity>;
}
