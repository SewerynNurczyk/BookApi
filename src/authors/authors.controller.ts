import { Controller, Get, Put, Body, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { NotFoundException } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateAuthorDTO } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) { }

    @Get('/')
    getAll() {
        return this.authorsService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const author = await this.authorsService.getById(id);
        if (!author) throw new NotFoundException('Author not found');
        return author;
    }

    @Put('/:id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() authorData: UpdateAuthorDTO,
    ) {
        if (!(await this.authorsService.getById(id)))
            throw new NotFoundException('Author not found');

        await this.authorsService.updateById(id, authorData);
        return { success: true };
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!(await this.authorsService.getById(id)))
            throw new NotFoundException('Author not found');
        await this.authorsService.deleteById(id);
        return { success: true };
    }
}