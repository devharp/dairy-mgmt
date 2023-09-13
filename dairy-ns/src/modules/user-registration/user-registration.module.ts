import { Module } from '@nestjs/common';
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationService } from './user-registration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/users/user.schema';
import {
  UserDairyFarmer,
  UserDairyFarmerSchema,
} from 'src/schema/users/dairy-farmer.user.schema';
import {
  UserDairyInspector,
  UserDairyInspectorSchema,
} from 'src/schema/users/dairy-inspector.user.schema';

@Module({
  imports: [
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
  ],
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService],
})
export class UserRegistrationModule {}
