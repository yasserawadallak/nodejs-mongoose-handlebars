const moongose = require('mongoose'); 
const Schema = moongose.Schema; 

const Post = new Schema({
    title:{
        type: String,
        required: true

    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true, 
    },
    data:{
        type: Date,
        default: Date.now()
    }
})

moongose.model('post', Post)