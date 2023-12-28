import { IsEmail, IsNotEmpty, Length } from "class-validator";



export class CreateUserDto {
@IsNotEmpty()
@IsEmail()
email:string

@IsNotEmpty({message:"password empty hunuhudaina"})
@Length(6,15)
password:string

}
