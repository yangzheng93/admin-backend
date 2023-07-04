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
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}

  // department/save
  @Post('save')
  save(@Body() body: CreateDepartmentDto) {
    return this.service.create(body);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateDepartmentDto) {
    return this.service.update(+id, body);
  }
}
