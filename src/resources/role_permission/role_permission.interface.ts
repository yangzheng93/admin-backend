// import { RolePermission } from './role_permission.entity';

interface GetPermissionByRoleInterface {
  role_ids?: number[]; // role_ids
  role_name?: string; // role_name
}

interface PermissionIds {
  id: number;
  permission_id: number;
}

interface UpsertRolePermissionInterface {
  role_id: number;
  permission_ids: PermissionIds[];
}
