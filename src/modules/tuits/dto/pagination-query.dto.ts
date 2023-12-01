import { IsNumber, IsOptional, isPositive, ValidationOptions } from "class-validator";

export class PaginationQueryDto {
    @IsNumber({}, { message: 'Limit must be a number' })
    //@isPositive()
    @IsOptional()
    limit: number;

    @IsNumber({}, { message: 'Offset must be a number' })
    //@isPositive()
    @IsOptional()
    offset: number;
}


