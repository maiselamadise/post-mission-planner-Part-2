const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// Keep only what we need in the session cookie
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } = process.env;

if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET && GITHUB_CALLBACK_URL) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
      },
      (accessToken, refreshToken, profile, done) =>
        done(null, { id: profile.id, username: profile.username, displayName: profile.displayName })
    )
  );
} else {
  console.warn('GitHub OAuth env vars not set: /auth/login will return 503.');
}

module.exports = passport;
