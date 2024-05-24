import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'default_image_url_if_needed',
    },
    astrologerIds: [{
        astrologerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Astrologer',
            required: true,
        },
        notificationRead: {
            type: Boolean,
            default: false,
        },
    }],

    sentAt: {
        type: Date,
        default: Date.now,
    },
});

const AstrologerNotification = mongoose.model('AstrologerNotification', notificationSchema);

export default AstrologerNotification;
