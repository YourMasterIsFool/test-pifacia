import type { RoleEntity } from "./RoleEntity";

export interface AuditEntity {
  id: string;
  action: string;
  features: string;
  notes: string;
  master_id: string;
  creator_name: string;
  created_at: string;
  updated_at: string;
}
