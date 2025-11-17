import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "../users/users.module";
import { LeaveBalancesModule } from "src/leave-balances/leave-balances.module";
import { LeaveTypesModule } from "src/leave-types/leave-types.module";


@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: process.env.JWT_SECRET_KEY || "supersecretkey",
        signOptions: { expiresIn: "15m" }
    }),
        UserModule,
        LeaveBalancesModule,
        LeaveTypesModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})

export class AuthModule { }