import { BackendMethod, remult } from 'remult'
import { Student  } from '../../shared/entities/student';

export class StudentController {

    @BackendMethod({ allowed: true })
    static async searchStudentbyName1(studentName: string): Promise<Student[] | null> {
        // TODO: Implement logic to get student photo URL
        const taskRepo = remult.repo(Student);
        try {
            const students = await taskRepo.find({
                where: {
                    firstName: studentName
                }
            });
            return students;
        } catch (error: any) {
            console.error('Error searching for student:', error);
            throw new Error(`Failed to search for student: ${error.message || 'Unknown error'}`);
        }
        
    }
}