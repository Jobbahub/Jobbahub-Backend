export declare class ModuleService {
    private moduleRepository;
    getAllModules(): Promise<(import("mongoose").Document<unknown, {}, {
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        Rood?: number | null;
        Groen?: number | null;
        Blauw?: number | null;
        Geel?: number | null;
        module_tags?: string | null;
        start_date?: NativeDate | null;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        Rood?: number | null;
        Groen?: number | null;
        Blauw?: number | null;
        Geel?: number | null;
        module_tags?: string | null;
        start_date?: NativeDate | null;
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
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        Rood?: number | null;
        Groen?: number | null;
        Blauw?: number | null;
        Geel?: number | null;
        module_tags?: string | null;
        start_date?: NativeDate | null;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        Rood?: number | null;
        Groen?: number | null;
        Blauw?: number | null;
        Geel?: number | null;
        module_tags?: string | null;
        start_date?: NativeDate | null;
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
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        Rood?: number | null;
        Groen?: number | null;
        Blauw?: number | null;
        Geel?: number | null;
        module_tags?: string | null;
        start_date?: NativeDate | null;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        id?: number | null;
        name?: string | null;
        shortdescription?: string | null;
        description?: string | null;
        studycredit?: number | null;
        location?: string | null;
        level?: string | null;
        Rood?: number | null;
        Groen?: number | null;
        Blauw?: number | null;
        Geel?: number | null;
        module_tags?: string | null;
        start_date?: NativeDate | null;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
}
//# sourceMappingURL=moduleService.d.ts.map