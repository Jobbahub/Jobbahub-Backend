export declare class ModuleService {
    private moduleRepository;
    getAllModules(): Promise<(import("mongoose").Document<unknown, {}, {
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        content?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        learningoutcomes?: string | null;
        estimated_difficulty?: string | null;
        available_spots?: number | null;
        tags_list?: string | null;
        start_date?: NativeDate | null;
        main_filter?: string | null;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        content?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        learningoutcomes?: string | null;
        estimated_difficulty?: string | null;
        available_spots?: number | null;
        tags_list?: string | null;
        start_date?: NativeDate | null;
        main_filter?: string | null;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
    getModuleById(id: number): Promise<import("mongoose").Document<unknown, {}, {
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        content?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        learningoutcomes?: string | null;
        estimated_difficulty?: string | null;
        available_spots?: number | null;
        tags_list?: string | null;
        start_date?: NativeDate | null;
        main_filter?: string | null;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        content?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        learningoutcomes?: string | null;
        estimated_difficulty?: string | null;
        available_spots?: number | null;
        tags_list?: string | null;
        start_date?: NativeDate | null;
        main_filter?: string | null;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getModulesByIds(ids: number[]): Promise<(import("mongoose").Document<unknown, {}, {
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        content?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        learningoutcomes?: string | null;
        estimated_difficulty?: string | null;
        available_spots?: number | null;
        tags_list?: string | null;
        start_date?: NativeDate | null;
        main_filter?: string | null;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        content?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        learningoutcomes?: string | null;
        estimated_difficulty?: string | null;
        available_spots?: number | null;
        tags_list?: string | null;
        start_date?: NativeDate | null;
        main_filter?: string | null;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
}
//# sourceMappingURL=moduleService.d.ts.map