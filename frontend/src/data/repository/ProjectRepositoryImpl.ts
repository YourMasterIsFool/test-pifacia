import type { ProjectRepository } from "../../domain/repository/ProjectRepository";
import { apiClient } from "../../infrastructure/api/apiClient";
import type { ProjectEntity } from "../../domain/entity/ProjectEntity";
import type { CreateProjectDto } from "../dto/project/CreateProjectDto";
import type { UpdateProjectDto } from "../dto/project/UpdateProjectDto";
import type { FilterData } from "../dto/datatable/FilterDataDto";

export class ProjectRepositoryImpl implements ProjectRepository {
  async create(schema: CreateProjectDto): Promise<ProjectEntity | null> {
    try {
      let response = await apiClient("/project", {
        body: schema,
        method: "POST",
      });

      return response.data as ProjectEntity;
    } catch (e) {
      throw e;
    }
  }
  async detail(id: string): Promise<ProjectEntity | null> {
    try {
      let response = await apiClient("/project/" + id, {
        method: "GET",
      });
      return response.data as ProjectEntity;
    } catch (e) {
      throw e;
    }
  }
  async update(
    id: string,
    schema: UpdateProjectDto
  ): Promise<ProjectEntity | null> {
    try {
      let response = await apiClient("/project/" + id, {
        method: "PUT",
        body: schema,
      });
      return response.data as ProjectEntity;
    } catch (e) {
      throw e;
    }
  }
  async get(filterData?: FilterData): Promise<ProjectEntity[] | []> {
    try {
      let response = await apiClient("/project", {
        method: "GET",
        params: filterData ? filterData : undefined,
      });
      return response.data as ProjectEntity[];
    } catch (e) {
      throw e;
    }
  }
  async remove(id: string): Promise<number | null> {
    try {
      let response = await apiClient("/project/" + id, {
        method: "DELETE",
      });
      return response.data as number;
    } catch (e) {
      throw e;
    }
  }

  async export(columns: string[]): Promise<void> {
    try {
      const response = await apiClient("/export/project", {
        method: "POST",
        body: {
          columns: columns
        }, // Send selected columns
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob", // 👈 Important for downloading binary file
      });

      // Create blob and download
      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "project-export.xlsx"; // Filename to save
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (e) {
      throw e;
    }
  }
}
