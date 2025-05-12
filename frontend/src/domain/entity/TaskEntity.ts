import type { AuditEntity } from "./AuditEntity";
import type { ProjectEntity } from "@/domain/entity/ProjectEntity";

export interface TaskEntity {
  id: string;
  start: string;
  end: string;
  metadata: string;
  name: string;
  deleted_at: string | null;
  is_finish: boolean;
  created_at: string;
  project_id: string;
  audits: AuditEntity[];
  project: ProjectEntity;
}
