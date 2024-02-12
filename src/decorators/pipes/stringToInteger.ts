import { PipeTransform } from '@nestjs/common';

export class StringToInteger implements PipeTransform {
  transform(value: any) {
    for (const key in value) {
      value[key] = Number(value[key]);
    }

    return value;
  }
}
