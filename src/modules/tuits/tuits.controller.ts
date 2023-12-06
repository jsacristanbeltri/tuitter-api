import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Express, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

import { PaginationQueryDto } from './dto/pagination-query.dto';
import { TuitsService } from './tuits.service';
import { Tuit } from 'src/modules/tuits/entities/tuit.entity';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { JwtAuthGuard } from 'src/auth/Utils/jwt.auth.guard';

@Controller('tuits')
export class TuitsController {

    constructor(private readonly tuitService: TuitsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getTuits3(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> {
        return this.tuitService.getAllTuits(pagination);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getTuit(@Param('id') id: number): Promise<Tuit> {
        return this.tuitService.getTuit(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        }),
    }))
    createTuit(
        @UploadedFile() file: Express.Multer.File,
        @Body() createTuitDto: CreateTuitDto): Promise<Tuit> {
            return this.tuitService.createTuit(createTuitDto);
    }

    @Get('/getFiles/:fileName')
    @UseGuards(JwtAuthGuard)
    async getFiles(@Res() res: Response, @Param('fileName') fileName: string) {
        res.sendFile(path.join(__dirname , "../../../uploads/" + fileName));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    updateTuit(@Param('id') id: number, @Body() tuit: UpdateTuitDto): Promise<Tuit> {
        return this.tuitService.updateTuit(id, tuit);
    }
    
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteTuit(@Param('id') id: number): Promise<void> {
        return this.tuitService.deleteTuit(id);
    }

    @Post('/:id/like')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    likeTuit(@Param('id') id: number, @Req() request): Promise<any> {
        return this.tuitService.addLike(id, request);
    }


    
    
}
