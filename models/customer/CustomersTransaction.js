import mongoose from 'mongoose';

const TranactionsSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customers' 
    },
    status: {
        type: Number,
        default: 0 // (0=failed, 1=pending, 2=completed)
    },
    amount: {
        type: String
    },
    bank_account: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BankAccount' 
    },
    tnx_type: {
        type : Number // Corrected capitalization
    },
    reason : {
        type: String // Corrected capitalization
    },
    file: {
        type: String
    }
}, { collection: 'Tranactions', timestamps: true });

const Tranactions = mongoose.model('Tranactions', TranactionsSchema);

export default Tranactions;
