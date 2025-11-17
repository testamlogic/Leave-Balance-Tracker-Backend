import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type UserDocument  = User & Document;

@Schema({timestamps:true})
export class User extends Document{
    @Prop({required:true})
    fullName : string;

    @Prop({required:true, unique:true})
    email : string;

    @Prop({required:true})
    passwordHash : string;

    @Prop({type: String,enum:["admin","manager","employee"], default:"employee"})
    role : string;

    @Prop({type: Types.ObjectId, ref:"User", default:null})
    managerId : Types.ObjectId | null;

    @Prop({default:true})
    isActive : boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);