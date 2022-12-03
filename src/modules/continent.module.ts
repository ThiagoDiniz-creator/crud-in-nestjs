import { Module } from '@nestjs/common';
import { ContinentController } from '../controllers/continent.controller';
import { Continent } from '../models/domain/continent.entity';
import { ContinentService } from '../services/continent.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Continent])],
  providers: [ContinentService],
  controllers: [ContinentController],
})
export class ContinentModule {}
