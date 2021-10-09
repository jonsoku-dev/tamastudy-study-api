import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean; // <-- local strategy 실행 트리거
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); // serializer 실행 트리거
    return result;
  }
}
