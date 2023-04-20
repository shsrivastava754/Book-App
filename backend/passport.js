const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const userServices = require("./services/user.services");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    // This function runs once the user is authenticated
    async function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);

      // First register the user in the Users collection
      const user = await userServices.findUserByUsername(
        profile.emails[0].value
      );

      // Define an object to save it in the local-storage folder
      let body = {
        name: profile.displayName,
        username: profile.emails[0].value,
        password: profile.emails[0].value,
        email: profile.emails[0].value,
        role: "User",
      };

      if (!user) {
        let newUser = userServices.registerUser(body);
      } else {
        // Set the item in the local-storage folder
        localStorage.setItem("user", JSON.stringify(body));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
