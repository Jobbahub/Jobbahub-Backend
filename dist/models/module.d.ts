import { Document } from 'mongoose';
export interface IModule extends Document {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    content: string;
    studycredit: number;
    location: string;
    contact_id: number;
    level: string;
    learningOutcomes: string;
    module_tags: string[];
    interests_match_score: number;
    popularity_score: number;
    estimated_difficulty: number;
    available_spots: number;
    start_date: Date;
}
declare const Module: import("mongoose").Model<IModule, {}, {}, {}, Document<unknown, {}, IModule, {}, import("mongoose").DefaultSchemaOptions> & IModule & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any, IModule>;
export default Module;
//# sourceMappingURL=module.d.ts.map