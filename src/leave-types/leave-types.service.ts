import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeaveType } from './leave-type.schema';

@Injectable()
export class LeaveTypesService {
  constructor(@InjectModel(LeaveType.name) private leaveTypeModel: Model<LeaveType>) {}

  async create(dto: any): Promise<LeaveType> {
    const created = new this.leaveTypeModel(dto);
    return created.save();
  }

  async findAll(): Promise<LeaveType[]> {
    return this.leaveTypeModel.find().exec();
  }

  async findById(id: string): Promise<LeaveType | null> {
    return this.leaveTypeModel.findById(id).exec();
  }

  async update(id: string, dto: any): Promise<LeaveType | null> {
    return this.leaveTypeModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<any> {
    return this.leaveTypeModel.findByIdAndDelete(id);
  }
}
