export declare const addModuleToFavorites: (studentId: string, moduleId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/Student.js").IStudent, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Student.js").IStudent & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const removeModuleFromFavorites: (studentId: string, moduleId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/Student.js").IStudent, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Student.js").IStudent & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const getStudentWithFavorites: (studentId: string) => Promise<any[]>;
//# sourceMappingURL=favoriteService.d.ts.map