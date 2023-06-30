import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { DepartmentModule } from './resources/department/department.module';
import { RoleModule } from './resources/role/role.module';
import { UserRoleModule } from './resources/user_role/user_role.module';
import { HttpInterceptor } from './interceptors/http.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mes',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    DepartmentModule,
    RoleModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: HttpInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
