import { Controller, Get, Param, UseGuards, Req, Put, Body, ValidationPipe } from "@nestjs/common";
import { LeaveBalancesService } from "./leave-balances.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/common/gaurds/roles.guard";
import { Roles } from 'src/common/decorators/roles.decorator';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AdjustLeaveBalanceDto {
    @IsString()
    @IsNotEmpty()
    employeeId: string;

    @IsString()
    @IsNotEmpty()
    leaveTypeId: string;

    @IsNumber()
    @IsNotEmpty()
    adjustmentDays: number;

    @IsEnum(['add', 'subtract', 'set'])
    @IsNotEmpty()
    action: 'add' | 'subtract' | 'set';
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("leave-balances")
export class LeaveBalancesController {
    constructor(private readonly leaveBalancesService: LeaveBalancesService) { }

    // Employee can view their own leave balance
    @Roles('employee', 'admin')
    @Get("me")
    async getMyBalances(@Req() req: any) {
        const userId = req.user.sub;
        console.log("Fetching leave balances for user:", userId);
        return this.leaveBalancesService.getEmployeeBalances(userId);
    }

    // Admin can view any employee leave balance
    @Roles("admin")
    @Get("employee/admin/:id")
    async getEmployeeBalances(@Param("id") id: string) {
        return this.leaveBalancesService.getEmployeeBalances(id);
    }

    // Admin can adjust any employee's leave balance
    @Roles("admin")
    @Put("admin/adjust")
    async adjustEmployeeBalance(@Body(new ValidationPipe()) adjustLeaveBalanceDto: AdjustLeaveBalanceDto) {
        // This will call a service method that we will create in the next step
        return this.leaveBalancesService.adjustEmployeeBalance(adjustLeaveBalanceDto);
    }
}