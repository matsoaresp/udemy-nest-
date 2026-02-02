import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { Person } from "src/persons/entities/person.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HashingServiceProtocol } from "./hashing/hashing.service";
import type { ConfigType } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Person)
        private readonly pessoasRepository: Repository<Person>,
        private readonly hashingService: HashingServiceProtocol,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService
    ) { }
    async login(loginDto: LoginDto) {

        let passwordIsValid = false;
        
        
        const pessoa = await this.pessoasRepository.findOneBy({
            email: loginDto.email
        });

        if (!pessoa){
            throw new UnauthorizedException('Pessoa não existe.')
        }
            passwordIsValid = await this.hashingService.compare(
                loginDto.password,
                pessoa.passwordHash,
            );
        

        if(!passwordIsValid) {
            throw new UnauthorizedException('senha inválida')
        }

        const accessToken = await this.jwtService.signAsync(
            {
                sub: pessoa.id,
                email: pessoa.email
                
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.jwtTtl
            },
        );
        return {
            accessToken
        }
        }
    }