import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document,Types} from 'mongoose';
import { User } from 'src/users/users.schema';
import { LeaveType } from 'src/leave-types/leave-type.schema';

@Schema({timestamps:true})
export class LeaveRequest extends Document {
    @Prop({type: Types.ObjectId, ref:User.name, required:true})
    employee : Types.ObjectId;

    @Prop({type: Types.ObjectId, ref:LeaveType.name, required:true})
    leaveType : Types.ObjectId;

    @Prop({required:true})
    startDate : Date;

    @Prop({required:true})
    endDate : Date;

    @Prop({default:"pending", enum:["pending","approved","rejected"]})
    status : string;

    @Prop()
    reason : string;

    @Prop()
    appliedAt : Date;
}

export const LeaveRequestSchema = SchemaFactory.createForClass(LeaveRequest);

