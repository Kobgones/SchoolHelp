SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `club`;

CREATE TABLE `club` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `picture` varchar(300) NOT NULL DEFAULT "src/assets/fish.png",
  `description` text NOT NULL,
  `sport` varchar(255),
  `trainer` varchar(255)
);

INSERT INTO `club` (name, picture, description, sport, trainer) VALUES ("Les canards rapides", "src/assets/foot.png", "Un club qui bat des ailes sur le terrain! Les Canards sont une équipe dynamique et déterminée à jouer avec une légèreté qui ferait pâlir les cygnes. Ils courent plus vite que leurs ombres et marquent des buts avec une rapidité qui laissera leurs adversaires bouche bée. Les Canards ne prennent jamais la vie au sérieux et sont toujours prêts à s'amuser sur le terrain.", "Football", "Steve Savidan"), ("Les p'tit bonhommes", "src/assets/basket.png", "Des paniers de petite taille, mais de grande qualité! Les P'tits Bonhoms sont un club de basket talentueux qui ne se laissent pas décourager par leur petite taille. Ils sont rapides, agiles et marquent des paniers avec une précision incroyable. Même si leur taille peut les faire paraître inoffensifs, ils sont en réalité une force sur le terrain, se frayant un chemin à travers la défense adverse avec un sourire malicieux sur le visage. Les P'tits Bonhoms sont une équipe de petite taille, mais de grande envergure.", "Basket", "Muggsy Bogues"), ("Les Monkeys", "src/assets/climb.png", "Grimpez jusqu'au sommet avec des singes malins! Les Monkeys sont un club d'escalade passionné par l'aventure et la découverte de nouveaux sommets. Ils grimpent avec agilité et intelligence, se frayant un chemin à travers les parois les plus difficiles avec une confiance décontractée. Les Monkeys aiment s'entraîner dur et se défier les uns les autres pour atteindre de nouveaux sommets, tout en gardant le sens de l'humour et en s'amusant tout le long du chemin. Les Monkeys sont des singes malins qui escaladent les montagnes avec brio!", "Escalade", "Iris Succi"), ("Les Raqmokets", "src/assets/tennis.png", "Des coups de raquette qui décoiffent! Les Raquetteurs en Folie sont un club de tennis passionné qui aime jouer avec fougue et détermination. Ils sont rapides sur leurs pieds et foudroyants avec leurs coups. Leur talent pour le tennis est égalé seulement par leur amour pour la bonne humeur sur le court. Ils peuvent rendre n'importe quelle balle avec un sourire sur le visage et un coup de raquette déterminé.", "Tennis", "Roger Federer"), ("Volley Smash Bros", "src/assets/volley.png", "Des smashs qui écrasent la compétition! Les Volley Smash Bros sont une équipe de volley talentueuse et déterminée à écraser la compétition avec leurs puissants smashs. Ils jouent avec une énergie contagieuse et une stratégie affûtée, mettant en évidence leur talent à chaque match. Les Volley Smash Bros sont une équipe redoutable sur le terrain et aiment s'amuser autant que leur public.", "Volley-Ball", "Earvin Ngapeth"), ("Echec et Matelas", "src/assets/echecs.png", "Des coups qui vous envoient sur les fesses! Les Echec et Matelas sont un club d'échecs passionné par le jeu stratégique et les défis intellectuels. Ils jouent avec intelligence, précision et un brin de malice, visant toujours à faire tomber leur adversaire. Les Echec et Matelas aiment jouer avec style et sont toujours prêts à sortir leur plus beau coup pour faire chuter leurs rivaux.", "Echecs", "Elisabeth Harmon"), ("Les Volants fous", "src/assets/badminton.png", "Des volants qui volent haut et loin! Les Volants Fou sont un club de badminton déterminé à éblouir le public avec des coups de volant incroyables. Ils jouent avec agilité et puissance, s'amusant à faire voler les volants à travers le terrain. Les Le Volant Fou aiment jouer avec énergie et sont toujours prêts à montrer leurs compétences incroyables dans ce sport élégant et divertissant.", "Badminton", "Pierre Paillard"), ("Les Sushis aquatiques", "src/assets/plongee.png", "Des plongeurs qui aiment plonger! Les Sushis Aquatiques est un club de plongée déterminé à explorer les profondeurs des océans. Ils plongent avec agilité et curiosité, découvrant de nouvelles créatures et paysages sous-marins à chaque plongée. Les Sushis Aquatiques aiment se plonger dans l'inconnu et se défier les uns les autres pour découvrir les merveilles cachées des fonds marins. Les Sushis Aquatiques sont des plongeurs intrépides qui n'ont pas peur de l'aventure!", "Plongée", "Le petit Grégory");

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `class` varchar(255),
  `email` varchar(255) NOT NULL UNIQUE,
  `hashedPassword` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

INSERT INTO user (firstname, lastname, email, hashedPassword, admin) VALUES ('Morgan', 'Mezaache', "mezaache.morgan@gmail.com", '$argon2id$v=19$m=65536,t=5,p=1$hmz82Y16xpfO7F2LEDVaZA$NgD9UihLJ9aXnwj+lJnRiJouf0Ui0F2U90xBnMl+3Tc', 1), ('Daryl', 'Chaigne', "daryl.chaigne@gmail.com", '$argon2id$v=19$m=65536,t=5,p=1$rWHuQWKL8fme5Riq53HSRw$bfj2c7CdFR6NWExEVtMeRaGfY7oBeV0WIxZ0rVW+oXA', 1), ('Iris', 'Succi', "iris.succi@gmail.com", '$argon2id$v=19$m=65536,t=5,p=1$cUEthYnH8Qw09JlcmoACcg$Qj1m52n+Q5swu5bGWb8fVlbOXi8m92PCxm6nxaNgFFs', 0), ('Madeline', 'Thomas', "madeline.thomas@gmail.com", '$argon2id$v=19$m=65536,t=5,p=1$uZ2/O/7Qzb9nroWavBGOgw$92kKTyqYmHIerhpwDzuuQXqdsKIUp1KX+GMUpqJTIOQ', 0), ('Chloé', 'bidau', "chloe.bidau@gmail.com", '$argon2id$v=19$m=65536,t=5,p=1$ZG7nbwH7xuonbQj9d0XwoQ$EhKerBDXWKUSZ45+LbilL58lDCRbmr7fQix/CgFfAfM', 0), ('Marion', 'Lalonde', 'marion.lalonde@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$ruZypJke3QtLr4CM5Sn5RQ$ebSQ8Xj3EVAj1hVxnWmGUI9au0jE7STJ2Q17zCdfzP8', 0), ("Laura", "Odic", "odic.laura@gmail.com", "$argon2id$v=19$m=65536,t=5,p=1$hmz82Y16xpfO7F2LEDVaZA$NgD9UihLJ9aXnwj+lJnRiJouf0Ui0F2U90xBnMl+3Tc", 1);

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
  user_id int NOT NULL,
  club_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (club_id) REFERENCES club(id)
);

INSERT INTO `member` (user_id, club_id) VALUES (1,1), (2, 8), (3, 8), (4, 3), (6, 8), (5, 7), (1, 5), (7, 7), (7, 5);

SET FOREIGN_KEY_CHECKS = 1;
