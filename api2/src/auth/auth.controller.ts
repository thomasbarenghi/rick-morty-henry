import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Logger,
  Session,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { SessionSchema, Session as SessionEs } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(SessionEs.name) private sessionEs: Model<SessionEs>,
  ) {
    this.logger = new Logger('LocalStrategy');
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Session() session): Promise<any> {
    const user = req.user;
    console.log('user', session, user);
    session.userId = user.userId;
    session.email = user.email;

    // Obtiene el ID de la sesión actual
    const sessionId = req.sessionID;

    return { User: user, SessionID: sessionId, msg: 'User logged in' };
  }

  @Post('/verify')
  async verify(@Body() body, @Res() res: Response): Promise<any> {
    const SessionID = body.SessionID;
    console.log('SessionID', SessionID);
    const session = await this.sessionEs.findOne({ _id: SessionID });
    if (session) {
      return res.status(200).json({ verified: true });
    } else {
      //devolvemos 401
      throw new UnauthorizedException();
    }
  }
}
