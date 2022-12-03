import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ContinentModule } from './modules/continent.module';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Continent } from './models/domain/continent.entity';
import { Country } from './models/domain/country.entity';
import { ConfigModule } from '@nestjs/config';
import { CountryModule } from './modules/country.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number.parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: 'world',
      entities: [Continent, Country],
      synchronize: true,
    }),
    ContinentModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
