const mogoose = require('mongoose');
const schema = mogoose.Schema;

const taskSchema = new schema({
    tesk:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true
    }
});

const Task = mogoose.model('Task',taskSchema);
module.exports = Task;
