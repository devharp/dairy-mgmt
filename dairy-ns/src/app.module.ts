import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRegistrationModule } from './modules/user-registration/user-registration.module';
import { UserLoginModule } from './modules/user-login/user-login.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from './schema/users/user.schema';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import {
  UserDairyFarmer,
  UserDairyFarmerSchema,
} from './schema/users/dairy-farmer.user.schema';
import {
  UserDairyInspector,
  UserDairyInspectorSchema,
} from './schema/users/dairy-inspector.user.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // <-- path to the static files
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your_secret_key_here',
      signOptions: { expiresIn: '1d' }, // Token expiration time
    }),
    MongooseModule.forRoot('mongodb://localhost/milk-mgmt'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserDairyFarmer.name,
        schema: UserDairyFarmerSchema,
      },
      {
        name: UserDairyInspector.name,
        schema: UserDairyInspectorSchema,
      },
    ]),
    UserRegistrationModule,
    UserLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
