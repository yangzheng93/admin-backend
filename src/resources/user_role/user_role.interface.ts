interface GetUserByRoleInterface {
  id?: number; // role_id
  name?: string; // role_name
}

interface UserRole {
  id: number;
  user_id: number;
}

interface UpsertUserRoleInterface {
  role_id: number;
  user_ids: UserRole[];
}

interface RemoveUserRoleInterface {
  ids: number[];
}
