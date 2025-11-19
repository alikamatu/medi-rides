import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    console.log('🔍 CurrentUser Decorator - Request user:', user);
    console.log('🔍 CurrentUser Decorator - Looking for data:', data);
    
    if (!user) {
      console.warn('⚠️ CurrentUser Decorator - No user found in request');
      return null;
    }
    
    // Handle different user object structures
    let result;
    if (data) {
      // Map 'sub' to 'id' since JWT payload uses 'sub' but user object has 'id'
      if (data === 'sub' && user.id) {
        result = user.id;
      } else {
        result = user[data];
      }
    } else {
      result = user;
    }
    
    console.log('🔍 CurrentUser Decorator - Result:', result);
    return result;
  },
);