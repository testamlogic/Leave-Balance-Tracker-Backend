import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { LeaveBalance } from "./leave-balance.schema";
import { AdjustLeaveBalanceDto } from "./leave-balances.controller";

@Injectable()
export class LeaveBalancesService {
  constructor(
    @InjectModel(LeaveBalance.name)
    private readonly leaveBalanceModel: Model<LeaveBalance>,
  ) {}

  async initializeEmployee(employeeId: string, leaveTypes: any[]) {
    const employeeObjectId = new Types.ObjectId(employeeId);

    const balances = leaveTypes.map(lt => ({
      employee: employeeObjectId,
      leaveType: new Types.ObjectId(lt._id),
      totalDays: lt.totalDays,
      remainingDays: lt.totalDays,
    }));

    return this.leaveBalanceModel.insertMany(balances);
  }

  async getEmployeeBalances(employeeId: string) {
    console.log("Fetching leave balances for employee:", employeeId);
    return this.leaveBalanceModel
      .find({ employee: new Types.ObjectId(employeeId) })
      .populate("leaveType", "name totalDays remainingDays")
      .exec();
  }

  async updateBalance(employeeId: string, leaveTypeId: string, daysUsed: number) {
    const balance = await this.leaveBalanceModel.findOne({
      employee: new Types.ObjectId(employeeId),
      leaveType: new Types.ObjectId(leaveTypeId),
    });

    if (!balance) {
      console.warn(
        `No balance record found for employee ${employeeId} and leave type ${leaveTypeId}`,
      );
      return null;
    }

    balance.remainingDays -= daysUsed;
    if (balance.remainingDays < 0) balance.remainingDays = 0;

    const updated = await balance.save();
    console.log(`Updated leave balance for ${employeeId}: -${daysUsed} days`);
    return updated;
  }

  async adjustEmployeeBalance(adjustLeaveBalanceDto: AdjustLeaveBalanceDto) {
    const { employeeId, leaveTypeId, adjustmentDays, action } = adjustLeaveBalanceDto;

    const leaveBalance = await this.leaveBalanceModel.findOne({
      employee: new Types.ObjectId(employeeId),
      leaveType: new Types.ObjectId(leaveTypeId),
    });

    if (!leaveBalance) {
      throw new NotFoundException(
        `Leave balance not found for employee ${employeeId} and leave type ${leaveTypeId}`,
      );
    }

    switch (action) {
      case 'add':
        leaveBalance.remainingDays += adjustmentDays;
        break;
      case 'subtract':
        leaveBalance.remainingDays -= adjustmentDays;
        break;
      case 'set':
        leaveBalance.remainingDays = adjustmentDays;
        break;
    }
    return leaveBalance.save();
  }
}
