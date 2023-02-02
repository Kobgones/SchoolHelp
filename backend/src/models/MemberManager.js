const AbstractManager = require("./AbstractManager");

class MemberManager extends AbstractManager {
  constructor() {
    super({ table: "member" });
  }

  findAllMembers() {
    return this.connection.query(
      `select user.id, club.name, club.sport, user.firstname, user.lastname, user.class, user.email from ${this.table} join user on ${this.table}.user_id = user.id join club on ${this.table}.club_id = club.id`
    );
  }

  findAllMembersFromClub(id) {
    return this.connection.query(
      `select user.id, user.firstname, user.lastname, user.class, user.email, club.name, club.sport from ${this.table} join user on ${this.table}.user_id = user.id join club on ${this.table}.club_id = club.id where club.id = ?`,
      [id]
    );
  }

  findAllClubFromUser(id) {
    return this.connection.query(
      `select ${this.table}.user_id, club.name, club.sport from ${this.table} join user on ${this.table}.user_id = user.id join club on ${this.table}.club_id = club.id where ${this.table}.user_id = ?`,
      [id]
    );
  }

  deleteAllMembersFromAClub(id) {
    return this.connection.query(
      `delete from ${this.table} where club_id = ?`,
      [id]
    );
  }
}

module.exports = MemberManager;
