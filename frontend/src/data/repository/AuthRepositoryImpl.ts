import { FetchError } from "ofetch";
import type { AuthRepository } from "../../domain/repository/AuthRepository";
import { apiClient } from "../../infrastructure/api/apiClient";
import type { LoginDto } from "../dto/auth/LoginDto";

export class AuthRepositoryImpl implements AuthRepository {
  async login(schema: LoginDto): Promise<string | undefined> {
    try {
      let response = await apiClient("/login", {
        body: schema,
        method: "POST",
      });
      const token = response.data.token as string;
      return token;
    } catch (e) {
      if (e instanceof FetchError) {
        throw e;
      }
    }
  }

  async logout(): Promise<void> {
    try {
      let response = await apiClient("/logout", {});
      return response;
    } catch (e) {
      if (e instanceof FetchError) {
        throw e;
      }
    }
  }

  async profile(): Promise<UserEntity> {
    try {
      let response = await apiClient("/profile", {
        method: "GET"
      });
      return response;
    } catch (e) {
      if (e instanceof FetchError) {
        throw e;
      }
    }
  }
}
