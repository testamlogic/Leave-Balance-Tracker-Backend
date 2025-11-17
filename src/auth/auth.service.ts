import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UserService} from '../users/users.services';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LeaveBalancesService } from '../leave-balances/leave-balances.service';
import { LeaveTypesService } from '../leave-types/leave-types.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService : UserService,
        private jwtService : JwtService,
        private leaveBalancesService: LeaveBalancesService,
        private leaveTypesService: LeaveTypesService,
    ) {}

    async register(dto: RegisterDto) {
        const user = await this.usersService.create(dto);
        // Initialize Leave Balances for employee
        const leaveTypes = await this.leaveTypesService.findAll();
        await this.leaveBalancesService.initializeEmployee(String(user._id), leaveTypes);
        return {message: "User registered successfully", userId: user._id};
    }

    async login(dto: LoginDto) {
        const { email, password } = dto;
        const user = await this.usersService.findByEmail(email);
        if(!user) throw new UnauthorizedException("Invalid Email");

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) throw new UnauthorizedException("Invalid Password");

        const payload = {sub: user._id,role: user.role};
        const accessToken = this.jwtService.sign(payload, {expiresIn: "15m"});
        const refreshToken = this.jwtService.sign(payload, {expiresIn: "7d"});

        return {
            accessToken,
            refreshToken,
            user
        };
    }
}