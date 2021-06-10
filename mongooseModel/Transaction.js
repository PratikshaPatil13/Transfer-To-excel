var schema = new Schema({
    fromUser:{
        type:Schema.Types.ObjectId,
        ref:"Member"
    },
    toUser:{
        type:Schema.Types.ObjectId,
        ref:"Member"
    },
    amount:{
        type:Number
    },
    transactionType:{
        type:String,
        enum:["Credit","Debit"],
        default:"Credit"
    },
    type:{
        type: String
    },
    Comments:{
        type:String
    }
})
export default mongoose.model("Transactions", schema)