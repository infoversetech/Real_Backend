import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsDefined()
    @IsEmail()
    email!: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    password!: string;
}