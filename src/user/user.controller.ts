import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  @HttpCode(HttpStatus.OK)
  async login(@Body() login: LoginUserDto) {
    return await this.userService.login(login);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req : any) {
    return await this.userService.findOne(req.user.sub);
  }

  @Patch('')
  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Req() req : any, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(req.user.sub, updateUserDto);
  }

  @Delete('')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req : any) {
    return await this.userService.remove(req.user.sub);
  }
}
