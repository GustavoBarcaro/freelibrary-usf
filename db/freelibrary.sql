-- Database export via SQLPro (https://www.sqlprostudio.com/allapps.html)
-- Exported by gustavobarcaro at 04-10-2022 14:53.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.


-- BEGIN TABLE books
DROP TABLE IF EXISTS books;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserting 1 row into books
-- Insert batch #1
INSERT INTO books (id, name, filename) VALUES
(49, 'D&D 5E', '633c716d553746.06518360dd-5e-guia-do-mestre-biblioteca-elfica.pdf');

-- END TABLE books

