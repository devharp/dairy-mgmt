import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMilkReportDto } from 'src/constants/dto/milk-report.dto';
import { MilkReport } from 'src/schema/milk-report/milk-report.schema';
// import { UpdateMilkReportDto } from './dto/update-milk-report.dto';

@Injectable()
export class MilkReportService {
  constructor(
    @InjectModel(MilkReport.name) private milkReportModel: Model<MilkReport>,
  ) {}

  create(createMilkReportDto: CreateMilkReportDto, filledBy: string) {
    return this.milkReportModel.create({ ...createMilkReportDto, filledBy });
  }

  findAll() {
    return `This action returns all milkReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} milkReport`;
  }

  // update(id: number, updateMilkReportDto: UpdateMilkReportDto) {
  //   return `This action updates a #${id} milkReport`;
  // }

  remove(id: number) {
    return `This action removes a #${id} milkReport`;
  }
}

