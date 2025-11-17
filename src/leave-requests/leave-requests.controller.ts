import { Controller, Get, Body, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { LeaveRequestsService } from "./leave-requests.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/common/gaurds/roles.guard";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("leave-requests")
export class LeaveRequestsController {
    constructor(private readonly leaveRequestsService: LeaveRequestsService) { }

    @Roles("employee", "admin")
    @Post("/apply")
    async createLeave(@Body() body: any, @Req() req: any) {
        const userId = req.user.sub;
        return this.leaveRequestsService.createLeaveRequest(userId, body);
    }

    // Admin - Get all leave requests
    @Roles("admin")
    @Get()
    async getAllLeaveRequests() {
        return this.leaveRequestsService.findAll();
    }

    // Employee - Views their own leave requests
    @Roles("employee", "admin")
    @Get("employee/me")
    async getMyLeaveRequests(@Req() req: any) {
        const userId = req.user?.sub;
        console.log("Employee ID:", userId);
        return this.leaveRequestsService.findByEmployee(userId);
    }


    //Admin - Update leave request status
    @Roles("admin")
    @Patch(":id/status")
    async updateLeaveRequestStatus(
        @Param("id") id: string,
        @Body("status") status: string) {
        return this.leaveRequestsService.updateStatus(id, status);
    }
}