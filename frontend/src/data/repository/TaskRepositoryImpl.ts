import type { TaskRepository } from "../../domain/repository/TaskRepository";
import { apiClient } from "../../infrastructure/api/apiClient";
import type { TaskEntity } from "../../domain/entity/TaskEntity";
import type { CreateTaskDto } from "../dto/task/CreateTaskDto";
import type { UpdateTaskDto } from "../dto/task/UpdateTaskDto";
import type { FilterData } from "../dto/datatable/FilterDataDto";

export class TaskRepositoryImpl implements TaskRepository {
  async create(schema: CreateTaskDto): Promise<TaskEntity | null> {
    try {
      let response = await apiClient("/task", {
        body: schema,
        method: "POST",
      });

      return response.data as TaskEntity;
    } catch (e) {
      throw e;
    }
  }
  async detail(id: string): Promise<TaskEntity | null> {
    try {
      let response = await apiClient("/task/" + id, {
        method: "GET",
      });
      return response.data as TaskEntity;
    } catch (e) {
      throw e;
    }
  }
  async update(id: string, schema: UpdateTaskDto): Promise<TaskEntity | null> {
    try {
      let response = await apiClient("/task/" + id, {
        method: "PUT",
        body: schema,
      });
      return response.data as TaskEntity;
    } catch (e) {
      throw e;
    }
  }
  async get(filterData?: FilterData): Promise<TaskEntity[] | []> {
    try {
      let response = await apiClient("/task", {
        method: "GET",
        params: filterData ? filterData : undefined,
      });
      return response.data as TaskEntity[];
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string): Promise<number | null> {
    try {
      let response = await apiClient("/task/" + id, {
        method: "DELETE",
      });
      return response.data as number;
    } catch (e) {
      throw e;
    }
  }

  async export(columns: string[]): Promise<void> {
        try {
          const response = await apiClient("/export/task", {
            method: "POST",
            body: {
              columns: columns
            },
            headers: {
              "Content-Type": "application/json",
            },
            responseType: "blob", // menerima response blob
          });
    
          const blob = new Blob([response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
    
          const a = document.createElement("a");
          a.href = url;
          a.download = "task-export.xlsx"; // Filename to save
          a.click();
    
          window.URL.revokeObjectURL(url);
        } catch (e) {
          throw e;
        }
      }

  
}
