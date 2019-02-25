const express = require('express');
const router  = express.Router();
const usersService = require('@users').usersService;
const withErrorHandling = require('@middleware').withErrorHandling;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const appConsts = require('@consts').app;
const rolesConsts = require('@consts').roles;

router.post('/register', withErrorHandling(async (req, res) => {
  const { login, password } = req.body;
  try {
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    usersService.saveUser({
      login: login,
      passwordHash: passwordHash,
      role: rolesConsts.USER
    });
    res.json({});
  } catch (err) {
    res.status(400).send({
      error: 'Reqtues body should take the form { login, password }',
    });
  }
}));

router.post('/login', (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, user) => {

      if (error || !user) {
        res.status(400).json({ error });
      }

      // This is what ends up in our JWT
      const payload = {
        username: user.login,
        id: user['$loki'],
        role: user.role,
        expires: Date.now() + parseInt(appConsts.JWT_EXPIRATION_MS),
      };

      // assigns payload to req.user
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({ error });
        }

        // generate a signed json web token and return it in the response
        const token = jwt.sign(JSON.stringify(payload), appConsts.JWT_SECRET);

        // assign our jwt to the cookie
        res.cookie('jwt', jwt, { httpOnly: true, secure: true });
        res.status(200).send({ token });
      });
    },
  )(req, res);
});

module.exports = router;
