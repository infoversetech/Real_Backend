import { hashSync, genSaltSync } from 'bcryptjs';
import { prisma } from '../src/db';
import { Config } from '../src/config';
import { masterNames } from '../src/constants/property';
const { PROPERTY_FOR, PROPERTY_TYPE_AGRICULTURE, PROPERTY_TYPE_COMMERCIAL, PROPERTY_TYPE_RESIDENTIAL } = masterNames;

async function main() {
    await prisma.admin.create({
        data: {
            firstName: 'Infoverse',
            lastName: 'Admin',
            email: 'admin@infoverse.com',
            password: hashSync('password321', genSaltSync(Config.salt.rounds)),
            mobile: '9999900000'
        }
    });

    await prisma.master.createMany({
        data: [
            {
                name: PROPERTY_FOR,
                options: [
                    { key: 'Sale', value: 'Sale' },
                    { key: 'Rent/Lease', value: 'Rent/Lease' },
                    { key: 'Pg/Hostel', value: 'Pg/Hostel' },
                    { key: 'Roommate', value: 'Roommate' }
                ]
            },
            {
                name: PROPERTY_TYPE_RESIDENTIAL,
                options: [
                    { key: 'Independent House', value: 'Independent House' },
                    { key: 'Villa', value: 'Villa' },
                    { key: 'Bunglow', value: 'Bunglow' },
                    { key: 'Builder Floor Apartment', value: 'Builder Floor Apartment' },
                    { key: 'PentHouse', value: 'PentHouse' },
                    { key: 'Studio Apartment', value: 'Studio Apartment' }
                ]
            },
            {
                name: PROPERTY_TYPE_COMMERCIAL,
                options: [
                    { key: 'Office Space', value: 'Office Space' },
                    { key: 'Shop', value: 'Shop' },
                    { key: 'Showroom', value: 'Showroom' },
                    { key: 'Warehouse/Godown', value: 'Warehouse/Godown' },
                    { key: 'Industrial Land', value: 'Industrial Land' },
                    { key: 'Industrial Building', value: 'Industrial Building' }
                ]
            },
            {
                name: PROPERTY_TYPE_AGRICULTURE,
                options: [
                    { key: 'Agriculture Land', value: 'Agriculture Land' },
                    { key: 'Farm House', value: 'Farm House' }
                ]
            }
        ]
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
