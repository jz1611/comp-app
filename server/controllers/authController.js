const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res, next) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const foundUser = await db.select_user(username).catch(err => console.log(err));
    if (foundUser.length) {
      res.status(409).send('That username already exists.');
    } else {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds).then(salt => {
        bcrypt.hash(password, salt).then(hashedPassword => {
          db.create_user([username, hashedPassword]).then(user => {
            req.session.user = {
              username: user[0].username
            };
            res.status(200).send(req.session.user);
          });
        });
      });
    }
  },

  login: async (req, res, next) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const foundUser = await db.select_user(username).catch(err => console.log(err));
    if (!foundUser.length) {
      res.status(401).send('That username doesn\'t exist.');
    } else {
      const matchPasswords = await bcrypt.compare(password, foundUser[0].password).catch(err => console.log(err));
      if(matchPasswords) {
        req.session.user = {
          username: foundUser[0].username
        };
        res.status(200).send(req.session.user);
      } else {
        res.status(401).send('Incorrect password.');
      }
    }
  },

  logout: (req, res, next) => {
    req.session.destroy();
    res.sendStatus(200);
  }
}