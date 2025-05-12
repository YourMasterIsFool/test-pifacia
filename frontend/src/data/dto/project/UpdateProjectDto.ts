export interface UpdateProjectDto {
  name: string;
  start: string;
  end: string;
  metadata: string;
  file?: File
}
