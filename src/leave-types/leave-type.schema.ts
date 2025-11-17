import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({timestamps:true})
export class LeaveType extends Document {
    @Prop({required:true, unique:true})
    name : string;

    @Prop()
    description : string;

    @Prop({required:true})
    totalDays : number;

    @Prop({default:true})
    isActive : boolean;
}

export const LeaveTypeSchema = SchemaFactory.createForClass(LeaveType)