const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, required: true },
        slug: { type: String, slug: "name", unique: true },
        deleted: { type: Boolean, default: false },
    },
    {
        _id: false,
        timestamps: true,
    },
);

//Custom query helpers
CourseSchema.query.sortable = function (req) {

    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'asc',
        });
    }
    return this;
}

//Add plugins
CourseSchema.plugin(mongooseDelete,
    {
        deletedAt: true,
        overrideMethods: 'all',
    },
);
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Course', CourseSchema);
