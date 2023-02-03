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

const deleteByClub = (req, res) => {
  models.member
    .deleteAllMembersFromAClub(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const deleteByMember = (req, res) => {
  models.member
    .deleteAllClubForAMember(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAllMembers,
  getAllMembersFromClub,
  getAllClubsForMember,
  deleteByClub,
  deleteByMember,
};
