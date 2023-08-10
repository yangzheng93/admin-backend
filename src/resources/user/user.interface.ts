type UserGender = '男' | '女' | '';

interface UserSearchInterface {
  id?: number;
  phone?: string;
}

interface BulkImportUserInterface {
  name: string;
  gender: UserGender;
  phone: string;
  email: string;
  department: string;
}
