import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

// dto - класс описывающий принимаемые данные в body. + r fdnjvfnbpfwbb cdfuthhf gjnjv
// HttpCode - выставляенм код, ибо по умолчания у поста 201 а это не верно к логину.
// @Body() - Извлекает весь объект body из объекта req и заполняет декорированный параметр значением body.

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() dto: AuthDto) {
    //
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    //
  }
}
