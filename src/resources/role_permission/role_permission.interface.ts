interface GetPermissionByRoleInterface {
  id?: number; // role_id
  name?: string; // role_name
}

interface RolePermission {
  id: number;
  permission_id: number;
}

interface UpsertRolePermissionInterface {
  role_id: number;
  permission_ids: RolePermission[];
}
