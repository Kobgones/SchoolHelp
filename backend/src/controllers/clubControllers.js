const models = require("../models");

const getAllClubs = (req, res) => {
  models.club
    .findAllClubs()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getClubById = (req, res) => {
  models.club
    .findClubById(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createNewClub = (req, res) => {
  const club = req.body;
  models.club
    .createNewClub(club)
    .then(([result]) => {
      res.location(`/api/club/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const editClub = (req, res) => {
  const club = req.body;
  club.id = parseInt(req.params.id, 10);
  models.club
    .editClub(club)
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

const deleteClub = (req, res) => {
  models.club
    .deleteClub(req.params.id)
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
  getAllClubs,
  getClubById,
  createNewClub,
  editClub,
  deleteClub,
};
