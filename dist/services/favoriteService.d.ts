export declare const getFavorites: (studentId: string) => Promise<any[]>;
export declare const addFavorite: (studentId: string, moduleId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/Student.js").IStudent, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Student.js").IStudent & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const removeFavorite: (studentId: string, moduleId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/Student.js").IStudent, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Student.js").IStudent & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=favoriteService.d.ts.map