
import { Entity, Fields } from 'remult';

@Entity('tasks', 
    {
        allowApiCrud: true
    }
)
export class task {
  @Fields.autoIncrement()
  id: number = 0;
  @Fields.string()  
  title: string = '';
  @Fields.boolean()
  completed: boolean = false;
}