import 'dotenv/config';
import mongoose from 'mongoose';
import ModuleModel from '../models/module.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables.');
    process.exit(1);
}

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('✅ Connected to MongoDB for seeding');

        const count = 2000;
        const modules = [];

        console.log(`Generating ${count} modules...`);

        for (let i = 1; i <= count; i++) {
            modules.push({
                id: 10000 + i, // High ID to avoid collision
                name: `Load Test Module ${i}`,
                shortdescription: `Short description for module ${i}`,
                description: `Full description for load test module ${i}. This is used to test performance.`,
                content: `Content for module ${i}`,
                studycredit: Math.floor(Math.random() * 10) + 1,
                location: 'Utrecht',
                level: 'HBO',
                learningoutcomes: `Learning outcome for ${i}`,
                estimated_difficulty: 'Medium',
                available_spots: 20,
                tags_list: 'test,load,module',
                start_date: new Date(),
                main_filter: 'Techniek'
            });
        }

        console.log('Inserting into database...');
        // Clear previous test data if any
        await ModuleModel.deleteMany({ tags_list: 'test,load,module' });

        await ModuleModel.insertMany(modules);
        console.log(`✅ Successfully seeded ${count} modules!`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seed();
