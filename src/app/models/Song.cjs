const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const Song = new Schema(
    {
        _id: {type: Number},
        name: { type: String, required: true },
        singer: { type: String },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Song.plugin(AutoIncrement);
Song.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

mongoose.set('strictQuery', true);

module.exports = mongoose.model('Song', Song);
