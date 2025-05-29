
import { Allow, Entity, Fields, Validators } from 'remult';

@Entity('tasks', 
    {
        allowApiCrud: Allow.authenticated,
        allowApiRead: true,

    }
)
export class Task {
  @Fields.autoIncrement()
  id: number = 0;
  @Fields.string({
    validate : Validators.required()
  })  
  title: string = '';
  
  @Fields.boolean()
  completed: boolean = false;

   @Fields.createdAt()
    createdAt = new Date();

    @Fields.string({ allowApiUpdate: false })
    userId = '';
}