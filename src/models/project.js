import mongoose, {Schema } from  "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId; 

const projectSchema = new Schema({
    name: {
        type: String,
        minLength: 5,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    descShort: {
        type: String,
    },
    link: {
        type: Array,
        required: true,
    },
    tech: {
        type: ObjectId,
        ref: 'Category'
    }
}, {timestamps: true});

export default mongoose.model('Project', projectSchema);