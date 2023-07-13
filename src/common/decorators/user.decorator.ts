import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IPayload } from '../interfaces/payload.interface';

export const DUser = createParamDecorator((data: keyof IPayload, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest<Request>().user;
  return data ? user?.[data] : user;
});
