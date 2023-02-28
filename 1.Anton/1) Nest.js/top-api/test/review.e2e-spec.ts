import { disconnect, Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title',
  rating: 4.5,
  description: 'Test description',
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Создаем запись
  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create') // Метод который используем и роут
      .send(testDto) // Данные которые передаем в body
      .expect(201) // Проверка код ответа
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined(); // Проверка возврата
      });
  });

  // Создаем запись
  // it('/review/create (POST) - fail', async () => {
  //   return request(app.getHttpServer())
  //     .post('/review/create') // Метод который используем и роут
  //     .send({ ...testDto, rating: 0 }) // Данные которые передаем в body
  //     .expect(400); // Проверка код ответа
  // });

  // Поиск записи и проверка что есть записи
  it('/review/byProduct/:productId (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + createdId) // Метод который используем и РОУТ
      .expect(200) // Проверка код ответа
      .then(({ body }: request.Response) => {
        console.log(body);

        expect(body.length).toBe(1);
      });
  });

  // Поиск записи
  it('/review/byProduct/:productId (GET) - fail', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString()) // Метод который используем и РОУТ
      .expect(200) // Проверка код ответа
      .then(({ body }: request.Response) => {
        console.log(body);
        expect(body.length).toBe(0);
      });
  });

  // Удаляем запись
  it('/review/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId) // Метод который используем и РОУТ
      .expect(200); // Проверка код ответа
  });

  // // Удаляем запись
  it('/review/:id (DELETE) - fail', async () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString()) // Метод который используем и РОУТ
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      }); // Проверка код ответа
  });

  // Отключаем базу данных после всех тестов
  afterAll(() => {
    disconnect();
  });
});
