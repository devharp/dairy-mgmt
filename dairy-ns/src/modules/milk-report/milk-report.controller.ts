import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MilkReportService } from './milk-report.service';
import { CreateMilkReportDto } from 'src/constants/dto/milk-report.dto';
import { globalValidationPipe } from 'src/pipes/global-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
// import { UpdateMilkReportDto } from './dto/update-milk-report.dto';

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Controller('milk-report')
export class MilkReportController {
  constructor(private readonly milkReportService: MilkReportService) {}
  @Roles('dairy-inspector')
  @Post('entry')
  create(
    @Body(globalValidationPipe) createMilkReportDto: CreateMilkReportDto,
    @Request() req: any,
  ) {
    return this.milkReportService.create(createMilkReportDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.milkReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milkReportService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMilkReportDto: UpdateMilkReportDto) {
  //   return this.milkReportService.update(+id, updateMilkReportDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milkReportService.remove(+id);
  }
}

