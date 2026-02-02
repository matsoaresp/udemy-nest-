import { Global, Module } from "@nestjs/common";
import { HashingServiceProtocol } from "./hashing/hashing.service";
import { BcrypyService } from "./hashing/bcrypt.service";

@Global()
@Module({
    providers: [
        {
            provide: HashingServiceProtocol,
            useClass: BcrypyService,
        },
    ],
    exports: [HashingServiceProtocol]
})
export class AuthModule {

}