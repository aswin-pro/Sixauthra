import { IsString, IsNotEmpty, IsOptional, IsIn, Matches } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'Username can only contain alphabets and spaces',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @Matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    { message: 'Invalid email format' }
  )
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, {
    message:
      'Password must be 6-10 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsString()
  @IsIn(['Admin', 'User'], { message: 'Role must be either Admin or User' })
  @IsNotEmpty({ message: 'Role is required' })
  role: string;
}
