export interface CreateTaskDto {
  name: string;
  start: string;
  end: string;
  metadata: string;
  project_id: string;
}
