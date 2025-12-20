import { IStudent } from '../models/Student.js';
export declare const registerStudent: (naam: string, email: string, wachtwoord: string) => Promise<IStudent>;
export declare const loginStudent: (email: string, wachtwoordInvoer: string) => Promise<{
    student: import("mongoose").Document<unknown, {}, IStudent, {}, import("mongoose").DefaultSchemaOptions> & IStudent & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
    token: string;
}>;
export declare const saveQuestionnaireResults: (studentId: string, data: any) => Promise<(import("mongoose").Document<unknown, {}, IStudent, {}, import("mongoose").DefaultSchemaOptions> & IStudent & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}) | null>;
export declare const deleteQuestionnaireResults: (studentId: string) => Promise<(import("mongoose").Document<unknown, {}, IStudent, {}, import("mongoose").DefaultSchemaOptions> & IStudent & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}) | null>;
//# sourceMappingURL=authService.d.ts.map