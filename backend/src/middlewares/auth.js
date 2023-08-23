require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// This function will get the password indicate by the new user and hash it with options above
const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// This function will get the hashedPassword of an user and compare it with the password write by the user. If ok, it generates a token
const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password, hashingOptions)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: "12h",
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.status(401).send({ message: "Wrong password" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// This function will verify if the token of a user is correct.
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
