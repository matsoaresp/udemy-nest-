import { Global, Module } from "@nestjs/common";
import { HashingServiceProtocol } from "./hashing/hashing.service";
import { BcrypyService } from "./hashing/bcrypt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "src/persons/entities/person.entity";
import {JwtModule, JwtService} from '@nestjs/jwt'
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Person]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
    controllers:
        [AuthController],
    providers: [
        {
            provide: HashingServiceProtocol,
            useClass: BcrypyService,
        },
        AuthService
    ],
    exports: [HashingServiceProtocol, JwtModule, ConfigModule]

})
export class AuthModule {

}