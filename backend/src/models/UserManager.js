const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAllUsers() {
    return this.connection.query(
      `select id, firstname, lastname, class, email, admin, creationDate from ${this.table}`
    );
  }

  findUserById(id) {
    return this.connection.query(
      `select id, firstname, lastname, class, email, admin, creationDate from ${this.table} where id = ?`,
      [id]
    );
  }

  createUser(user) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, class, email, hashedPassword) values (?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.class,
        user.email,
        user.hashedPassword,
      ]
    );
  }

  selectEmail(email) {
    return this.connection.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
  }

  editUser(user) {
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ? where id = ?`,
      [user.firstname, user.lastname, user.email, user.id]
    );
  }

  deleteUser(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = UserManager;
