const jwt = require('jsonwebtoken');

function generateaToken(user) {

    return jwt.sign({email:user.email, id:user._id}, process.env.EXPRESS_SESSION_SECRET);//email:registerUser.email,userid:registerUser._id ----jwt.sing({})----{}-me ham vo chij likhte hei jo cookie ke sath chipak ke aaye ya jaye
// process.env.JWT_KEY /config/keys.js se aa rahi hei

}
module.exports.generateaToken = generateaToken;