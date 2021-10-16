import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserResponseDto } from '../users/dto/user.response.dto';
import { UserRole } from '../common/schemas/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return (
      request.isAuthenticated() &&
      (request.user as UserResponseDto).role === UserRole.Admin
    );
  }
}
