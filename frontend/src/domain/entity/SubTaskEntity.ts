import type { AuditEntity } from "./AuditEntity";
import type { TaskEntity } from "./TaskEntity";

export interface SubTaskEntity {
  id: string;
  start: string;
  end: string;
  metadata: Record<string, any>;
  deleted_at: string | null;
  is_finish: boolean;
  created_at: string;
  task: TaskEntity;
  task_id: string;
  audits: AuditEntity[];
}
