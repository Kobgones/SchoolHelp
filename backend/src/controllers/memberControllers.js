const models = require("../models");

const getAllMembers = (req, res) => {
  models.member
    .findAllMembers()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllMembersFromClub = (req, res) => {
  models.member
    .findAllMembersFromClub(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllClubsForMember = (req, res) => {
  models.member
    .findAllClubFromUser(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { getAllMembers, getAllMembersFromClub, getAllClubsForMember };
