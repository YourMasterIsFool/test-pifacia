import type { LoginDto } from "../../data/dto/auth/LoginDto";

import type { UserEntity } from "../../domain/entity/UserEntity";
import type { AuthRepository } from "../../domain/repository/AuthRepository";
export class AuthUsecase {
  constructor(private readonly repo: AuthRepository) {}

  async login(schema: LoginDto): Promise<string | undefined> {
    return await this.repo.login(schema);
  }

  async profile(): Promise<UserEntity> {
    return await this.repo.profile();
  }
}
