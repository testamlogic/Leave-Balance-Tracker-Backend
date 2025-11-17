import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaveBalance,LeaveBalanceSchema } from "./leave-balance.schema";
import { LeaveBalancesService } from "./leave-balances.service";
import { LeaveBalancesController } from "./leave-balances.controller";

@Module({
    imports:[MongooseModule.forFeature([{name: LeaveBalance.name,schema: LeaveBalanceSchema}])],
    controllers:[LeaveBalancesController],
    providers:[LeaveBalancesService],
    exports:[LeaveBalancesService]
})
export class LeaveBalancesModule{}