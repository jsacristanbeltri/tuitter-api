import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Express, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

import { PaginationQueryDto } from './dto/pagination-query.dto';
import { TuitsService } from './tuits.service';
import { Tuit } from 'src/modules/tuits/entities/tuit.entity';
import { CreateTuitDto, UpdateTuitDto } from './dto';

@Controller('tuits')
export class TuitsController {

    constructor(private readonly tuitService: TuitsService) {}

    //parametros query
    @Get()
    getTuits3(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> {
        return this.tuitService.getAllTuits(pagination);
    }
    
    /*@Get()
    getTuits(): Promise<Tuit[]> {
        return this.tuitService.getAllTuits(pagination);
    }*/

    @Get(':id')
    getTuit(@Param('id') id: number): Promise<Tuit> {
        return this.tuitService.getTuit(id);
    }

    @Post()
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

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        }),
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return "success";
    }

    @Get('/getFiles/:fileName')
    async getFiles(@Res() res: Response, @Param('fileName') fileName: string) {
        res.sendFile(path.join(__dirname , "../../../uploads/" + fileName));
    }

    @Patch(':id')
    updateTuit(@Param('id') id: number, @Body() tuit: UpdateTuitDto): Promise<Tuit> {
        return this.tuitService.updateTuit(id, tuit);
    }
    
    @Delete(':id')
    deleteTuit(@Param('id') id: number): Promise<void> {
        return this.tuitService.deleteTuit(id);
    }

    
    
}
