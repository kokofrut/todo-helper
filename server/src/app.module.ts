import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { GroupModule } from './group/group.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { SubTask } from './subtask/subtask.model';
import { SubTaskModule } from './subtask/subtask.module';
import { Group } from './group/group.model';
import { SubTask } from './subtask/subtask.model';
import { Todo } from './todo/todo.model';
import { User } from './user/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'dumbo.db.elephantsql.com',
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      define: { timestamps: false },
      benchmark: true,
    }),
    SequelizeModule.forFeature([SubTask, User, Todo, Group]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
    UserModule,
    TodoModule,
    GroupModule,
    SubTaskModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}
