import { DataSourceOptions } from 'typeorm';
import { TagEntity } from './tag/tag.entity';

const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'medclone',
  password: '2808',
  database: 'medclone',

  entities: [TagEntity],
  synchronize: true,
};

export default options;
