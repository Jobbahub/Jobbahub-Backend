import 'dotenv/config';
import mongoose from 'mongoose';
import ModuleModel from '../models/module.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables.');
    process.exit(1);
}

async function cleanup() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('✅ Connected to MongoDB for cleanup');

        console.log('Deleting test modules...');
        const result = await ModuleModel.deleteMany({ tags_list: 'test,load,module' });
        console.log(`✅ Successfully deleted ${result.deletedCount} test modules!`);

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

cleanup();
