import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { Country } from './country/entities/country.entity';
import { CitizenModule } from './citizen/citizen.module';
import { Citizen } from './citizen/entities/citizen.entity';

@Module({
  imports: [
    // forRoot() in ConfigModule is used to import the variables inside .env
    ConfigModule.forRoot(),
    // forRoot() in TypeOrmModule is used to create a connection with the database.
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number.parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: 'voting_system',
      entities: [Country, Citizen],
      synchronize: true,
    }),
    CountryModule,
    CitizenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
