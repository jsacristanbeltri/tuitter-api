import { Module } from '@nestjs/common';
import { DataBaseProvider } from './database.provider';

@Module({
    imports: [DataBaseProvider],
    exports: [DataBaseProvider]
})
export class DatabaseModule {}
