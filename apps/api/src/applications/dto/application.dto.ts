import { ApiProperty } from "@nestjs/swagger";

export class ApplicationDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    // @IsEmail()
    @ApiProperty({
        format: 'email',
    })
    email: string;

    // @IsPhoneNumber()
    @ApiProperty({
        format: 'phone',
        example: '+14155552671',
    })
    phone: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
    })
    file: Express.Multer.File;


}