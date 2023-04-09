import mongoose, { Schema, model } from 'mongoose';
import * as crypto from 'crypto';

const AutoIncrement = require('mongoose-sequence')(mongoose);

interface INote {
    user: Schema.Types.ObjectId;
    title: string;
    text: string;
    ticket: string;
    completed: boolean;
}


function getRandomInt(): number {
    const randomBytes = new Uint32Array(1);
    crypto.randomFillSync(randomBytes);
    return randomBytes[0] % 10000000;
}

// Generate a random 7-digit number
const randomNum = getRandomInt().toString().padStart(7, '0');


const noteSchema = new Schema<INote>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    ticket: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// noteSchema.plugin(AutoIncrement, {
//     inc_field: 'ticket',
//     id: 'ticketNums',
//     start_seq: 500,
// });
noteSchema.pre('save', async function () {
    this.ticket = randomNum
})

const Note = model<INote>('Note', noteSchema);

export default Note;