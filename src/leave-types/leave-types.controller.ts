import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { LeaveTypesService } from './leave-types.service';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('leave-types')
export class LeaveTypesController {
  constructor(private readonly leaveTypesService: LeaveTypesService) {}

  @Roles('admin')
  @Post()
  async create(@Body() dto: any) {
    return this.leaveTypesService.create(dto);
  }


  @Get()
  async getAll() {
    return this.leaveTypesService.findAll();
  }

  @Roles('admin')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.leaveTypesService.findById(id);
  }

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.leaveTypesService.update(id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.leaveTypesService.delete(id);
  }
}
