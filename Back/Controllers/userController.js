const userModel = require("../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

var crypt = {
  secret: `+j&l$?/t{/8?xZk:E~<}&%w>&yT%I!gg&/SVe,;=aqT4&<y?}c#CWrXbEsc!t=xg|T(dNsU".$V)+h$0XzC0=z/Ye$Ap+%>cn,W`,
};

const encryption = (password) => {
  var password_input = CryptoJS.AES.encrypt(password, crypt.secret);
  password_input = password_input.toString();
  return password_input;
};

const decryptage = (password_user) => {
  password_user = CryptoJS.AES.decrypt(password_user, crypt.secret);
  password_user = password_user.toString(CryptoJS.enc.Utf8);
  return password_user;
};

const CreateAccount = (userData) => {
  userData
    .save()
    .then((createUser) => {
      console.log(createUser);
      return createUser;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

exports.Testpost = (req, res) => {
  // const user = new user({name: req.body.name,});
  const user = new userModel(req.body);
  console.log("Test1");
  user
    .save()
    .then((createUser) => {
      return res.status(201).json(createUser);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

exports.userCreator = (req, res) => {
  let userData = new userModel(req.body);
  const pseudo = req.body.pseudo;
  const email = req.body.email;
  const password = req.body.password;
  const jordan = req.body.jordan;

  if ((jordan != "undefined" && jordan != "true") || jordan == "false")
    userData.status = "Admin";
  else userData.status = "Jordan";

  console.log(
    "pseudo : " + pseudo + " email : " + email + " password : " + password
  );

  const encryption = (password) => {
    var password_input = CryptoJS.AES.encrypt(password, crypt.secret);
    password_input = password_input.toString();
    return password_input;
  };
};

exports.test = (req, res) => {
  // Le test pour créer le register pour admin
  var userData = new userModel(req.body);

  console.log("C'est moi");

  userModel
    .findOne({ pseudo: userData.pseudo })
    .then((user) => {
      if (user.pseudo === userData.pseudo) {
        console.log(
          `Ton Pseudo est déjà Use : ${user.pseudo} et ${userData.pseudo}`
        );
        return res
          .status(500)
          .json("Et non déja un User avec le meme Pseudo pas de chance");
      } else {
        console.log(
          `Ton Pseudo est déjà Use : ${user.pseudo} et ${userData.pseudo}`
        );
        userModel
          .findOne({ email: userData.email })
          .then((user) => {
            if (user === null) {
              userData.password = encryption(userData.password);

              const statusReqCreateUser = CreateAccount(userData);
              if (statusReqCreateUser == userData)
                console.log("Creation Réussit");

              return res
                .status(201)
                .json("Le compte à était créer avec succées");
            }

            return res
              .status(500)
              .json("Il existe déjà un compte avec cette adress mail");
          })
          .catch((err) => {
            userData.password = encryption(userData.password);

            console.log(err);
            // Ici l'adress est déja verif plus qu'a creer le compte
            return res
              .status(500)
              .json(
                "OUF CA BUG TRUC DE OUF mais dit a théo le code d'erreur : THEO-001 - mais ca marche :/"
              );
          });
      }
    })
    .catch((err) => {
      console.log(`Ton Pseudo n'est pas Use : et ${userData.pseudo}`);
      userModel
        .findOne({ email: userData.email })
        .then((user) => {
          if (user === null) {
            userData.password = encryption(userData.password);

            const statusReqCreateUser = CreateAccount(userData);
            if (statusReqCreateUser == userData)
              console.log("Creation Réussit");

            return res.status(201).json("Le compte à était créer avec succées");
          }

          return res
            .status(500)
            .json("Il existe déjà un compte avec cette adress mail");
        })
        .catch((err) => {
          userData.password = encryption(userData.password);

          console.log(err);
          // Ici l'adress est déja verif plus qu'a creer le compte
          return res
            .status(500)
            .json(
              "OUF CA BUG TRUC DE OUF mais dit a théo le code d'erreur : THEO-001 - mais ca marche :/"
            );
        });
    });
};

exports.getAll = (req, res) => {
  userModel
    .find()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
};

exports.update = (req, res) => {
  const user = new userModel(req.body);

  const query = { pseudo: user.lookfor };
  userModel
    .findOneAndUpdate(query, { pseudo: user.pseudo })
    .then((users) => {
      console.log(user);
      return res.status(201).json(users);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
};

exports.delete = (req, res) => {
  const user = new userModel(req.body);
  console.log(user);

  const query = { pseudo: user.lookfor };
  userModel
    .findOneAndUpdate(query, { pseudo: user.pseudo })
    .then((users) => {
      console.log(user);
      return res.status(201).json(users);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
};

exports.login = (req, res) => {
  const Test = {
    username: "Peter",
    password: "I'm",
  };

  const accessToken = jwt.sign({ Test }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 604800,
  });

  return res.json(accessToken);

  const user_input = new userModel(req.body);
  const email = user_input.email;
  const password_input = user_input.password;

  userModel
    .findOne({ email: email })
    .then((user) => {
      const password_user = decryptage(user.password);
      if (password_user === password_input) {
        console.log("successful connection - #200");

        return res.status(200).json({
          response: user,
          callBack: "Successful connction",
        });
      } else {
        console.log("Wrong password - #500");
        return res.status(500).json({
          response: user,
          errorMessage: "Not the good password :'(",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("wrong email address - #404");
      return res
        .status(404)
        .json({ errorMessage: "Aucun Résultat pour cette adress mail" });
    });
};

exports.authToken = (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.getTestToken = (req, res, next) => {
  console.log("Yes ca marche !!");
  return res.status(200).json("Yes ca marche !!");
};
