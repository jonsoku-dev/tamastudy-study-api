import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JoinRequestDto } from './dto/join.request.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { LoggedInGuard } from '../auth/logged-in.guard';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login.request.dto';
import { UserResponseDto } from './dto/user.response.dto';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: JoinRequestDto })
  @ApiResponse({
    status: 201,
    description: '회원가입 완료',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 409, description: '이미 가입된 이메일' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @Post('join')
  join(@Body() dto: JoinRequestDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({ status: 201, description: '로그인 완료' })
  @ApiResponse({ status: 403, description: '인증에러' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {
    return null;
  }

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '로그인 테스트' })
  @ApiResponse({ status: 200, description: '테스트 성공' })
  @ApiResponse({ status: 403, description: '테스트 실패' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @UseGuards(LoggedInGuard)
  @Get('test')
  test(@User() user) {
    return user;
  }

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  @ApiResponse({ status: 403, description: '로그아웃 실패' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '회원탈퇴' })
  @ApiResponse({ status: 200, description: '회원탈퇴 성공' })
  @ApiResponse({ status: 403, description: '회원탈퇴 실패' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @UseGuards(LoggedInGuard)
  @Post('signout')
  async signOut(@User() user: UserResponseDto, @Res() res) {
    await this.usersService.signOut(user.email);
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }
}
