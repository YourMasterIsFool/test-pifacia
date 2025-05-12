import type { SubTaskRepository } from "../../domain/repository/SubTaskRepository";
import { apiClient } from "../../infrastructure/api/apiClient";
import type { SubTaskEntity } from "../../domain/entity/SubTaskEntity";
import type { CreateSubTaskDto } from "../dto/sub_task/CreateSubTaskDto";
import type { UpdateSubTaskDto } from "../dto/sub_task/UpdateSubTaskDto";
import type { FilterData } from "../dto/datatable/FilterDataDto";

export class SubTaskRepositoryImpl implements SubTaskRepository {
  async create(schema: CreateSubTaskDto): Promise<SubTaskEntity | null> {
    try {
      let response = await apiClient("/sub-task", {
        body: schema,
        method: "POST",
      });

      return response.data as SubTaskEntity;
    } catch (e) {
      throw e;
    }
  }
  async detail(id: string): Promise<SubTaskEntity | null> {
    try {
      let response = await apiClient("/sub-task/" + id, {
        method: "GET",
      });
      return response.data as SubTaskEntity;
    } catch (e) {
      throw e;
    }
  }
  async update(
    id: string,
    schema: UpdateSubTaskDto,
  ): Promise<SubTaskEntity | null> {
    try {
      let response = await apiClient("/sub-task/" + id, {
        method: "PUT",
        body: schema,
      });
      return response.data as SubTaskEntity;
    } catch (e) {
      throw e;
    }
  }
  async get(filterData?: FilterData): Promise<SubTaskEntity[] | []> {
    try {
      let response = await apiClient("/sub-task", {
        method: "GET",
        params: filterData ? filterData : undefined,
      });
      return response.data as SubTaskEntity[];
    } catch (e) {
      throw e;
    }
  }
  async remove(id: string): Promise<number | null> {
    try {
      let response = await apiClient("/sub-task/" + id, {
        method: "DELETE",
      });
      return response.data as number;
    } catch (e) {
      throw e;
    }
  }

   async export(columns: string[]): Promise<void> {
      try {
        const response = await apiClient("/export/sub-task", {
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
        a.download = "sub-task-export.xlsx"; // Filename to save
        a.click();
  
        window.URL.revokeObjectURL(url);
      } catch (e) {
        throw e;
      }
    }


}
