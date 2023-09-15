import { IsDefined, IsBoolean } from 'class-validator';

export class PropertyChangeStatusDto {
    @IsDefined()
    @IsBoolean()
    isVerified!: boolean;
}
