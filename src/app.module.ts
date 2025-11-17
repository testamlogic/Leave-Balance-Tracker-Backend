import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { ConfigModule} from '@nestjs/config';
import { LeaveTypesModule } from './leave-types/leave-types.module';
import { LeaveRequestsModule } from './leave-requests/leave-requests.module';
import { LeaveBalancesModule } from './leave-balances/leave-balances.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/leave-tracker'),
    AuthModule,
    UserModule,
    LeaveTypesModule,
    LeaveRequestsModule,
    LeaveBalancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
