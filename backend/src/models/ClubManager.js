const AbstractManager = require("./AbstractManager");

class ClubManager extends AbstractManager {
  constructor() {
    super({ table: "club" });
  }

  findAllClubs() {
    return this.connection.query(`select * from ${this.table}`);
  }

  findClubById(id) {
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      id,
    ]);
  }

  createNewClub(club) {
    return this.connection.query(
      `insert into ${this.table} (name, description, sport, trainer, picture) values (?, ?, ?, ?, ?)`,
      [club.name, club.description, club.sport, club.trainer, club.picture]
    );
  }

  editClub(club) {
    return this.connection.query(
      `update ${this.table} set name = ?, description = ?, sport = ?, trainer = ? where id = ?`,
      [club.name, club.description, club.sport, club.trainer, club.id]
    );
  }

  deleteClub(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = ClubManager;
