import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Request,
  UnauthorizedException,
  Catch,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { compareSync, hashSync } from 'bcrypt';

@ApiTags('Authentication')
@Controller('auth')
@Catch(HttpException)
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Registers a new user account' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiBadRequestResponse({
    description: 'Unexpected error occurred while registering a user',
  })
  @Post('register')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const hashedPassword = hashSync(password, 10);
    const createdUser = await this.authService
      .getUserService()
      .create({ username, password: hashedPassword });
    if (createdUser) {
      return 'User registered successfully';
    }
    throw new BadRequestException(
      'Unexpected error occurred while registering a user',
    );
  }

  @ApiOperation({ summary: 'Logs in an existing user account' })
  @ApiResponse({
    status: 200,
    description: 'Access token returned successfully',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    if (!username || !password) {
      throw new BadRequestException('Missing username or password')
    }
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @ApiOperation({
    summary:
      'Deletes the access token for the current session and logs out the user',
  })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully!',
    type: String,
  })
  @Post('logout')
  async logout() {
    return 'Logged out successfully!';
  }

  @ApiOperation({
    summary: 'Generates a new access token from a refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'New access token generated successfully',
    schema: { properties: { accessToken: { type: 'string' } } },
  })
  @ApiUnauthorizedResponse({ description: 'Authentication token missing' })
  @Post('refresh-access-token')
  async refreshToken(@Request() req) {
    const currentToken = req.headers.authorization;
    if (!currentToken)
      throw new UnauthorizedException('Authentication token missing');
    const { accessToken } = await this.authService.refreshAccessToken(
      currentToken.replace(/Bearer /g, '').trim(),
    );
    return { accessToken };
  }

  @Get('/usernames')
  @ApiOperation({
    summary: 'Retrieves all usernames',
    description:
      'Returns an array of all usernames currently registered in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'Array of usernames returned successfully',
    isArray: true,
    type: String,
  })
  async getAllUsernames() {
    try {
      const usernames = await this.authService.findAllUsernames();
      return { data: usernames };
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve usernames: ${error.message}`,
        500,
      );
    }
  }

}
