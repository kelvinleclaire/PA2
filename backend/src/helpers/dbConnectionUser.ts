import mongoose = require('mongoose');
const macdpsUserSchema = require('../schema/macdpsUserSchema');
import IMacdpsUser from '../models/IMacdpsUser'

//database user connection
const dbConnUser = mongoose.createConnection(`mongodb+srv://admin:hZbn3ukvVxAAqZ7d@cluster0.jkxmh.mongodb.net/user?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true })
dbConnUser.on('error', console.error.bind(console, 'plan db connection error:'));
dbConnUser.once('open', function() {
  console.log('Connected to user Database');
});

//initialise schemas for dbConnUser
const macdpsuser = dbConnUser.model('macdpsuser', macdpsUserSchema);

export function reveiceAllUser(callback: Function){
    macdpsuser.find({}, (err:any, res:[IMacdpsUser]) => {
        if (err) return console.error(err);
        console.log(res);
        callback(res);
    })
}

/**
 * @param username
 * @param password password of the user
 * @param callback callback with 2 parameters:
 * Callback params: @param valid: shows if the user is valid @param role: returns the role of the user
 */
export function checkUserAndPassword(username: string, password: string, callback: Function){
    macdpsuser.find({username: username}, (err:any, res:[IMacdpsUser]) => {
        if (err) return console.error(err);
        if (res && res.length > 0 && res[0].password === password) callback (true, res[0].role)
        else callback(false);
    })
}
