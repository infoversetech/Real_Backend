import { IsDefined, IsString, IsNumberString, IsBooleanString } from 'class-validator';

export class PropertyDto {
    @IsDefined()
    @IsString()
    location!: string;

    @IsDefined()
    @IsString()
    landmark!: string;

    @IsDefined()
    @IsString()
    pincode!: string;

    @IsDefined()
    @IsString()
    projectName!: string;

    @IsDefined()
    @IsString()
    propertyFor!: string;

    @IsDefined()
    @IsString()
    propertyType!: string;

    @IsDefined()
    @IsNumberString()
    bedroomCount!: string;

    @IsDefined()
    @IsNumberString()
    balconyCount!: string;

    @IsDefined()
    @IsNumberString()
    floorNumber!: string;

    @IsDefined()
    @IsNumberString()
    totalFloors!: string;

    @IsDefined()
    @IsBooleanString()
    furnishedStatus!: string;

    @IsDefined()
    @IsString()
    carpetArea!: string;

    @IsDefined()
    @IsString()
    superBuiltUpArea!: string;

    @IsDefined()
    @IsString()
    areaUnit!: string;

    @IsDefined()
    @IsString()
    transactionType!: string;

    @IsDefined()
    @IsString()
    possessionStatus!: string;

    @IsDefined()
    @IsString()
    possessionYear!: string;

    @IsDefined()
    @IsString()
    ageOfConstruction!: string;

    @IsDefined()
    @IsString()
    expectedPrice!: string;

    @IsDefined()
    @IsString()
    bookingAmount!: string;

    @IsDefined()
    @IsString()
    maintainanceCharges!: string;
}
