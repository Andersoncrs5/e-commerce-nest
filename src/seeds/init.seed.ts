// npx ts-node src/seeds/init.seed.ts
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { randomInt } from 'crypto';
import { Category } from '../category/entities/category.entity';
import { NotImplementedException } from '@nestjs/common';
import { Favorite } from '../favorite/entity/favorite.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Address } from '../address/entities/address.entity';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [User, Product, Category, Favorite, Comment, Address],
});

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Product);
  const categoryRepository = AppDataSource.getRepository(Category);

  const passwordHash = await bcrypt.hash('12345678', 4);

  console.log('Begining seed.....');

  // Criar usuários ADM
  for (let i = 0; i < 15; i++) {
    const user = userRepository.create({
      name: 'adm',
      email: `adm${i}@email.com`,
      password: passwordHash,
      is_adm: true,
    });

    await userRepository.save(user);
  }

  for (let i = 0; i < 1000; i++) {
    const user = userRepository.create({
      name: 'user',
      email: `user${i}@email.com`,
      password: passwordHash,
    });

    await userRepository.save(user);
  }

  const adms = await userRepository.find({ where: { is_adm: true } });

  if (adms.length === 0) throw new NotImplementedException();

  const categories: Category[] = [];

  for (let i = 0; i < 15; i++) {
    const adm = adms[i % adms.length];

    const category = categoryRepository.create({
      name: `Category ${i}`,
      user: adm,
    });

    await categoryRepository.save(category);
    categories.push(category);
  }

  const users = await userRepository.find();

  for (let i = 0; i < 800; i++) {
    const user = users[randomInt(0, users.length)];
    const category = categories[randomInt(0, categories.length)];
    const lorem =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    const product = productRepository.create({
      name: `Product ${i}`,
      content: lorem,
      price: parseFloat(getRandomFloat(1.0, 99999.99).toFixed(2)),
      quantity: randomInt(1, 3000),
      unique_code: Math.floor(Math.random() * 1000000),
      image: 'https://via.placeholder.com/150',
      user,
      category,
    });

    await productRepository.save(product);
  }

  console.log('Seed concluída com sucesso');
  await AppDataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});