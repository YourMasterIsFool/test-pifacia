import type { AuditEntity } from "./AuditEntity";
import type { UserEntity } from "./UserEntity";

export interface ProjectEntity {
  id: string;
  creator: UserEntity;
  start: string;
  end: string;
  name: string;
  metadata: Record<string, any>;
  deleted_at: string | null;
  is_active: boolean;
  created_at: string;
  audits: AuditEntity[];
}
