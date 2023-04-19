const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const userServices = require('./services/userServices');
// const localStorage = require("localStorage");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile","email"],
        },
        async function(accessToken,refreshToken,profile,callback){
            callback(null,profile);
            const user = await userServices.findUserByUsername(profile.emails[0].value);
            let body = {
                name: profile.displayName,
                username: profile.emails[0].value,
                password: profile.emails[0].value,
                email: profile.emails[0].value,
                role: "User"
            };
            if(!user){
                let newUser = userServices.registerUser(body);
            } else {
                localStorage.setItem('user',JSON.stringify(body));
            }
        }
    )
);

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});