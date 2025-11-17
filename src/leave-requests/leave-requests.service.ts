import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LeaveRequest } from "./leave-request.schema";
import { LeaveBalancesService } from "../leave-balances/leave-balances.service";
import dayjs from "dayjs";

@Injectable()
export class LeaveRequestsService {
    constructor(
        @InjectModel(LeaveRequest.name) private readonly leaveRequestModel: Model<LeaveRequest>,
        private readonly leaveBalancesService: LeaveBalancesService,
    ) {}

    async createLeaveRequest(employeeId: string, data: any) {
        const newLeave = new this.leaveRequestModel({
            ...data,
            employee: employeeId,
            status: "pending",
            appliedAt: new Date(),
        });
        return newLeave.save();
    }

    async findAll() {
        return this.leaveRequestModel
            .find()
            .populate("employee", "fullName email")
            .populate("leaveType", "name")
            .exec();
    }

    async findByEmployee(employeeId: string) {
        return this.leaveRequestModel
            .find({ employee: employeeId })
            .populate("leaveType", "name")
            .exec();
    }

    async updateStatus(id: string, status: string) {
        const request = await this.leaveRequestModel
            .findByIdAndUpdate(id, { status }, { new: true })
            .populate("employee", "_id fullName email")
            .populate("leaveType", "_id name totalDays");

        if (!request) return null;

        if (status === "approved") {
            const daysUsed =
                dayjs(request.endDate).diff(dayjs(request.startDate), "day") + 1;

            const employeeId = request.employee?._id?.toString() || request.employee.toString();
            const leaveTypeId = request.leaveType?._id?.toString() || request.leaveType.toString();

            console.log("🧮 Deducting days:", { employeeId, leaveTypeId, daysUsed });
            await this.leaveBalancesService.updateBalance(employeeId, leaveTypeId, daysUsed);
        }

        return request;
    }
}
