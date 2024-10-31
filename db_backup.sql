-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- project 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project`;

-- 테이블 project.tbl_comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_comment` (
  `user_id` varchar(50) DEFAULT NULL,
  `feed_no` varchar(50) DEFAULT NULL,
  `cdatetime` date DEFAULT NULL,
  `contents` varchar(500) DEFAULT NULL,
  `comment_userId` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 project.tbl_comment:~0 rows (대략적) 내보내기

-- 테이블 project.tbl_feed 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_feed` (
  `feed_no` int NOT NULL AUTO_INCREMENT,
  `user_Id` varchar(50) NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`feed_no`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 project.tbl_feed:~18 rows (대략적) 내보내기
INSERT INTO `tbl_feed` (`feed_no`, `user_Id`, `content`) VALUES
	(5, 'user1', '집 좋다'),
	(7, 'user1', '귀여운 소품'),
	(9, 'user1', '고양이'),
	(10, 'cat', '예쁜 집'),
	(12, 'cat', '뜨개질'),
	(13, 'cat', '쿠킹클래스'),
	(14, 'cat', '라탄소품'),
	(15, 'cat', '마크라메'),
	(16, 'cat', '옷장 몇개'),
	(17, 'cat', '우리집이었으면...'),
	(19, 'cat', '홈인테리어'),
	(20, 'cat', '이쁜 고양이'),
	(22, 'rabbit', '할로윈 대연회장'),
	(23, 'rabbit', '버로우'),
	(24, 'rabbit', '그리핀도르 기숙사'),
	(25, 'rabbit', '후플푸프 기숙사'),
	(26, 'rabbit', '래번클로 기숙사'),
	(27, 'rabbit', '슬리데린 기숙사');

-- 테이블 project.tbl_feed_img 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_feed_img` (
  `img_no` int NOT NULL AUTO_INCREMENT,
  `feed_no` int NOT NULL DEFAULT '0',
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `img_path` varchar(255) NOT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`img_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 project.tbl_feed_img:~39 rows (대략적) 내보내기
INSERT INTO `tbl_feed_img` (`img_no`, `feed_no`, `user_id`, `img_path`, `cdatetime`) VALUES
	(3, 5, 'user1', 'img\\1729675598875.jpg', '2024-10-23 18:26:39'),
	(4, 5, 'user1', 'img\\1729675598881.webp', '2024-10-23 18:26:39'),
	(7, 7, 'user1', 'img\\1729842232325.jpg', '2024-10-25 16:43:52'),
	(8, 7, 'user1', 'img\\1729842232328.jpg', '2024-10-25 16:43:52'),
	(9, 7, 'user1', 'img\\1729842232330.jpg', '2024-10-25 16:43:52'),
	(14, 9, 'user1', 'img\\1729842528027.jpg', '2024-10-25 16:48:48'),
	(15, 9, 'user1', 'img\\1729842528030.jpeg', '2024-10-25 16:48:48'),
	(16, 9, 'user1', 'img\\1729842528031.jpg', '2024-10-25 16:48:48'),
	(17, 9, 'user1', 'img\\1729842528032.png', '2024-10-25 16:48:48'),
	(18, 10, 'cat', 'img\\1729843898050.png', '2024-10-25 17:11:38'),
	(19, 10, 'cat', 'img\\1729843898053.png', '2024-10-25 17:11:38'),
	(22, 12, 'cat', 'img\\1729844251654.jpg', '2024-10-25 17:17:32'),
	(23, 12, 'cat', 'img\\1729844251659.jpeg', '2024-10-25 17:17:32'),
	(24, 12, 'cat', 'img\\1729844251660.jpg', '2024-10-25 17:17:32'),
	(25, 13, 'cat', 'img\\1730082688908.jpg', '2024-10-28 11:31:29'),
	(26, 13, 'cat', 'img\\1730082688912.jpg', '2024-10-28 11:31:29'),
	(27, 14, 'cat', 'img\\1730083588888.jpg', '2024-10-28 11:46:29'),
	(28, 14, 'cat', 'img\\1730083588890.jpg', '2024-10-28 11:46:29'),
	(29, 14, 'cat', 'img\\1730083588893.jpg', '2024-10-28 11:46:29'),
	(30, 14, 'cat', 'img\\1730083588896.jpg', '2024-10-28 11:46:29'),
	(31, 15, 'cat', 'img\\1730083906185.jpg', '2024-10-28 11:51:46'),
	(32, 15, 'cat', 'img\\1730083906188.jpg', '2024-10-28 11:51:46'),
	(33, 16, 'cat', 'img\\1730083954780.jpg', '2024-10-28 11:52:35'),
	(34, 16, 'cat', 'img\\1730083954782.jpg', '2024-10-28 11:52:35'),
	(35, 16, 'cat', 'img\\1730083954784.jpg', '2024-10-28 11:52:35'),
	(36, 17, 'cat', 'img\\1730084072310.jpg', '2024-10-28 11:54:32'),
	(37, 17, 'cat', 'img\\1730084072314.webp', '2024-10-28 11:54:32'),
	(39, 19, 'cat', 'img\\1730084896613.jpg', '2024-10-28 12:08:17'),
	(40, 19, 'cat', 'img\\1730084896614.jpg', '2024-10-28 12:08:17'),
	(41, 20, 'cat', 'img\\1730085103385.jpg', '2024-10-28 12:11:43'),
	(42, 20, 'cat', 'img\\1730085103387.jpg', '2024-10-28 12:11:43'),
	(44, 22, 'rabbit', 'img\\1730249171987.jpg', '2024-10-30 09:46:12'),
	(45, 22, 'rabbit', 'img\\1730249171989.jpg', '2024-10-30 09:46:12'),
	(46, 23, 'rabbit', 'img\\1730249230684.jpg', '2024-10-30 09:47:11'),
	(47, 24, 'rabbit', 'img\\1730249350351.jpg', '2024-10-30 09:49:10'),
	(48, 24, 'rabbit', 'img\\1730249350353.jpg', '2024-10-30 09:49:10'),
	(49, 25, 'rabbit', 'img\\1730249467434.gif', '2024-10-30 09:51:07'),
	(50, 26, 'rabbit', 'img\\1730249501684.gif', '2024-10-30 09:51:42'),
	(51, 27, 'rabbit', 'img\\1730249549317.gif', '2024-10-30 09:52:29');

-- 테이블 project.tbl_follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_follow` (
  `user_id` varchar(50) NOT NULL,
  `follow_id` varchar(50) DEFAULT NULL,
  `follow_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 project.tbl_follow:~5 rows (대략적) 내보내기
INSERT INTO `tbl_follow` (`user_id`, `follow_id`, `follow_date`) VALUES
	('rabbit', 'cat', '2024-10-30'),
	('cat', 'lion', '2024-10-30'),
	('cat', 'bear', '2024-10-30'),
	('cat', 'rabbit', '2024-10-30'),
	('cat', 'elephant', '2024-10-30');

-- 테이블 project.tbl_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pwd` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `profile_img_path` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 project.tbl_user:~7 rows (대략적) 내보내기
INSERT INTO `tbl_user` (`id`, `pwd`, `phone`, `profile_img_path`) VALUES
	('bear', '$2b$10$W2kK56PYilRy0czOF4nDEOegvhgxMFu6qKZQJZ5C..ugMuPXZqyqy', '01055551111', 'profileImg\\profileImg-1730248064351-54770286.jfif'),
	('cat', '$2b$10$CM3WfXlBYUYl/HTnyfMNxuZlgdAZTlwPj59Sv2ZviruBGXxxG3bW6', '01011111111', 'profileImg\\profileImg-1729838022723-604559961.jpeg'),
	('elephant', '$2b$10$kGUJMNsnI8afMb7d5qP5a.9tJpJBZjBOJvqqSOVqaVgC03Y6Uu1pq', '01091919191', 'profileImg\\profileImg-1730248204401-578203945.jpg'),
	('kangaroo', '$2b$10$SWW5xr6A3xYbmGvwPiiTwuox7CEJd/veNKo8csXlR3Ip0/QfXPlZm', '01091919191', 'profileImg\\profileImg-1730248332935-359632425.jpg'),
	('lion', '$2b$10$7NC.xaxM2tnraJdiY9OIqOaY/EzFHDMnIrb4DyeXc3mSJjUR5vuUm', '01099991111', 'profileImg\\profileImg-1730248113088-654760553.jpg'),
	('rabbit', '$2b$10$YokjN4H.oexfJBPDtGEHQeR0EIFumZuV1PWPImnAfs8Ydbv71Z5IG', '01055551111', 'profileImg\\profileImg-1730248430418-848714598.png'),
	('user1', '$2b$10$Yz.6BBmf4IZx4GTTq4klWuF/xNlog0/.4QRAkOvElCC/DrRNVWEmu', '01055551111', 'profileImg\\profileImg-1730086097095-449272503.jpg');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
