import { Controller } from '@nestjs/common';
import { PermissionGroupService } from './permission_group.service';

@Controller('permission-group')
export class PermissionGroupController {
  constructor(private readonly service: PermissionGroupService) {}
}
