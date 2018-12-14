var mongoose= require('mongoose')
mongoose.Promise = global.Promise;

var ScheduleSchema = new mongoose.Schema(
    {
        service_id: {
            type:  mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'services',
        },
        card_id: {
            type:  mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'cards',
        },
        date: {
            type: Date,
            required: true,
        }
    }
)


ScheduleSchema.set('toJSON', { virtuals: true});

var Schedule= mongoose.model('schedule', ScheduleSchema)
module.exports ={
    Schedule
}

