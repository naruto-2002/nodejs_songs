import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/music_dev');
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failed');
    }
}

export default { connect };
