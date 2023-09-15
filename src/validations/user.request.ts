import { IsDefined, IsEmail, IsString, IsNumber, MinLength } from 'class-validator';

export class UserDto {
    @IsDefined()
    @IsString()
    firstName!: string;

    @IsDefined()
    @IsString()
    lastName!: string;

    @IsDefined()
    @IsEmail()
    email!: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    password!: string;

    @IsDefined()
    @IsString()
    mobile!: string;

    @IsDefined()
    @IsNumber()
    roleId!: Number;
}
