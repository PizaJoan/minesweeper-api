-- Initial tables at 19-01-2024
CREATE DATABASE IF NOT EXISTS minesweeper;

USE minesweeper;

CREATE TABLE
  IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60),
    `creation_date` DATETIME (6) NOT NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  IF NOT EXISTS `board` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `rows` INT DEFAULT 9,
    `cols` INT DEFAULT 9,
    `mines` INT DEFAULT 10,
    `difficulty` ENUM ('easy', 'medium', 'hard', 'custom') NOT NULL,
    `json_board` JSON NOT NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  IF NOT EXISTS `game` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT,
    `board_id` INT,
    `creation_date` DATETIME (6) NOT NULL,
    `time` INT DEFAULT 0,
    `status` ENUM ('created', 'draft', 'won', 'lost') DEFAULT 'created',
    `score` INT DEFAULT 0,
    PRIMARY KEY (`id`, `user_id`, `board_id`),
    CONSTRAINT `game_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `game_board_id` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS `game_history` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `game_id` INT,
    `selected_row` INT NOT NULL,
    `selected_col` INT NOT NULL,
    `bomb` BOOLEAN DEFAULT FALSE,
    `creation_date` DATETIME (6) NOT NULL,
    PRIMARY KEY (`id`, `game_id`),
    CONSTRAINT `game_history_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  );

-- ALTER TABLE `board` ADD COLUMN `mines` INT DEFAULT 10 AFTER `cols`;
-- ALTER TABLE `user` ADD COLUMN `name` VARCHAR(60) AFTER `id`;