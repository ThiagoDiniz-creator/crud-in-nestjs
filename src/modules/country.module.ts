import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/models/domain/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [],
  controllers: [],
})
export class CountryModule {}
