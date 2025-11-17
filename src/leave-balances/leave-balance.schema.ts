import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { User } from 'src/users/users.schema';
import { LeaveType } from 'src/leave-types/leave-type.schema';

@Schema({timestamps:true})
export class LeaveBalance extends Document {

    @Prop({type: Types.ObjectId, ref:User.name, required:true})
    employee : Types.ObjectId;

    @Prop({type: Types.ObjectId, ref:LeaveType.name, required:true})
    leaveType: Types.ObjectId;

    @Prop({required:true, default:0})
    totalDays : number;

    @Prop({required:true})
    remainingDays : number;
}

export const LeaveBalanceSchema = SchemaFactory.createForClass(LeaveBalance);