import { IStudent } from '../models/Student.js';
export declare const registerStudent: (naam: string, wachtwoord: string) => Promise<IStudent>;
export declare const loginStudent: (naam: string, wachtwoord: string) => Promise<{
    student: import("mongoose").Document<unknown, {}, IStudent, {}, import("mongoose").DefaultSchemaOptions> & IStudent & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
    token: string;
}>;
//# sourceMappingURL=authService.d.ts.map