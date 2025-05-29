import { Entity, Fields, EntityBase, BackendMethod, remult } from 'remult';
import * as bcrypt from 'bcryptjs'; // bcryptjs works in both Node.js and browser
import { BaseEntity } from './BaseEntity';

@Entity('user_info', {
  allowApiCrud: true, // disable public API CRUD for safety
})
export class UserInfo extends BaseEntity {
  @Fields.string()
  firstName = '';

  @Fields.string()
  lastName = '';

  @Fields.string({ allowNull: true, allowApiUpdate: false })
  email?: string;

  @Fields.string({ allowNull: true })
  phone?: string;

  @Fields.string({ allowNull: true })
  address?: string;

  @Fields.string({ allowNull: true })
  city?: string;

  @Fields.string({ allowNull: true })
  country?: string;

  @Fields.date({ allowNull: true })
  dateOfBirth?: Date;

  @Fields.string({ includeInApi: true,  allowApiUpdate: false })
  password = ''; // stored as a hashed string

  @Fields.boolean()
  isActive = true;

  // Optional helper method for checking passwords
  async checkPassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.password);
  }

  async $afterLoad() {
    this._originalPassword = this.password;
  }

  // Automatically hash password before saving if changed
  async $beforeInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  private _originalPassword?: string;

  async $beforeUpdate(): Promise<void> {
    // if (this.$isFieldChanged('password')) {
    //   this.password = await bcrypt.hash(this.password, 10);
    // }
    if (this.password !== this._originalPassword) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
