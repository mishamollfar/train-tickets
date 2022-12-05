export * from './auth.service';
import { AuthService } from './auth.service';
export * from './checks.service';
import { ChecksService } from './checks.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [AuthService, ChecksService, DefaultService, UsersService];
