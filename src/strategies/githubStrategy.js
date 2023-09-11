const GitHubStrategy = require("passport-github2");
const userModel = require("../routes/Models/userModel");

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: "Iv1.50fdb5e0d08c1c05",
    clientSecret: "3760f1e9cb90ef98df5713376ad536ee352b39f1",
    callbackURL: "http://localhost:8080/api/sessions/github-callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userModel.findOne({ email: profile._json.login });
      if (user) {
        return done(null, user);
      }

      const newUser = await userModel.create({
        email: profile._json.login,
        name: profile._json.name,
        createDate: profile._json.created_at,
      });
      return done(null, newUser);
    } catch (e) {
      return done(e);
    }
  }
);

module.exports = gitHubStrategy;
