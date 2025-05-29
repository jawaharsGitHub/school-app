// import { BackendMethod, remult, RemultContext, Remult, Allow } from 'remult';
// import { UserInfo } from '../Entities/UserInfo';

// export class AuthController {

//   @BackendMethod({ allowed: true })
//   static async register(data: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//   }): Promise<{ message: string }> {
//     const userRepo = remult.repo(UserInfo);

//     if (await userRepo.findFirst({ email: data.email }))
//       throw Error('Email already registered');

//     const user = await userRepo.save(data);

//     return { message: 'User registered' };
//   }

//   @BackendMethod({ allowed: true, apiPrefix: 'auth' })
//   static async login(
//     data: { email: string; password: string }
//   ): Promise<UserInfo | undefined> {
//     const taskRepo = remult.repo(UserInfo);

//     try {
//       const student = await taskRepo.findFirst({
//         email: data.email,
//         password: data.password, // ⚠️ You should hash/compare in real apps
//       });
//       return student;
//     } catch (error: any) {
//       console.error('Error searching for student:', error);
//       throw new Error(
//         `Failed to search for student: ${error.message || 'Unknown error'}`
//       );
//     }
//   }
  

//   @BackendMethod({ allowed: Allow.authenticated })
//   static async logout(remult?: Remult): Promise<void> {
//     // In a real application, this might involve clearing session data
//     // For Remult, simply returning nothing or handling on the client side is sufficient
//     // as the client will clear its token.
//     console.log(`User ${remult?.user?.name} logged out.`);
//   }
// }
