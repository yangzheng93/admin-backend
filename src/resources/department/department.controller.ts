import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { EditDepartmentDto } from './department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}

  // department/save
  @Post('save')
  @HttpCode(200)
  save(@Body() body: EditDepartmentDto) {
    return this.service.save(body);
  }

  // department/list
  @Post('list')
  @HttpCode(200)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
