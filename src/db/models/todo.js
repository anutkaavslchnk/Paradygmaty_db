import { model, Schema } from "mongoose";

const todoSchema=new Schema({
    todo:{
        type:String,
        required:true,
    },

deadline:{
    type:Date,
    required:true
}
},
{
    timestamps: true,
    versionKey: false,
  },
)

export const ToDoCollection=model('todos', todoSchema)