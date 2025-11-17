import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./users.services";
import {UserController} from "./users.controller"
import { User, UserSchema } from "./users.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule{}