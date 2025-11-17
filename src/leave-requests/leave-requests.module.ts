import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveRequest,LeaveRequestSchema } from './leave-request.schema';
import { LeaveRequestsController } from './leave-requests.controller';
import { LeaveRequestsService } from './leave-requests.service';
import { LeaveBalancesModule } from 'src/leave-balances/leave-balances.module';

@Module({
    imports: [MongooseModule.forFeature([{name: LeaveRequest.name, schema: LeaveRequestSchema}]), LeaveBalancesModule],
    controllers: [LeaveRequestsController],
    providers: [LeaveRequestsService],
    exports: [LeaveRequestsService],
})
export class LeaveRequestsModule {}