import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  shortdescription: String,
  description: String,
  content: String,
  studycredit: Number,
  location: String,
  level: String,
  learningoutcomes: String,
  estimated_difficulty: String,
  available_spots: Number,
  tags_list: String,
  start_date: Date,
  main_filter: String,
  });

  const ModuleModel = mongoose.model('Module', ModuleSchema, 'KeuzemodulesOpgeschoond');

  export default ModuleModel;