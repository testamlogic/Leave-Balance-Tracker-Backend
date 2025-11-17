import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from "src/users/users.schema";
import { RegisterDto } from "src/auth/dto/register.dto";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(dto: RegisterDto): Promise<User> {
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = new this.userModel({...dto, passwordHash});
        return user.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({email})
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-passwordHash').exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).select('-passwordHash').exec();
    }
}