const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require("../users/User.js");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: require("./keys.js").passport
};

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user => {
            if (user) return done(null, user);
            else return done(null, false)
            
        }).catch(err => console.log(err)
        )
    }))
}
