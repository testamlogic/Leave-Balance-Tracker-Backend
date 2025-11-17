import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveType, LeaveTypeSchema } from './leave-type.schema';
import { LeaveTypesController } from './leave-types.controller';
import { LeaveTypesService } from './leave-types.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: LeaveType.name, schema: LeaveTypeSchema }])],
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService],
  exports: [LeaveTypesService],
})
export class LeaveTypesModule {}
