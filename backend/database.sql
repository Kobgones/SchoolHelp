SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `club`;

CREATE TABLE `club` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `sport` varchar(255),
  `trainer` varchar(255)
);

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `class` varchar(255),
  `email` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `club_id` int,
FOREIGN KEY (`club_id`) REFERENCES `club`(`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

INSERT INTO user (firstname, lastname, email, hashedPassword, admin) VALUES ('Morgan', 'Mezaache', "mezaache.morgan@gmail.com", '', 1);

DROP TABLE IF EXISTS `inscription`;

CREATE TABLE `inscription` (
  user_id int NOT NULL,
  club_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (club_id) REFERENCES club(id)
);

SET FOREIGN_KEY_CHECKS = 1;
