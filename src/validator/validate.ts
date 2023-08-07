import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';

export async function validateObject(object): Promise<boolean> {
  const errors = await validate(object);

  if (errors.length > 0)
    throw new HttpException(
      { message: 'Failed validating data', errors },
      HttpStatus.BAD_REQUEST,
    );
  return true;
}
