import { IsDefined, IsString } from 'class-validator';

export class RoleDto {
    @IsDefined()
    @IsString()
    roleName!: string;

    @IsDefined()
    @IsString()
    roleText!: string;
}
