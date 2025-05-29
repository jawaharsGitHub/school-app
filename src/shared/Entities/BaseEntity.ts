// src/app/entities/base-entity.ts
import { Fields } from 'remult';

export abstract class IdEntityBase  {
  @Fields.autoIncrement()
  id!: number;
}

export abstract class BaseEntity extends IdEntityBase {
  @Fields.createdAt({ includeInApi: true, allowApiUpdate: false })
  createdAt?: Date;

  @Fields.updatedAt({ includeInApi: true, allowApiUpdate: false })
  updatedAt?: Date;
}



