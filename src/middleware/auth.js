const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const usersService = require('@users').usersService;
const appConsts = require('@consts').app;
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password'
    },
    (username, password, done) => {
      // add user check
      const user = usersService.findByLogin(username)[0];
      const passwordsMatch = bcrypt.compareSync(password, user.passwordHash);
      if (passwordsMatch) {
        return done(null, user);
      } else {
        return done('Incorrect Username / Password');
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: req => {
        const token = req.headers['authorization'].split(' ')[1];
        return token;
      },
      secretOrKey: appConsts.JWT_SECRET
    },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
      }
      return done(null, jwtPayload);
    }
  )
);

const withAuth = () => passport.authenticate('jwt', { session: false });

const withRole = role => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === role) {
      next();
    } else {
      throw new Error('You have no permission to access this route');
    }
  };
};

module.exports = {
  withAuth,
  withRole
};
