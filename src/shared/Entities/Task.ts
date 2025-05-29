
import { Allow, Entity, Fields, Validators } from 'remult';

@Entity('tasks', 
    {
        allowApiCrud: Allow.everyone,
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
}