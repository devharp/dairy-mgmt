import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { CreateMilkReportDto } from 'src/constants/dto/milk-report.dto';
import { MilkReport } from 'src/schema/milk-report/milk-report.schema';
// import { UpdateMilkReportDto } from './dto/update-milk-report.dto';

@Injectable()
export class MilkReportService {
  constructor(
    @InjectModel(MilkReport.name)
    private milkReportModel: PaginateModel<MilkReport>,
  ) {}

  create(createMilkReportDto: CreateMilkReportDto, filledBy: string) {
    return this.milkReportModel.create({ ...createMilkReportDto, filledBy });
  }

  async findAll(
    of: string,
    byMe?: boolean,
    page: number = 1,
    perPage: number = 10,
    from?: string,
    to?: string,
    milkType?: string,
    isRejected?: boolean,
  ): Promise<PaginateResult<MilkReport>> {
    try {
      const query: any = byMe ? { filledBy: of } : {};
      if (from && to) {
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        query.date = {
          $gte: new Date(from).toISOString().split('T')[0],
          $lt: new Date(toDate).toISOString(),
        };
      }
      if (milkType) {
        query.milkType = milkType;
      }
      if (isRejected) {
        query.isRejected = isRejected;
      }
      const options = {
        sort: { createdAt: -1 },
        page: page,
        limit: perPage,
        populate: { path: 'filledBy', select: '-_id fullname' },
      };
      const reports = await this.milkReportModel.paginate(query, options);
      return reports.docs.length !== 0
        ? reports
        : Promise.reject(
            new HttpException('No reports found', HttpStatus.NOT_FOUND),
          );
    } catch (error) {
      throw new HttpException(
        'Failed to fetch milk reports',
        HttpStatus.NO_CONTENT,
      );
    }
  }

  findOne(id: string) {
    return this.milkReportModel.findById(id);
  }

  // update(id: number, updateMilkReportDto: UpdateMilkReportDto) {
  //   return `This action updates a #${id} milkReport`;
  // }

  remove(id: number) {
    return `This action removes a #${id} milkReport`;
  }
}

