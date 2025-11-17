import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    fullName: string;

    @IsEmail()
    @Matches(/@amlogic\.com$/, {
        message: 'Registration is restricted to @amlogic.com email addresses.',
    })
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}