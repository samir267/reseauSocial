import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { jwtConstants } from './utils/constants';
import { AuthGuard } from './utils/Guard/auth.guard';
import { GoogleStrategy } from './utils/Strategie/google.strategie';
import { FacebookStrategy } from './utils/Strategie/FacebookStrategy';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    GoogleStrategy,
    FacebookStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}