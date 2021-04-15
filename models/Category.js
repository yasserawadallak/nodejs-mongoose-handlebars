const moongose = require('mongoose'); 
const Schema = moongose.Schema; 

const Category = new Schema({ 
    name: { 
        type: String,
        require: true 
    },
    slug: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

moongose.model('category', Category)
