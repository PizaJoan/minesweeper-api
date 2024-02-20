import { PipeTransform } from '@nestjs/common';

function transformObject(value: any) {
  if (typeof value === 'object') {
    for (const key in value) {
      value[key] = Number(value[key]);
    }
  } else {
    value = Number(value);
  }

  return value;
}

export class StringToInteger implements PipeTransform {
  transform(value: any) {
    for (const key in value) {
      if (Array.isArray(value[key])) {
        value[key] = value[key].map(transformObject);
      } else value[key] = transformObject(value[key]);
    }

    return value;
  }
}
