import { Get,Body,Param,Post,Controller } from "@nestjs/common";
import { UserService } from "./users.services";

@Controller("users")
export class UserController{
    constructor(private readonly userService : UserService) {}

    //Create User for @admin or registrtration
    @Post()
    async createUser(@Body()dto:any) {
        return this.userService.create(dto);
    }

    // Get all users @adminonly
    @Get()
    async getAllUsers() {
        return this.userService.findAll();
    }

    //Get user by id
    @Get(":id")
    async getUserById(@Param("id") id:string) {
        return this.userService.findById(id);
    }
}