import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleGuard } from './feature/auth/guard/role.guard';
import { AuthService } from './feature/auth/auth.service';
import { UserService } from './feature/user/user.service';
import { ConfigService } from './share/module/config/config.service';
import * as winston from 'winston';
import {utilities as nestWinstonModuleUtilities, WinstonModule} from 'nest-winston';
import { LoggingInterceptor } from './share/interceptor/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, version } from '../package.json';
import { JwtAuthGuard } from './feature/auth/guard/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });

  const configService = app.get(ConfigService);

  // app.useLogger(
  //   WinstonModule.createLogger({
  //     transports: [
  //       new winston.transports.Console({
  //         format: winston.format.combine(
  //           winston.format.timestamp(),
  //           nestWinstonModuleUtilities.format.nestLike(),
  //         ),
  //       }),
  //       new winston.transports.File({
  //         filename: `logs/Application.log`,
  //         format: winston.format.combine(
  //           winston.format.timestamp(),
  //           winston.format.printf(
  //             ({ timestamp, level, message, trace, context }) =>
  //               `${timestamp};${level};${message}${trace ? `;${trace}` : ''}${
  //                 context ? `;${JSON.stringify(context)}` : ''
  //               }`,
  //           ),
  //         ),
  //       }),
  //     ],
  //     level: configService.get('LOG_LEVEL'),
  //   }),
  // );

  // app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector)),
    new RoleGuard(app.get(Reflector), app.get(UserService), app.get(AuthService)),
  );
  const docsOptions = new DocumentBuilder()
    .setTitle(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, docsOptions);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT'));
}
bootstrap();
