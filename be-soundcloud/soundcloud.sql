CREATE DATABASE  IF NOT EXISTS `soundcloud` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `soundcloud`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: soundcloud
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailaddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_soundcloud_user_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_soundcloud_user_id` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_address_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add genre',7,'add_genre'),(26,'Can change genre',7,'change_genre'),(27,'Can delete genre',7,'delete_genre'),(28,'Can view genre',7,'view_genre'),(29,'Can add playlist',8,'add_playlist'),(30,'Can change playlist',8,'change_playlist'),(31,'Can delete playlist',8,'delete_playlist'),(32,'Can view playlist',8,'view_playlist'),(33,'Can add tracks',9,'add_tracks'),(34,'Can change tracks',9,'change_tracks'),(35,'Can delete tracks',9,'delete_tracks'),(36,'Can view tracks',9,'view_tracks'),(37,'Can add playlist tracks',10,'add_playlisttracks'),(38,'Can change playlist tracks',10,'change_playlisttracks'),(39,'Can delete playlist tracks',10,'delete_playlisttracks'),(40,'Can view playlist tracks',10,'view_playlisttracks'),(41,'Can add like',11,'add_like'),(42,'Can change like',11,'change_like'),(43,'Can delete like',11,'delete_like'),(44,'Can view like',11,'view_like'),(45,'Can add follower',12,'add_follower'),(46,'Can change follower',12,'change_follower'),(47,'Can delete follower',12,'delete_follower'),(48,'Can view follower',12,'view_follower'),(49,'Can add comment',13,'add_comment'),(50,'Can change comment',13,'change_comment'),(51,'Can delete comment',13,'delete_comment'),(52,'Can view comment',13,'view_comment'),(53,'Can add application',14,'add_application'),(54,'Can change application',14,'change_application'),(55,'Can delete application',14,'delete_application'),(56,'Can view application',14,'view_application'),(57,'Can add access token',15,'add_accesstoken'),(58,'Can change access token',15,'change_accesstoken'),(59,'Can delete access token',15,'delete_accesstoken'),(60,'Can view access token',15,'view_accesstoken'),(61,'Can add grant',16,'add_grant'),(62,'Can change grant',16,'change_grant'),(63,'Can delete grant',16,'delete_grant'),(64,'Can view grant',16,'view_grant'),(65,'Can add refresh token',17,'add_refreshtoken'),(66,'Can change refresh token',17,'change_refreshtoken'),(67,'Can delete refresh token',17,'delete_refreshtoken'),(68,'Can view refresh token',17,'view_refreshtoken'),(69,'Can add id token',18,'add_idtoken'),(70,'Can change id token',18,'change_idtoken'),(71,'Can delete id token',18,'delete_idtoken'),(72,'Can view id token',18,'view_idtoken'),(73,'Can add Token',19,'add_token'),(74,'Can change Token',19,'change_token'),(75,'Can delete Token',19,'delete_token'),(76,'Can view Token',19,'view_token'),(77,'Can add token',20,'add_tokenproxy'),(78,'Can change token',20,'change_tokenproxy'),(79,'Can delete token',20,'delete_tokenproxy'),(80,'Can view token',20,'view_tokenproxy'),(81,'Can add social account',21,'add_socialaccount'),(82,'Can change social account',21,'change_socialaccount'),(83,'Can delete social account',21,'delete_socialaccount'),(84,'Can view social account',21,'view_socialaccount'),(85,'Can add social application',22,'add_socialapp'),(86,'Can change social application',22,'change_socialapp'),(87,'Can delete social application',22,'delete_socialapp'),(88,'Can view social application',22,'view_socialapp'),(89,'Can add social application token',23,'add_socialtoken'),(90,'Can change social application token',23,'change_socialtoken'),(91,'Can delete social application token',23,'delete_socialtoken'),(92,'Can view social application token',23,'view_socialtoken'),(93,'Can add email address',24,'add_emailaddress'),(94,'Can change email address',24,'change_emailaddress'),(95,'Can delete email address',24,'delete_emailaddress'),(96,'Can view email address',24,'view_emailaddress'),(97,'Can add email confirmation',25,'add_emailconfirmation'),(98,'Can change email confirmation',25,'change_emailconfirmation'),(99,'Can delete email confirmation',25,'delete_emailconfirmation'),(100,'Can view email confirmation',25,'view_emailconfirmation');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_soundcloud_user_id` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `comment_text` longtext COLLATE utf8mb4_unicode_ci,
  `fk_tracks_id` bigint DEFAULT NULL,
  `fk_user_id` bigint DEFAULT NULL,
  `moment` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_fk_tracks_id_84224971_fk_tracks_id` (`fk_tracks_id`),
  KEY `comment_fk_user_id_4e6ded59_fk_soundcloud_user_id` (`fk_user_id`),
  CONSTRAINT `comment_fk_tracks_id_84224971_fk_tracks_id` FOREIGN KEY (`fk_tracks_id`) REFERENCES `tracks` (`id`),
  CONSTRAINT `comment_fk_user_id_4e6ded59_fk_soundcloud_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'2024-03-18 09:37:17.144320','2024-05-09 01:31:34.293679',1,'This track is the best',1,2,25),(2,'2024-03-18 09:37:45.842249','2024-03-18 09:37:45.842249',1,'good',2,1,0),(3,'2024-03-18 09:37:57.066640','2024-03-18 09:37:57.066640',1,'very good',3,1,0),(4,'2024-05-08 14:30:16.921403','2024-05-08 14:30:16.921403',1,'This track is so good',5,2,95),(5,'2024-05-08 14:30:34.337272','2024-05-08 14:30:34.337272',1,'This track is so good',4,3,23),(6,'2024-05-08 14:30:57.801442','2024-05-08 14:30:57.801442',1,'This track is so good',6,2,20),(7,'2024-05-08 14:31:12.063446','2024-05-08 14:31:12.063446',1,'This track is so good',7,2,44),(8,'2024-05-08 14:31:32.342123','2024-05-08 14:31:32.342123',1,'This track is so good',8,2,99),(9,'2024-05-08 14:31:48.080184','2024-05-08 14:31:48.080184',1,'This track is so good',9,2,55),(13,'2024-05-09 07:26:47.380544','2024-05-09 07:26:47.380544',1,'Cám ơn tất cả mọi người',1,1,0),(15,'2024-05-09 07:45:47.990691','2024-05-09 07:45:47.990691',1,'Bài nhạc rất hay',1,1,0),(17,'2024-05-09 07:53:52.605692','2024-05-09 07:53:52.605692',1,'Nhạc rất cuốn hút nha',1,1,42),(21,'2024-05-10 02:34:07.529055','2024-05-10 02:34:07.529055',1,'Nhạc hay quá ạ',6,1,0);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_soundcloud_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_soundcloud_user_id` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-03-18 08:53:30.876748','1','love',1,'[{\"added\": {}}]',7,1),(2,'2024-03-18 08:53:38.104681','2','chill',1,'[{\"added\": {}}]',7,1),(3,'2024-03-18 08:53:46.761828','3','party',1,'[{\"added\": {}}]',7,1),(4,'2024-03-18 08:56:00.141853','1','Sau Cơn Mưa - CoolKid ft Rhyder',1,'[{\"added\": {}}]',9,1),(5,'2024-03-18 08:57:10.905843','2','Think twice',1,'[{\"added\": {}}]',9,1),(6,'2024-03-18 08:58:25.669832','3','니가_ (You_)',1,'[{\"added\": {}}]',9,1),(7,'2024-03-18 09:15:39.406362','1','My Playlist',1,'[{\"added\": {}}]',8,1),(8,'2024-03-18 09:29:08.873709','2','PlaylistTracks object (2)',1,'[{\"added\": {}}]',10,1),(9,'2024-03-18 09:29:52.140293','3','PlaylistTracks object (3)',1,'[{\"added\": {}}]',10,1),(10,'2024-03-18 09:29:59.817147','4','PlaylistTracks object (4)',1,'[{\"added\": {}}]',10,1),(11,'2024-03-18 09:37:17.145322','1','Comment object (1)',1,'[{\"added\": {}}]',13,1),(12,'2024-03-18 09:37:45.843247','2','Comment object (2)',1,'[{\"added\": {}}]',13,1),(13,'2024-03-18 09:37:57.066640','3','Comment object (3)',1,'[{\"added\": {}}]',13,1),(14,'2024-03-18 09:47:03.471167','1','Like object (1)',1,'[{\"added\": {}}]',11,1),(15,'2024-03-18 09:47:14.498745','2','Like object (2)',1,'[{\"added\": {}}]',11,1),(16,'2024-03-18 09:47:25.758345','3','Like object (3)',1,'[{\"added\": {}}]',11,1),(17,'2024-03-18 09:55:23.642716','2','user1',1,'[{\"added\": {}}]',6,1),(18,'2024-03-18 09:55:37.713314','1','Follower object (1)',1,'[{\"added\": {}}]',12,1),(19,'2024-04-23 08:37:07.584187','1','Sau Cơn Mưa - CoolKid ft Rhyder',2,'[{\"changed\": {\"fields\": [\"View\"]}}]',9,1),(20,'2024-04-23 08:37:14.867566','2','Think twice',2,'[{\"changed\": {\"fields\": [\"View\"]}}]',9,1),(21,'2024-04-23 08:37:26.898915','3','니가_ (You_)',2,'[{\"changed\": {\"fields\": [\"View\"]}}]',9,1),(22,'2024-04-23 12:19:38.422600','4','Genre object (4)',1,'[{\"added\": {}}]',7,1),(23,'2024-04-23 12:26:02.510650','4','B.O.R. (Birth of Rap)',1,'[{\"added\": {}}]',9,1),(24,'2024-04-23 12:30:22.372053','5','Đen Đá Không Đường (Rap Version) -AMee',1,'[{\"added\": {}}]',9,1),(25,'2024-04-23 12:43:36.015895','1','Genre object (1)',2,'[{\"changed\": {\"fields\": [\"Name\", \"Description\"]}}]',7,1),(26,'2024-04-23 12:43:52.002590','5','Đen Đá Không Đường (Rap Version) -AMee',2,'[{\"changed\": {\"fields\": [\"Fk genre\"]}}]',9,1),(27,'2024-04-23 12:46:05.284037','6','LOVE IS GONE FT. DYLAN MATTHEW (ACOUSTIC)',1,'[{\"added\": {}}]',9,1),(28,'2024-04-23 12:56:55.762681','7','Justin Bieber - Love Yourself (COVER)',1,'[{\"added\": {}}]',9,1),(29,'2024-04-23 13:00:01.267387','8','we can\'t be friends (wait for your love) - ariana grande',1,'[{\"added\": {}}]',9,1),(30,'2024-04-23 13:03:11.226068','9','Each Time You Fall In Love',1,'[{\"added\": {}}]',9,1),(31,'2024-04-23 14:08:07.492519','10','Over - KHOI VU (ft. khoivy) x minhnhat.',1,'[{\"added\": {}}]',9,1),(32,'2024-04-23 14:08:25.573734','10','Over - KHOI VU (ft. khoivy) x minhnhat.',2,'[{\"changed\": {\"fields\": [\"Fk genre\"]}}]',9,1),(33,'2024-04-23 14:11:03.724633','11','Không Quan Trọng - Vụ Nổ Lớn',1,'[{\"added\": {}}]',9,1),(34,'2024-04-23 14:13:24.509386','12','Xe Đạp - Charles - Acoustic cover',1,'[{\"added\": {}}]',9,1),(35,'2024-04-23 14:15:05.020344','13','Chạm Khẽ Tim Anh Một Chút Thôi - Noo Phước Thịnh',1,'[{\"added\": {}}]',9,1),(36,'2024-05-05 14:50:49.477071','1','Sau Cơn Mưa - CoolKid ft Rhyder',2,'[{\"changed\": {\"fields\": [\"Photo\"]}}]',9,1),(37,'2024-05-08 02:31:17.283600','3','니가_ (You_)',2,'[{\"changed\": {\"fields\": [\"Url\"]}}]',9,1),(38,'2024-05-08 14:30:16.928405','4','Comment object (4)',1,'[{\"added\": {}}]',13,1),(39,'2024-05-08 14:30:34.340272','5','Comment object (5)',1,'[{\"added\": {}}]',13,1),(40,'2024-05-08 14:30:57.819367','6','Comment object (6)',1,'[{\"added\": {}}]',13,1),(41,'2024-05-08 14:31:12.066420','7','Comment object (7)',1,'[{\"added\": {}}]',13,1),(42,'2024-05-08 14:31:32.347134','8','Comment object (8)',1,'[{\"added\": {}}]',13,1),(43,'2024-05-08 14:31:48.083896','9','Comment object (9)',1,'[{\"added\": {}}]',13,1),(44,'2024-05-08 14:46:38.528258','1','Comment object (1)',2,'[{\"changed\": {\"fields\": [\"Moment\", \"Fk user\"]}}]',13,1),(45,'2024-05-08 14:49:16.375078','3','user2',2,'[{\"changed\": {\"fields\": [\"Avatar\", \"Tel\"]}}]',6,1),(46,'2024-05-08 14:49:30.012888','1','admin',2,'[{\"changed\": {\"fields\": [\"Avatar\", \"Tel\"]}}]',6,1),(47,'2024-05-09 01:31:34.297677','1','Comment object (1)',2,'[]',13,1),(48,'2024-05-09 07:16:22.649013','10','Comment object (10)',3,'',13,1),(49,'2024-05-09 07:26:32.435309','12','Comment object (12)',3,'',13,1),(50,'2024-05-09 07:26:32.443146','11','Comment object (11)',3,'',13,1),(51,'2024-05-09 07:42:17.613953','14','Comment object (14)',3,'',13,1),(52,'2024-05-09 07:48:56.783804','16','Comment object (16)',3,'',13,1),(53,'2024-05-09 08:13:36.427318','19','Comment object (19)',3,'',13,1),(54,'2024-05-09 08:13:36.429319','18','Comment object (18)',3,'',13,1),(55,'2024-05-10 01:33:24.108691','20','Comment object (20)',3,'',13,1),(56,'2024-05-13 01:56:41.795632','105','a',3,'',9,1),(57,'2024-05-13 01:57:26.320701','23','Comment object (23)',3,'',13,1),(58,'2024-05-13 01:57:26.322701','22','Comment object (22)',3,'',13,1),(59,'2024-05-13 01:57:46.680612','9','Like object (9)',3,'',11,1),(60,'2024-05-13 01:57:46.684502','8','Like object (8)',3,'',11,1),(61,'2024-05-13 01:58:03.616973','10','PlaylistTracks object (10)',3,'',10,1),(62,'2024-05-13 01:58:03.618972','9','PlaylistTracks object (9)',3,'',10,1),(63,'2024-05-13 01:58:03.619973','8','PlaylistTracks object (8)',3,'',10,1),(64,'2024-05-13 01:58:03.621974','7','PlaylistTracks object (7)',3,'',10,1),(65,'2024-05-13 01:58:03.622973','6','PlaylistTracks object (6)',3,'',10,1),(66,'2024-05-13 01:58:03.623973','5','PlaylistTracks object (5)',3,'',10,1),(67,'2024-05-13 01:58:14.979472','4','ab2',3,'',8,1),(68,'2024-05-13 01:58:14.981472','3','ab',3,'',8,1),(69,'2024-05-13 01:58:14.983474','2','ab',3,'',8,1),(70,'2024-05-13 01:58:28.801871','5','at',3,'',6,1),(71,'2024-05-13 01:58:28.803864','4','TranDatk',3,'',6,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (24,'account','emailaddress'),(25,'account','emailconfirmation'),(1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(19,'authtoken','token'),(20,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(15,'oauth2_provider','accesstoken'),(14,'oauth2_provider','application'),(16,'oauth2_provider','grant'),(18,'oauth2_provider','idtoken'),(17,'oauth2_provider','refreshtoken'),(5,'sessions','session'),(21,'socialaccount','socialaccount'),(22,'socialaccount','socialapp'),(23,'socialaccount','socialtoken'),(13,'soundcloud','comment'),(12,'soundcloud','follower'),(7,'soundcloud','genre'),(11,'soundcloud','like'),(8,'soundcloud','playlist'),(10,'soundcloud','playlisttracks'),(9,'soundcloud','tracks'),(6,'soundcloud','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-03-18 06:57:06.650889'),(2,'contenttypes','0002_remove_content_type_name','2024-03-18 06:57:06.699582'),(3,'auth','0001_initial','2024-03-18 06:57:06.837146'),(4,'auth','0002_alter_permission_name_max_length','2024-03-18 06:57:06.872975'),(5,'auth','0003_alter_user_email_max_length','2024-03-18 06:57:06.879332'),(6,'auth','0004_alter_user_username_opts','2024-03-18 06:57:06.883662'),(7,'auth','0005_alter_user_last_login_null','2024-03-18 06:57:06.887662'),(8,'auth','0006_require_contenttypes_0002','2024-03-18 06:57:06.890665'),(9,'auth','0007_alter_validators_add_error_messages','2024-03-18 06:57:06.895664'),(10,'auth','0008_alter_user_username_max_length','2024-03-18 06:57:06.899663'),(11,'auth','0009_alter_user_last_name_max_length','2024-03-18 06:57:06.904375'),(12,'auth','0010_alter_group_name_max_length','2024-03-18 06:57:06.915489'),(13,'auth','0011_update_proxy_permissions','2024-03-18 06:57:06.921488'),(14,'auth','0012_alter_user_first_name_max_length','2024-03-18 06:57:06.925487'),(15,'soundcloud','0001_initial','2024-03-18 06:57:07.550453'),(16,'admin','0001_initial','2024-03-18 06:57:07.632629'),(17,'admin','0002_logentry_remove_auto_add','2024-03-18 06:57:07.641629'),(18,'admin','0003_logentry_add_action_flag_choices','2024-03-18 06:57:07.650483'),(19,'oauth2_provider','0001_initial','2024-03-18 06:57:08.111828'),(20,'oauth2_provider','0002_auto_20190406_1805','2024-03-18 06:57:08.158067'),(21,'oauth2_provider','0003_auto_20201211_1314','2024-03-18 06:57:08.205071'),(22,'oauth2_provider','0004_auto_20200902_2022','2024-03-18 06:57:08.476165'),(23,'oauth2_provider','0005_auto_20211222_2352','2024-03-18 06:57:08.529501'),(24,'oauth2_provider','0006_alter_application_client_secret','2024-03-18 06:57:08.554503'),(25,'oauth2_provider','0007_application_post_logout_redirect_uris','2024-03-18 06:57:08.609501'),(26,'sessions','0001_initial','2024-03-18 06:57:08.661482'),(27,'soundcloud','0002_tracks_like','2024-03-18 06:57:08.700035'),(28,'account','0001_initial','2024-03-18 07:10:58.784405'),(29,'account','0002_email_max_length','2024-03-18 07:10:58.805697'),(30,'authtoken','0001_initial','2024-03-18 07:10:58.872016'),(31,'authtoken','0002_auto_20160226_1747','2024-03-18 07:10:58.934017'),(32,'authtoken','0003_tokenproxy','2024-03-18 07:10:58.939017'),(33,'socialaccount','0001_initial','2024-03-18 07:10:59.147019'),(34,'socialaccount','0002_token_max_lengths','2024-03-18 07:10:59.189019'),(35,'socialaccount','0003_extra_data_default_dict','2024-03-18 07:10:59.204017'),(36,'soundcloud','0003_playlisttracks_created_date_playlisttracks_is_active_and_more','2024-03-18 09:26:44.168382'),(37,'soundcloud','0004_like_like','2024-03-18 09:42:41.996916'),(38,'soundcloud','0005_tracks_view','2024-04-23 08:35:16.958203'),(39,'soundcloud','0006_remove_tracks_duration','2024-04-30 08:16:30.457081'),(40,'soundcloud','0007_comment_moment','2024-05-02 02:24:40.307362'),(41,'soundcloud','0008_alter_tracks_photo','2024-05-03 09:19:31.557725'),(42,'soundcloud','0009_alter_genre_name','2024-05-04 09:23:46.974272'),(43,'soundcloud','0010_playlisttracks_status_playlisttracks_title','2024-05-10 12:52:19.798942'),(44,'soundcloud','0011_remove_playlisttracks_status_and_more','2024-05-10 12:54:36.555689'),(45,'soundcloud','0012_playlist_status','2024-05-10 13:12:48.681633');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('8c8qhmvpmoozbqov0qufrlocqcs8igyk','.eJxVjEEOwiAQRe_C2pBSGUCX7nuGZoYZpGogKe3KeHfbpAvd_vfef6sR1yWPa5N5nFhdlVGn340wPqXsgB9Y7lXHWpZ5Ir0r-qBND5XldTvcv4OMLW919AHQxuS7mCBZYfKEfTIMFxI0wMQIoaeOkC2eXfCbi-hdEuYETn2-Jb054g:1rzBdq:ccvQG489jGoMzap-sNr2z-UK_81LyoAzAfiCSxPzIpw','2024-05-07 08:36:42.950441'),('8t5yowqdd7z6whbdtde89aj444ufp53d','.eJxVjEEOwiAQRe_C2pBSGUCX7nuGZoYZpGogKe3KeHfbpAvd_vfef6sR1yWPa5N5nFhdlVGn340wPqXsgB9Y7lXHWpZ5Ir0r-qBND5XldTvcv4OMLW919AHQxuS7mCBZYfKEfTIMFxI0wMQIoaeOkC2eXfCbi-hdEuYETn2-Jb054g:1s4Vvv:PFZyfuNtEQSgiHN0NWPCz-5lU_hb5bqCUBhEyOGalj8','2024-05-22 01:17:23.841180'),('d2gb408l21mbd9yelscuogln2qfrwoa1','.eJxVjEEOwiAQRe_C2pBSGUCX7nuGZoYZpGogKe3KeHfbpAvd_vfef6sR1yWPa5N5nFhdlVGn340wPqXsgB9Y7lXHWpZ5Ir0r-qBND5XldTvcv4OMLW919AHQxuS7mCBZYfKEfTIMFxI0wMQIoaeOkC2eXfCbi-hdEuYETn2-Jb054g:1rm6yV:CbxKFwFWDTywpt5rE_tsaiX1iUIO6WZ9F0QQ3XczoEY','2024-04-01 06:59:59.175775'),('ds85fmjvve3pzbh5i9zmjnmgivh8xton','.eJxVjEEOwiAQRe_C2pChDIFx6d4zEBgmUjWQlHZlvLs26UK3_733Xyqmba1xG7LEuaizQnX63XLih7QdlHtqt665t3WZs94VfdChr73I83K4fwc1jfqtiSw6NwkQMYAFS9mTlcDBFxQxbBKUyQdEJzkTFmEGzySEJrMB9f4Av2I3fQ:1s5y2B:Ni-u1-3jUn283vFy_aUg14-p4UHc9gnFUi7meLj-bBI','2024-05-26 01:29:51.508638'),('f9p9gnri3x0f545ymwr4zlq0qfuuit5t','.eJxVjEEOwiAQRe_C2pChDIFx6d4zEBgmUjWQlHZlvLs26UK3_733Xyqmba1xG7LEuaizQnX63XLih7QdlHtqt665t3WZs94VfdChr73I83K4fwc1jfqtiSw6NwkQMYAFS9mTlcDBFxQxbBKUyQdEJzkTFmEGzySEJrMB9f4Av2I3fQ:1s5ycF:uzrgySqVioRXjXi7rMusSQbw1BQfWZPgtbDKWAeQzfo','2024-05-26 02:07:07.187007'),('flrw0ljdua1712knqfh0ssrorj1e2xun','.eJxVjEEOwiAQRe_C2pChDIFx6d4zEBgmUjWQlHZlvLs26UK3_733Xyqmba1xG7LEuaizQnX63XLih7QdlHtqt665t3WZs94VfdChr73I83K4fwc1jfqtiSw6NwkQMYAFS9mTlcDBFxQxbBKUyQdEJzkTFmEGzySEJrMB9f4Av2I3fQ:1s5j9m:Go_4uNk3xauURSJ4bMFIGhiJnsU1I_DWvx_A49KbIMw','2024-05-25 09:36:42.856079'),('k31olr2qyj4f4p7mw8pe3xupha4xuslk','.eJxVjEEOwiAQRe_C2hAo09Dp0r1nIDCMFkVI2tKN8e7apJtu_3vvf4Qnqq2sbuM53RNHx2-fshhLy_kinG_r5NrCs0tRjALEaQueXlx2EJ--PKqkWtY5Bbkr8qCLvNXI-Xq4p4PJL9O_RjTQ9x0rRFLKKIPBouGBBhuBWZP2KnZ2AOg5BITIRMoSMoIOpJX4_gATzELj:1s5j9I:-aS1YPTzyqCL2yTHxW2TgrFkoQ_LOsUey2jQpDhhuVA','2024-05-25 09:36:12.183833'),('pveevshjk16tl0jhtryer2sx8uamwiot','.eJxVjMsOwiAQRf-FtSEgDA-X7vsNZIBBqgaS0q6M_65NutDtPefcFwu4rTVsg5YwZ3ZhwE6_W8T0oLaDfMd26zz1ti5z5LvCDzr41DM9r4f7d1Bx1G_towVpABSUCE44qzMUQZ5QmaykJV8EJolGJoXWgU6YzxY0OtRRALL3B8_kN6Q:1s5xYe:qNSrM1FYb3Opk7U_ZLxblylYlDxUgX1z5Hk3VNe-76o','2024-05-26 00:59:20.112966'),('s2ax0c7mj6zh4xd84gpbscrujofvgtae','.eJxVjMEOwiAQBf-FsyEgbKE9evcbyAKLRRGStngx_rua9NLrm5n3ZhhC63VzL1pyyhQdPTEXNtVeyok57Nvs-kqLy5FNDNhh8xgeVP8g3rHeGg-tbkv2_K_wna782iKVy-4eDmZc5189egNyAFCQPFhhjY6QBI2EaohKGhqTwCBxkEGhsaADxrMBjRa1F4Ds8wUkTkMK:1s5jsC:Y4zm7GwuP6k9XyY469d1rSZJvN4ZOndibxLfMgQMCfQ','2024-05-25 10:22:36.200545'),('urya1swma8nf9jckvwu8qwainblquxzo','.eJxVjEEOwiAQRe_C2pBSGUCX7nuGZoYZpGogKe3KeHfbpAvd_vfef6sR1yWPa5N5nFhdlVGn340wPqXsgB9Y7lXHWpZ5Ir0r-qBND5XldTvcv4OMLW919AHQxuS7mCBZYfKEfTIMFxI0wMQIoaeOkC2eXfCbi-hdEuYETn2-Jb054g:1rm8jV:Of7THCjb_5Vhj1Dw564FrH4Qs-mbFNwkZBs6gbmBJ3Q','2024-04-01 08:52:37.331298'),('xaojd5tvhw0t1hpusssvglfsb6ndgvof','.eJxVjEEOwiAQRe_C2pBSGUCX7nuGZoYZpGogKe3KeHfbpAvd_vfef6sR1yWPa5N5nFhdlVGn340wPqXsgB9Y7lXHWpZ5Ir0r-qBND5XldTvcv4OMLW919AHQxuS7mCBZYfKEfTIMFxI0wMQIoaeOkC2eXfCbi-hdEuYETn2-Jb054g:1s2LvL:HRqyGyFcU8tOhlao8AQtGVj260ZCkZgtbkxC91kFd_Q','2024-05-16 02:11:51.688274');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follower`
--

DROP TABLE IF EXISTS `follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follower` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `fk_follower_id` bigint DEFAULT NULL,
  `fk_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `follower_fk_follower_id_c50521c9_fk_soundcloud_user_id` (`fk_follower_id`),
  KEY `follower_fk_user_id_55c5f3fc_fk_soundcloud_user_id` (`fk_user_id`),
  CONSTRAINT `follower_fk_follower_id_c50521c9_fk_soundcloud_user_id` FOREIGN KEY (`fk_follower_id`) REFERENCES `soundcloud_user` (`id`),
  CONSTRAINT `follower_fk_user_id_55c5f3fc_fk_soundcloud_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follower`
--

LOCK TABLES `follower` WRITE;
/*!40000 ALTER TABLE `follower` DISABLE KEYS */;
INSERT INTO `follower` VALUES (1,'2024-03-18 09:55:37.712308','2024-03-18 09:55:37.712308',1,2,1);
/*!40000 ALTER TABLE `follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `genre_name_4b473646_uniq` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'2024-03-18 08:53:30.875745','2024-04-23 12:43:36.014897',1,'pop','pop'),(2,'2024-03-18 08:53:38.103681','2024-03-18 08:53:38.103681',1,'chill','chill'),(3,'2024-03-18 08:53:46.761828','2024-03-18 08:53:46.761828',1,'party','party'),(4,'2024-04-23 12:19:38.421715','2024-04-23 12:19:38.421715',1,'rap','rap');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `fk_tracks_id` bigint DEFAULT NULL,
  `fk_user_id` bigint DEFAULT NULL,
  `like` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `like_fk_tracks_id_e0f7bc40_fk_tracks_id` (`fk_tracks_id`),
  KEY `like_fk_user_id_3fc0f2fb_fk_soundcloud_user_id` (`fk_user_id`),
  CONSTRAINT `like_fk_tracks_id_e0f7bc40_fk_tracks_id` FOREIGN KEY (`fk_tracks_id`) REFERENCES `tracks` (`id`),
  CONSTRAINT `like_fk_user_id_3fc0f2fb_fk_soundcloud_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,'2024-03-18 09:47:03.470166','2024-05-10 08:49:46.255274',1,1,1,0),(2,'2024-03-18 09:47:14.497746','2024-05-11 07:30:51.716674',1,2,1,0),(3,'2024-03-18 09:47:25.758345','2024-05-11 07:23:40.977060',1,3,1,1),(4,'2024-05-10 01:35:04.226150','2024-05-10 03:05:32.107108',1,6,1,1),(5,'2024-05-10 03:06:16.835266','2024-05-11 07:26:59.262717',1,5,1,1),(6,'2024-05-10 03:20:57.536537','2024-05-10 03:21:01.644249',1,7,1,0),(7,'2024-05-10 10:06:21.987676','2024-05-10 12:25:25.163363',1,8,1,1);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_accesstoken`
--

DROP TABLE IF EXISTS `oauth2_provider_accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_accesstoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `source_refresh_token_id` bigint DEFAULT NULL,
  `id_token_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `source_refresh_token_id` (`source_refresh_token_id`),
  UNIQUE KEY `id_token_id` (`id_token_id`),
  KEY `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_acce_user_id_6e4c9a65_fk_soundclou` (`user_id`),
  CONSTRAINT `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_acce_id_token_id_85db651b_fk_oauth2_pr` FOREIGN KEY (`id_token_id`) REFERENCES `oauth2_provider_idtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_source_refresh_token_e66fbc72_fk_oauth2_pr` FOREIGN KEY (`source_refresh_token_id`) REFERENCES `oauth2_provider_refreshtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_user_id_6e4c9a65_fk_soundclou` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_accesstoken`
--

LOCK TABLES `oauth2_provider_accesstoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_accesstoken` VALUES (1,'M01xFl6OE7VdJSpKmJwdGl8bMPayF5','2024-03-20 00:46:09.265881','read write',1,1,'2024-03-19 14:46:09.266883','2024-03-19 14:46:09.266883',NULL,NULL),(2,'v7ZtHz5YYhbiucdSojfGOsH0IcRACZ','2024-04-22 19:39:57.076404','read write',1,1,'2024-04-22 09:39:57.076404','2024-04-22 09:39:57.076404',NULL,NULL),(3,'tL9okArEGASza2Zmj9nTCWwV6pZiOv','2024-04-22 19:42:49.337685','read write',1,1,'2024-04-22 09:42:49.337685','2024-04-22 09:42:49.337685',NULL,NULL),(4,'x260ju8hR6PBVVaXy7aJTvDcXkfZY8','2024-04-23 22:40:57.900344','read write',1,1,'2024-04-23 12:40:57.900344','2024-04-23 12:40:57.901344',NULL,NULL),(5,'XloHjPA4OjvaQw5hCfbFmcy7BWF2mh','2024-04-23 23:30:40.389031','read write',1,1,'2024-04-23 13:30:40.389031','2024-04-23 13:30:40.389031',NULL,NULL),(6,'v3ZZ3z9ohAclgdaDrzhW9n0FH0V4Bc','2024-04-24 12:22:02.114597','read write',1,1,'2024-04-24 02:22:02.114597','2024-04-24 02:22:02.114597',NULL,NULL),(7,'IdO5WReDRo0lPAlxkbkITf3jWECH9r','2024-04-24 12:22:09.651550','read write',1,1,'2024-04-24 02:22:09.651550','2024-04-24 02:22:09.651550',NULL,NULL),(8,'bAueks6W0qZXmiiCpRbvjdcU0x8yu9','2024-04-24 12:27:02.660292','read write',1,1,'2024-04-24 02:27:02.660292','2024-04-24 02:27:02.660292',NULL,NULL),(9,'VRkHEGEF6TWEmFMcmQk1JO8iRHsDiC','2024-04-24 12:27:02.674289','read write',1,1,'2024-04-24 02:27:02.674289','2024-04-24 02:27:02.674289',NULL,NULL),(10,'JJqbD4yFUFaimM97boDBLHMKcSAfaz','2024-04-24 12:27:14.726626','read write',1,1,'2024-04-24 02:27:14.726626','2024-04-24 02:27:14.726626',NULL,NULL),(11,'d3sUPPteBzOK5eNENRcpx291529bPI','2024-04-24 12:27:14.753625','read write',1,1,'2024-04-24 02:27:14.753625','2024-04-24 02:27:14.753625',NULL,NULL),(12,'Ka9rzawZOsOOzUol5jLAWVE1o0S80s','2024-04-24 12:36:04.405530','read write',1,1,'2024-04-24 02:36:04.406532','2024-04-24 02:36:04.406532',NULL,NULL),(13,'oylAF035QVGdnYeSOCekncU4vOBD6p','2024-04-24 12:36:04.432529','read write',1,1,'2024-04-24 02:36:04.433530','2024-04-24 02:36:04.433530',NULL,NULL),(14,'hQeJZlZhL52jAM7uIvSMrOchMSy1kl','2024-04-24 12:36:04.611529','read write',1,1,'2024-04-24 02:36:04.611529','2024-04-24 02:36:04.611529',NULL,NULL),(15,'lEa0UfFC0LtBT20ee3hzlLbVRFRVZg','2024-04-24 12:36:20.635397','read write',1,1,'2024-04-24 02:36:20.635397','2024-04-24 02:36:20.635397',NULL,NULL),(16,'oPOjqrAJWywedHTom1YVIIiJm2GeHF','2024-04-24 12:36:20.641395','read write',1,1,'2024-04-24 02:36:20.642395','2024-04-24 02:36:20.642395',NULL,NULL),(17,'F5CfLgUIZ2hrysaqfJCc6V4tQvSZab','2024-04-24 12:36:21.562805','read write',1,1,'2024-04-24 02:36:21.562805','2024-04-24 02:36:21.562805',NULL,NULL),(18,'BkwgLXUu0vRTd8szOGSZOQPlz10QBJ','2024-04-24 12:36:21.571805','read write',1,1,'2024-04-24 02:36:21.571805','2024-04-24 02:36:21.571805',NULL,NULL),(19,'7Y4HOkkFwFQu8iRZvCMAuJIqVAk3vB','2024-04-24 12:39:01.568436','read write',1,1,'2024-04-24 02:39:01.569435','2024-04-24 02:39:01.569435',NULL,NULL),(20,'bTKzbd2qBrM0d25TuJIRLhAFX3WLJR','2024-04-24 12:39:01.572436','read write',1,1,'2024-04-24 02:39:01.572436','2024-04-24 02:39:01.572436',NULL,NULL),(21,'EaiCptpwnQ4zh7cG2dwxNCbROLYb2J','2024-04-24 12:39:02.688878','read write',1,1,'2024-04-24 02:39:02.688878','2024-04-24 02:39:02.688878',NULL,NULL),(22,'Gv39FUJaUYBrTeliyOpFkw8vUJkABc','2024-04-24 12:39:02.701877','read write',1,1,'2024-04-24 02:39:02.702877','2024-04-24 02:39:02.702877',NULL,NULL),(23,'PMa0m9W1sdEXijD6AOSoe10sJCp5yU','2024-04-24 12:39:02.703878','read write',1,1,'2024-04-24 02:39:02.704883','2024-04-24 02:39:02.704883',NULL,NULL),(24,'sv6vvtPQZ9JvB2TNKM3nT28bNC7AVT','2024-04-24 12:39:12.117263','read write',1,1,'2024-04-24 02:39:12.118263','2024-04-24 02:39:12.118263',NULL,NULL),(25,'6VUn2SmrbfHZR73Szf0AvDVmpNWHdE','2024-04-24 12:39:12.133261','read write',1,1,'2024-04-24 02:39:12.133261','2024-04-24 02:39:12.133261',NULL,NULL),(26,'VRdorEdy4wJdgPlvyjOuOugef6kIL0','2024-04-24 12:48:54.813166','read write',1,1,'2024-04-24 02:48:54.813166','2024-04-24 02:48:54.813166',NULL,NULL),(27,'Aj1cqSAkoeBblibiygEZKWF7QLY1CO','2024-04-24 12:48:54.823167','read write',1,1,'2024-04-24 02:48:54.824167','2024-04-24 02:48:54.824167',NULL,NULL),(28,'95Wn2SwV8S26QhGyI8CSwKl4pvfkDx','2024-04-24 12:48:55.532784','read write',1,1,'2024-04-24 02:48:55.533785','2024-04-24 02:48:55.533785',NULL,NULL),(29,'GnfUe0sMpebhYw9GwQQcInb7H3wgoF','2024-04-24 12:52:11.362188','read write',1,1,'2024-04-24 02:52:11.363193','2024-04-24 02:52:11.363193',NULL,NULL),(30,'be8KWXAfvCrgPXluzSu1QYv1gMs9in','2024-04-24 12:52:11.409193','read write',1,1,'2024-04-24 02:52:11.409193','2024-04-24 02:52:11.409193',NULL,NULL),(31,'sP5jhgA3v54GzyGjJu6z6U2UfHyVm5','2024-04-24 12:52:11.418192','read write',1,1,'2024-04-24 02:52:11.418192','2024-04-24 02:52:11.418192',NULL,NULL),(32,'ct1aHhVo269KASc0yHu1LVFsEDCPtW','2024-04-24 12:52:11.499189','read write',1,1,'2024-04-24 02:52:11.499189','2024-04-24 02:52:11.499189',NULL,NULL),(33,'yh6dUVrBs8GB3cQD4ZQobftsZF9TcG','2024-04-24 12:53:31.888057','read write',1,1,'2024-04-24 02:53:31.889057','2024-04-24 02:53:31.889057',NULL,NULL),(34,'elvc3CDAeumZPgGEcoF0JUYCt5kJUB','2024-04-24 12:53:31.891055','read write',1,1,'2024-04-24 02:53:31.892065','2024-04-24 02:53:31.892065',NULL,NULL),(35,'ICmTyHWgrxZeIu1l9ndLbOU4Ya6X3u','2024-04-24 12:53:32.565054','read write',1,1,'2024-04-24 02:53:32.565054','2024-04-24 02:53:32.565054',NULL,NULL),(36,'q1lyy6Hi9Lp3ChZaAXmYO7wv4zOcn9','2024-04-24 12:53:32.588247','read write',1,1,'2024-04-24 02:53:32.588247','2024-04-24 02:53:32.588247',NULL,NULL),(37,'hHPpzaGjpNJWiZddsi09WnaX9KosV5','2024-04-24 12:53:32.651247','read write',1,1,'2024-04-24 02:53:32.651247','2024-04-24 02:53:32.651247',NULL,NULL),(38,'6NKh1q2KEyO8Xwb9JVo7Z6CWqOZ8zD','2024-04-24 12:54:21.769345','read write',1,1,'2024-04-24 02:54:21.769345','2024-04-24 02:54:21.769345',NULL,NULL),(39,'ahofGBRzPRAULVA4wbjoJ9QvMcP2EM','2024-04-24 12:54:21.773344','read write',1,1,'2024-04-24 02:54:21.773344','2024-04-24 02:54:21.773344',NULL,NULL),(40,'aEUGU727toA9ZolDARZSJGhx7iZppt','2024-04-24 12:55:56.876350','read write',1,1,'2024-04-24 02:55:56.877350','2024-04-24 02:55:56.877350',NULL,NULL),(41,'d1O9uxlRmod86zygPLlsM0TR6hZsEf','2024-04-24 12:55:56.900428','read write',1,1,'2024-04-24 02:55:56.900428','2024-04-24 02:55:56.900428',NULL,NULL),(42,'gC4DyAuwCjoOGUGA8sYCxJ473wfdF7','2024-04-24 12:55:57.540428','read write',1,1,'2024-04-24 02:55:57.541442','2024-04-24 02:55:57.541442',NULL,NULL),(43,'WrVocEIn2kppaVtMwXY4Cm3UHZNEko','2024-04-24 12:57:12.832839','read write',1,1,'2024-04-24 02:57:12.832839','2024-04-24 02:57:12.832839',NULL,NULL),(44,'PBDcFLzGRU95q4X5B6DSOvB0JPb2Fy','2024-04-24 12:57:12.843838','read write',1,1,'2024-04-24 02:57:12.843838','2024-04-24 02:57:12.843838',NULL,NULL),(45,'krbRKg7CuU2DRaq7jFA5G02JXpFOjI','2024-04-24 12:57:13.467863','read write',1,1,'2024-04-24 02:57:13.467863','2024-04-24 02:57:13.467863',NULL,NULL),(46,'0F9QquHg4lRhhkhuXUAkSZBX1v9uQn','2024-04-24 12:57:13.497863','read write',1,1,'2024-04-24 02:57:13.497863','2024-04-24 02:57:13.497863',NULL,NULL),(47,'1Ucrn9z3nfbRivfts6MnbDawpmH9Rr','2024-04-24 13:01:32.560117','read write',1,1,'2024-04-24 03:01:32.560117','2024-04-24 03:01:32.560117',NULL,NULL),(48,'cIzwFv9EvDQ6xtxl1ZQ2FEZIBB8XM1','2024-04-24 13:01:32.613682','read write',1,1,'2024-04-24 03:01:32.614117','2024-04-24 03:01:32.614117',NULL,NULL),(49,'ILzPequ18VxySf6m5vNXyxWotYOZka','2024-04-24 13:01:32.701118','read write',1,1,'2024-04-24 03:01:32.701118','2024-04-24 03:01:32.701118',NULL,NULL),(50,'oZFpIInzMayEPSilfWbVWc4jIVhUqp','2024-04-24 13:01:32.715116','read write',1,1,'2024-04-24 03:01:32.716117','2024-04-24 03:01:32.716117',NULL,NULL),(51,'GsT0BB19wYTym6DLU5lKnJi8AuUtv8','2024-04-24 13:01:32.731116','read write',1,1,'2024-04-24 03:01:32.731116','2024-04-24 03:01:32.731116',NULL,NULL),(52,'lITBQWkwlubkROcUzeDUoQOLYsrYn4','2024-04-24 13:06:35.214847','read write',1,1,'2024-04-24 03:06:35.215847','2024-04-24 03:06:35.215847',NULL,NULL),(53,'gdw9R9k48SZBVdbdA9cIGV0lVFXwPo','2024-04-24 13:06:35.237847','read write',1,1,'2024-04-24 03:06:35.238847','2024-04-24 03:06:35.238847',NULL,NULL),(54,'wdyVBGmAT2XP34M6i8z7Mz7Sd0b8xd','2024-04-24 13:06:35.805845','read write',1,1,'2024-04-24 03:06:35.806845','2024-04-24 03:06:35.806845',NULL,NULL),(55,'MpmQIDjn4hkxXw912gRKj7CjlNSQvi','2024-04-24 13:06:35.816846','read write',1,1,'2024-04-24 03:06:35.816846','2024-04-24 03:06:35.816846',NULL,NULL),(56,'DaURyxvny0NIZP795vr5Ai2ctsdqOu','2024-04-24 13:06:35.857846','read write',1,1,'2024-04-24 03:06:35.857846','2024-04-24 03:06:35.857846',NULL,NULL),(57,'cISQEv3n6ULPyiiJwWwnOQTSlNdhHo','2024-04-24 13:06:35.869845','read write',1,1,'2024-04-24 03:06:35.869845','2024-04-24 03:06:35.869845',NULL,NULL),(58,'z52h3qSCGJKOF3q78zFITSjkMjH9TY','2024-04-24 13:08:06.242786','read write',1,1,'2024-04-24 03:08:06.242786','2024-04-24 03:08:06.242786',NULL,NULL),(59,'mcNNke4qHNI1fvIoUpmjPP2pt08lZ5','2024-04-24 13:08:06.320786','read write',1,1,'2024-04-24 03:08:06.321789','2024-04-24 03:08:06.321789',NULL,NULL),(60,'4myuIO2LH5PnCshmgZVtiPEd9jFC2Y','2024-04-24 13:08:06.734786','read write',1,1,'2024-04-24 03:08:06.735787','2024-04-24 03:08:06.735787',NULL,NULL),(61,'AXRjtYYS6CEXAeL0p1uWvtK9Zo2T4m','2024-04-24 13:08:06.762884','read write',1,1,'2024-04-24 03:08:06.763884','2024-04-24 03:08:06.763884',NULL,NULL),(62,'c8Sd8oF1iZJoBd7cDiE14QzqmE3Ndr','2024-04-24 13:08:06.769884','read write',1,1,'2024-04-24 03:08:06.769884','2024-04-24 03:08:06.769884',NULL,NULL),(63,'JKbGz1DP7YqeBE0Hw3kxhuPqC7aWrO','2024-04-24 13:08:06.782884','read write',1,1,'2024-04-24 03:08:06.782884','2024-04-24 03:08:06.782884',NULL,NULL),(64,'gQe0v8Z0nsuDxyZZlAgefgoVAuei9o','2024-04-24 13:08:07.008645','read write',1,1,'2024-04-24 03:08:07.008645','2024-04-24 03:08:07.008645',NULL,NULL),(65,'3P8faymCslQPsy5jFmBsJUNhG346cN','2024-04-24 13:08:34.941379','read write',1,1,'2024-04-24 03:08:34.941379','2024-04-24 03:08:34.941379',NULL,NULL),(66,'wT08ErfqA9WtngqYav5yPgyrzehpVK','2024-04-24 13:08:34.996379','read write',1,1,'2024-04-24 03:08:34.997379','2024-04-24 03:08:34.997379',NULL,NULL),(67,'BeOc8TlMdHwJlTHUNNBPu4W3QRQrmf','2024-04-24 13:08:35.873501','read write',1,1,'2024-04-24 03:08:35.873501','2024-04-24 03:08:35.874502',NULL,NULL),(68,'km6JA72ICRfErM0PKuQDxvA1EgElZ0','2024-04-24 13:08:35.884502','read write',1,1,'2024-04-24 03:08:35.884502','2024-04-24 03:08:35.884502',NULL,NULL),(69,'xbpyTDTXVB3B7NPvHryF0K3NmhR6YF','2024-04-24 13:08:35.940526','read write',1,1,'2024-04-24 03:08:35.940526','2024-04-24 03:08:35.940526',NULL,NULL),(70,'y4oNIcyKRxTf55LrRw376cx08Y2PDu','2024-04-24 13:08:35.948525','read write',1,1,'2024-04-24 03:08:35.948525','2024-04-24 03:08:35.948525',NULL,NULL),(71,'OWD5yFR6U5d2DtFu8dFkTvsXa1VPhU','2024-04-24 13:08:35.965524','read write',1,1,'2024-04-24 03:08:35.965524','2024-04-24 03:08:35.965524',NULL,NULL),(72,'iwGJnWhLx4sNRQcJUW7LyfHxgqRRHj','2024-04-24 13:08:36.010525','read write',1,1,'2024-04-24 03:08:36.010525','2024-04-24 03:08:36.010525',NULL,NULL),(73,'4FdQ3klCbljcf1CiARteiSbQi9HiAe','2024-04-24 13:14:00.907885','read write',1,1,'2024-04-24 03:14:00.908900','2024-04-24 03:14:00.908900',NULL,NULL),(74,'ObexeyEIVvEBHoeTaphGNdlhIXrDOX','2024-04-24 13:14:00.925883','read write',1,1,'2024-04-24 03:14:00.925883','2024-04-24 03:14:00.925883',NULL,NULL),(75,'AhnnVgX9amH12IVsU7D7QUPTnCQo5T','2024-04-24 13:14:01.674063','read write',1,1,'2024-04-24 03:14:01.674063','2024-04-24 03:14:01.674063',NULL,NULL),(76,'dWFQExmW2N3E4ixqbNmgtIot0oYLGp','2024-04-24 13:14:01.754065','read write',1,1,'2024-04-24 03:14:01.754065','2024-04-24 03:14:01.754065',NULL,NULL),(77,'33N2r5iUMABI7rg82bK0wAqHkeO7S3','2024-04-24 13:14:01.784065','read write',1,1,'2024-04-24 03:14:01.785066','2024-04-24 03:14:01.785066',NULL,NULL),(78,'FGc2c4mSAwIIkp2gzPjliNtccg1UYt','2024-04-24 13:14:01.813064','read write',1,1,'2024-04-24 03:14:01.814065','2024-04-24 03:14:01.814065',NULL,NULL),(79,'d6JZvFYdX8U7IYqSSS2PDH1E5dIFK1','2024-04-24 13:14:01.845065','read write',1,1,'2024-04-24 03:14:01.845065','2024-04-24 03:14:01.845065',NULL,NULL),(80,'2DRX1y8gcunvl4Fx1UM1wuHrBe5BCe','2024-04-24 13:14:01.875075','read write',1,1,'2024-04-24 03:14:01.875075','2024-04-24 03:14:01.875075',NULL,NULL),(81,'XGRG8boRETeol2hkho3gSl54ojP3QP','2024-04-24 13:14:02.423073','read write',1,1,'2024-04-24 03:14:02.423073','2024-04-24 03:14:02.423073',NULL,NULL),(82,'ygyr9PIDnQZf46ZfzJTRMFhKWHxHFi','2024-04-24 13:19:28.618070','read write',1,1,'2024-04-24 03:19:28.618070','2024-04-24 03:19:28.618070',NULL,NULL),(83,'e2ykSZAeGhx56FrQffb0nmheo9fVQL','2024-04-24 13:19:28.619071','read write',1,1,'2024-04-24 03:19:28.619071','2024-04-24 03:19:28.619071',NULL,NULL),(84,'RquJ1LUDlW5I2nj0J1KCXM0dkDyB2N','2024-04-24 13:19:28.892186','read write',1,1,'2024-04-24 03:19:28.893186','2024-04-24 03:19:28.893186',NULL,NULL),(85,'4NU0Wgnz6f6gyoPQA3F0DjnUYhnhZv','2024-04-24 13:19:28.897186','read write',1,1,'2024-04-24 03:19:28.897186','2024-04-24 03:19:28.897186',NULL,NULL),(86,'3qvDDHDXlGlnsVjwHoqxcrU4HkmeiE','2024-04-24 13:19:28.920186','read write',1,1,'2024-04-24 03:19:28.921186','2024-04-24 03:19:28.921186',NULL,NULL),(87,'x0reSh49yRrNa2BtQuGBXUkKV5UF4V','2024-04-24 13:19:29.025189','read write',1,1,'2024-04-24 03:19:29.025189','2024-04-24 03:19:29.025189',NULL,NULL),(88,'mVQ7zTd7vLe6ueAPFjlHu9KjLPBOGP','2024-04-24 13:19:29.544189','read write',1,1,'2024-04-24 03:19:29.544189','2024-04-24 03:19:29.544189',NULL,NULL),(89,'BVnQZKxWuwEu59udskOMAK0o37oG1N','2024-04-24 13:19:29.596186','read write',1,1,'2024-04-24 03:19:29.596186','2024-04-24 03:19:29.596186',NULL,NULL),(90,'hpr09Jocjx81SWiu3QnW3HcasvyQRl','2024-04-24 13:19:29.742731','read write',1,1,'2024-04-24 03:19:29.742731','2024-04-24 03:19:29.742731',NULL,NULL),(91,'ZQDt8zKN4X7RRfBZ9eGocQFdHYHCdr','2024-04-24 13:19:29.748732','read write',1,1,'2024-04-24 03:19:29.748732','2024-04-24 03:19:29.748732',NULL,NULL),(92,'G6gsbSBx8eu2t9xt7mp5gOZhozk3eB','2024-04-24 13:26:39.736353','read write',1,1,'2024-04-24 03:26:39.737353','2024-04-24 03:26:39.737353',NULL,NULL),(93,'mGdKATOJlPU9XkvLK6x2SfSlphK4M2','2024-04-24 13:26:39.791356','read write',1,1,'2024-04-24 03:26:39.792355','2024-04-24 03:26:39.792355',NULL,NULL),(94,'O0tXXR3ZjxsVUY4ADoW91xYZWu2EEC','2024-04-24 13:26:39.814353','read write',1,1,'2024-04-24 03:26:39.814353','2024-04-24 03:26:39.814353',NULL,NULL),(95,'w00WBz0F9PqUeFSu7hpKMuhea7Gllr','2024-04-24 13:26:39.821353','read write',1,1,'2024-04-24 03:26:39.821353','2024-04-24 03:26:39.821353',NULL,NULL),(96,'2F5G7JctYHhrlEJ3ZQuh5Tse6D2HWY','2024-04-24 13:26:39.849354','read write',1,1,'2024-04-24 03:26:39.849354','2024-04-24 03:26:39.849354',NULL,NULL),(97,'E0qUb2i9PabKV6WS3toXNxIu3EO62D','2024-04-24 13:26:39.911073','read write',1,1,'2024-04-24 03:26:39.912073','2024-04-24 03:26:39.912073',NULL,NULL),(98,'wv570BNgUQyXX0Ytey9keefHBYPKdB','2024-04-24 13:26:40.663337','read write',1,1,'2024-04-24 03:26:40.664338','2024-04-24 03:26:40.664338',NULL,NULL),(99,'DieXAqElHrnFCgPJNLN2sl3MEklb1H','2024-04-24 13:26:40.682343','read write',1,1,'2024-04-24 03:26:40.682343','2024-04-24 03:26:40.682343',NULL,NULL),(100,'ZzhYb6Cbe4CXd9Ws2EyS2mExvKPINX','2024-04-24 13:26:40.720385','read write',1,1,'2024-04-24 03:26:40.720385','2024-04-24 03:26:40.720385',NULL,NULL),(101,'KwI3T6jOOqf8vDwHvDbeKujgasGLOe','2024-04-24 13:26:40.727340','read write',1,1,'2024-04-24 03:26:40.728344','2024-04-24 03:26:40.728344',NULL,NULL),(102,'ENtCJgcvCpyCUP7CuyHI21BsetD6Q0','2024-04-24 13:26:40.733340','read write',1,1,'2024-04-24 03:26:40.733340','2024-04-24 03:26:40.733340',NULL,NULL),(103,'5VUPmtkg2fieWCXf5wXMc3EvaCHgEu','2024-04-24 13:30:40.508297','read write',1,1,'2024-04-24 03:30:40.508297','2024-04-24 03:30:40.508297',NULL,NULL),(104,'DCpLPwKU2LkChJ67IubtbHI2gklhzw','2024-04-24 13:30:40.588300','read write',1,1,'2024-04-24 03:30:40.589299','2024-04-24 03:30:40.589299',NULL,NULL),(105,'9QYOhx3ezOIcifqJyfGFf66cox5Ez7','2024-04-24 13:30:40.892296','read write',1,1,'2024-04-24 03:30:40.892296','2024-04-24 03:30:40.892296',NULL,NULL),(106,'ASwBK3NYBUpuUfyUdGL2ZddHYHlawK','2024-04-24 13:30:40.897298','read write',1,1,'2024-04-24 03:30:40.897298','2024-04-24 03:30:40.897298',NULL,NULL),(107,'sZ5y5WWnO2aW7yeAu1TzpgfeOgmxvU','2024-04-24 13:30:40.913296','read write',1,1,'2024-04-24 03:30:40.913296','2024-04-24 03:30:40.913296',NULL,NULL),(108,'XZJcFSijSZsvEdJ0FFWaINBxmGly3t','2024-04-24 13:30:40.946297','read write',1,1,'2024-04-24 03:30:40.946297','2024-04-24 03:30:40.946297',NULL,NULL),(109,'tsSnplKPnDSVsBddmXreXy1TtXvd1M','2024-04-24 13:30:41.480298','read write',1,1,'2024-04-24 03:30:41.480298','2024-04-24 03:30:41.480298',NULL,NULL),(110,'5nKvBv2qLChzbCZTBgX7Zgjo5XAqRD','2024-04-24 13:30:41.507299','read write',1,1,'2024-04-24 03:30:41.507299','2024-04-24 03:30:41.507299',NULL,NULL),(111,'pZOrvHcL56veM8u3uVdmUR3bBodAbc','2024-04-24 13:30:41.825300','read write',1,1,'2024-04-24 03:30:41.825300','2024-04-24 03:30:41.825300',NULL,NULL),(112,'pG4pK5mjPWYYzluM3NSRlMV8SuJAKh','2024-04-24 13:30:41.851298','read write',1,1,'2024-04-24 03:30:41.851298','2024-04-24 03:30:41.851298',NULL,NULL),(113,'WMHlc0z1TmpOVlMRDS1hWi1dsBQlNI','2024-04-24 13:30:41.866297','read write',1,1,'2024-04-24 03:30:41.866297','2024-04-24 03:30:41.866297',NULL,NULL),(114,'om2i1k1nBgLn6ctjKfsClUbModtjPH','2024-04-24 13:30:41.868297','read write',1,1,'2024-04-24 03:30:41.868297','2024-04-24 03:30:41.868297',NULL,NULL),(115,'OYPTZYtmSzmEZxzRww1zAFW76xQ5HX','2024-04-24 13:31:33.018478','read write',1,1,'2024-04-24 03:31:33.018478','2024-04-24 03:31:33.018478',NULL,NULL),(116,'uuDXmRqi2frXRtHaAzYIbE5Bqe9Mt5','2024-04-24 13:31:33.019478','read write',1,1,'2024-04-24 03:31:33.019478','2024-04-24 03:31:33.019478',NULL,NULL),(117,'E6TqkxaQOF4cMtCDdw26RKAqtYNocy','2024-04-24 13:31:33.848589','read write',1,1,'2024-04-24 03:31:33.848589','2024-04-24 03:31:33.848589',NULL,NULL),(118,'qk5xuVBHI5EI1By9mooKphFnACEfY4','2024-04-24 13:31:33.974589','read write',1,1,'2024-04-24 03:31:33.975590','2024-04-24 03:31:33.975590',NULL,NULL),(119,'YBvGGaWgwIiUqwWvLxlQktlBe94kfm','2024-04-24 13:31:33.976590','read write',1,1,'2024-04-24 03:31:33.976590','2024-04-24 03:31:33.976590',NULL,NULL),(120,'QalSWeiEjypwvEMmTuPHGRBNX2yQtP','2024-04-24 13:31:33.995590','read write',1,1,'2024-04-24 03:31:33.995590','2024-04-24 03:31:33.995590',NULL,NULL),(121,'uoEfswGCkyIQnyYSK7EakRzS3pyovI','2024-04-24 13:31:34.102589','read write',1,1,'2024-04-24 03:31:34.103589','2024-04-24 03:31:34.103589',NULL,NULL),(122,'3MKPtflZLoZugG77PxB0tIrrp3qNnc','2024-04-24 13:31:34.183590','read write',1,1,'2024-04-24 03:31:34.184591','2024-04-24 03:31:34.184591',NULL,NULL),(123,'KJkKcGBGzQmpjr8UD2I3BPQLXXhYIv','2024-04-24 13:31:34.942209','read write',1,1,'2024-04-24 03:31:34.943210','2024-04-24 03:31:34.943210',NULL,NULL),(124,'qXsyVrWyLDkqBBkYlx4TFGtrghUXHl','2024-04-24 13:31:34.953210','read write',1,1,'2024-04-24 03:31:34.953210','2024-04-24 03:31:34.953210',NULL,NULL),(125,'LfC24Iq2v1q7A7uDhX2e5DX6MNrXmy','2024-04-24 13:31:34.974208','read write',1,1,'2024-04-24 03:31:34.975209','2024-04-24 03:31:34.975209',NULL,NULL),(126,'krkdS8iinqzqdacIi8phPop3F00TlQ','2024-04-24 13:31:34.976209','read write',1,1,'2024-04-24 03:31:34.976209','2024-04-24 03:31:34.976209',NULL,NULL),(127,'JX9KtxFRCZ0yvp18m6ETfghHIuoWBj','2024-04-24 13:31:35.110210','read write',1,1,'2024-04-24 03:31:35.110210','2024-04-24 03:31:35.110210',NULL,NULL),(128,'mNSKErG9K47qW45CfRwOEg6PkyGWOl','2024-04-24 13:32:32.825082','read write',1,1,'2024-04-24 03:32:32.825082','2024-04-24 03:32:32.825082',NULL,NULL),(129,'V58OXsUV23HJvLGYoGTVxzrcoDq1kA','2024-04-24 13:32:32.828082','read write',1,1,'2024-04-24 03:32:32.828082','2024-04-24 03:32:32.828082',NULL,NULL),(130,'wmqpfohIfooBFkFD51t97TPwZClJry','2024-04-24 13:32:33.861704','read write',1,1,'2024-04-24 03:32:33.862704','2024-04-24 03:32:33.862704',NULL,NULL),(131,'VLtg1jAm2xNUAOjIgbA3ey7onvUouj','2024-04-24 13:32:33.872706','read write',1,1,'2024-04-24 03:32:33.873703','2024-04-24 03:32:33.873703',NULL,NULL),(132,'M9TNQu7oq3J7cl9Jo0HnYFtYemfCOG','2024-04-24 13:32:33.895703','read write',1,1,'2024-04-24 03:32:33.895703','2024-04-24 03:32:33.895703',NULL,NULL),(133,'1Rf6tABQSULQTiMBnpNyjTrbWauoVT','2024-04-24 13:32:33.896703','read write',1,1,'2024-04-24 03:32:33.896703','2024-04-24 03:32:33.896703',NULL,NULL),(134,'fuD98mo6oeWUgu33vDYaZ721dwVQ0r','2024-04-24 13:32:33.936703','read write',1,1,'2024-04-24 03:32:33.937704','2024-04-24 03:32:33.937704',NULL,NULL),(135,'eaFQJMEX6wagBCRrPIeXhcdg6fmhTb','2024-04-24 13:32:34.004702','read write',1,1,'2024-04-24 03:32:34.004702','2024-04-24 03:32:34.004702',NULL,NULL),(136,'tdVJ00XfKcre3AdilR5AyhL6F5otJX','2024-04-24 13:32:34.786820','read write',1,1,'2024-04-24 03:32:34.786820','2024-04-24 03:32:34.786820',NULL,NULL),(137,'Txbvcocmkm7GlI60P4IaV83h7ntpR3','2024-04-24 13:32:34.850823','read write',1,1,'2024-04-24 03:32:34.851821','2024-04-24 03:32:34.851821',NULL,NULL),(138,'bqpVTXgB88Ct8vIR9EX3DFYGFsggWk','2024-04-24 13:32:34.903823','read write',1,1,'2024-04-24 03:32:34.903823','2024-04-24 03:32:34.903823',NULL,NULL),(139,'VMh3n3nlEkYCyw3LgjaXX5tFj3hLgB','2024-04-24 13:32:34.928825','read write',1,1,'2024-04-24 03:32:34.928825','2024-04-24 03:32:34.928825',NULL,NULL),(140,'h2KSuTeIh2I8VxX6IJFJXJ8zSCaGZb','2024-04-24 13:32:34.943821','read write',1,1,'2024-04-24 03:32:34.943821','2024-04-24 03:32:34.943821',NULL,NULL),(141,'FQ60lZvFV5DiRa8zIGtF5lHYxRsDTe','2024-04-24 13:32:34.986822','read write',1,1,'2024-04-24 03:32:34.987821','2024-04-24 03:32:34.987821',NULL,NULL),(142,'Y7bwtPbgma8RLGiQSjpUCzvY6fOo4A','2024-04-24 18:07:46.756540','read write',1,1,'2024-04-24 08:07:46.756540','2024-04-24 08:07:46.756540',NULL,NULL),(143,'3yjGfo4emns2miR4B7hHH1osjaOzJX','2024-04-24 18:07:46.768537','read write',1,1,'2024-04-24 08:07:46.768537','2024-04-24 08:07:46.768537',NULL,NULL),(144,'WoGBJ6qxWro4p2toKc6iCUSTSQaYaA','2024-04-24 18:07:51.149055','read write',1,1,'2024-04-24 08:07:51.149055','2024-04-24 08:07:51.149055',NULL,NULL),(145,'abMzuw6F8Ykk2hQo1ycyvT6kfGRUCy','2024-04-24 18:07:51.150056','read write',1,1,'2024-04-24 08:07:51.150056','2024-04-24 08:07:51.150056',NULL,NULL),(146,'GsmpsRdxNnvzNQfWvzNmZ4OyWJuvDV','2024-04-24 18:10:16.755302','read write',1,1,'2024-04-24 08:10:16.755302','2024-04-24 08:10:16.755302',NULL,NULL),(147,'7pmSv7HNDMt0kffVaMBKP2yALWMggH','2024-04-24 18:10:16.757469','read write',1,1,'2024-04-24 08:10:16.757469','2024-04-24 08:10:16.757469',NULL,NULL),(148,'9we8etHTSLycsUQ0nLUjp7Abfi3pap','2024-04-24 18:12:37.176145','read write',1,1,'2024-04-24 08:12:37.177146','2024-04-24 08:12:37.177146',NULL,NULL),(149,'JF9ZKHjxmiJm3E2SpQNSfM4wU2xDk9','2024-04-24 18:12:37.189553','read write',1,1,'2024-04-24 08:12:37.189553','2024-04-24 08:12:37.189553',NULL,NULL),(150,'QlLmUzWaCe59WR39FoytiPxzgc3baT','2024-04-24 18:13:26.847919','read write',1,1,'2024-04-24 08:13:26.847919','2024-04-24 08:13:26.847919',NULL,NULL),(151,'EQTk0Rogp2YGwf76qmnQqtWj5ej0Xn','2024-04-24 18:13:26.874920','read write',1,1,'2024-04-24 08:13:26.874920','2024-04-24 08:13:26.874920',NULL,NULL),(152,'cLixPUH5r4ms69F2YoNPGrjDrIgHQy','2024-04-24 18:14:50.646689','read write',1,1,'2024-04-24 08:14:50.647690','2024-04-24 08:14:50.647690',NULL,NULL),(153,'8hfLRkNzHB3QRdvvKqbCJfQrgOoRE3','2024-04-24 18:14:50.682689','read write',1,1,'2024-04-24 08:14:50.682689','2024-04-24 08:14:50.682689',NULL,NULL),(154,'HnRpgpXbtPLPanNxQBdsfWyIQbH1RJ','2024-04-24 18:24:37.268406','read write',1,1,'2024-04-24 08:24:37.268406','2024-04-24 08:24:37.268406',NULL,NULL),(155,'mlejTeZf9wmOmXjd3EGaFfTOYdJ8uQ','2024-04-24 18:24:37.294397','read write',1,1,'2024-04-24 08:24:37.294397','2024-04-24 08:24:37.294397',NULL,NULL),(156,'OmTmjJz1lkpNjfyWOfgY5B2gtCV9BE','2024-04-24 19:04:29.342809','read write',1,1,'2024-04-24 09:04:29.342809','2024-04-24 09:04:29.342809',NULL,NULL),(157,'pnhqZRcW4mkuNae9sYhuAljxzSS7Iw','2024-04-24 19:04:29.345810','read write',1,1,'2024-04-24 09:04:29.345810','2024-04-24 09:04:29.345810',NULL,NULL),(158,'iqaukwLGiZ9HTUK6yhvMfnm3tbgzIl','2024-04-24 19:06:08.344371','read write',1,1,'2024-04-24 09:06:08.345376','2024-04-24 09:06:08.345376',NULL,NULL),(159,'mXYraLT5edIfyBVfTTlFpwpqeQ4TX1','2024-04-24 19:06:08.373384','read write',1,1,'2024-04-24 09:06:08.373384','2024-04-24 09:06:08.373384',NULL,NULL),(160,'fqrH6JkCaoEvPrmrkVdbRHCbHTxatE','2024-04-24 19:06:08.907542','read write',1,1,'2024-04-24 09:06:08.907542','2024-04-24 09:06:08.907542',NULL,NULL),(161,'FU8WLfQ3VZnj9IMsNrChdclqvdP2lg','2024-04-24 19:06:08.930540','read write',1,1,'2024-04-24 09:06:08.931542','2024-04-24 09:06:08.931542',NULL,NULL),(162,'UGCRdgCT3KiQUC4Sw9yiRSyQOsBnvc','2024-04-24 19:06:12.384588','read write',1,1,'2024-04-24 09:06:12.384588','2024-04-24 09:06:12.384588',NULL,NULL),(163,'zFGDsBz6ng2i3lUnbpXNEl3prTXQNu','2024-04-24 19:06:12.394587','read write',1,1,'2024-04-24 09:06:12.395588','2024-04-24 09:06:12.395588',NULL,NULL),(164,'k1RkNkCUu4GqjkoRjd2oh6Jnmc2oKr','2024-04-24 19:17:56.056961','read write',1,1,'2024-04-24 09:17:56.056961','2024-04-24 09:17:56.056961',NULL,NULL),(165,'3gobvHOGmpLIg35eeVtMl5K9YK2FQ9','2024-04-24 19:17:56.060960','read write',1,1,'2024-04-24 09:17:56.060960','2024-04-24 09:17:56.060960',NULL,NULL),(166,'8RdEkFqFO3GSzhrYcjRcLZEM16RfzR','2024-04-24 19:22:01.877608','read write',1,1,'2024-04-24 09:22:01.878608','2024-04-24 09:22:01.878608',NULL,NULL),(167,'5JHDo7Bxvy1yHqHKPIoy8Aj7P5M7X8','2024-04-24 19:22:01.879609','read write',1,1,'2024-04-24 09:22:01.879609','2024-04-24 09:22:01.879609',NULL,NULL),(168,'Vo4gMMaBMSZWKZq9qXLLp3HuxHs3o4','2024-04-28 12:07:35.339315','read write',1,1,'2024-04-28 02:07:35.339315','2024-04-28 02:07:35.339315',NULL,NULL),(169,'tVZt6SGjkiziheoHowmVmEcJ2thojy','2024-04-28 12:07:35.347318','read write',1,1,'2024-04-28 02:07:35.347318','2024-04-28 02:07:35.347318',NULL,NULL),(170,'3CigPk4h71jiNifGWTojDElDLAoO5X','2024-04-28 12:07:39.095262','read write',1,1,'2024-04-28 02:07:39.095262','2024-04-28 02:07:39.095262',NULL,NULL),(171,'ibLXya4PY7zYLgAAL1iUzIDDoWPABj','2024-04-28 12:07:39.096264','read write',1,1,'2024-04-28 02:07:39.096264','2024-04-28 02:07:39.096264',NULL,NULL),(172,'m8AfrJBLN3eXhlvpgUFSdoPbELEvPp','2024-04-28 12:08:57.514483','read write',1,1,'2024-04-28 02:08:57.514483','2024-04-28 02:08:57.514483',NULL,NULL),(173,'94JuyritsTF9I1BxGf3wkVHtJjG7rZ','2024-04-28 12:08:57.565485','read write',1,1,'2024-04-28 02:08:57.565485','2024-04-28 02:08:57.565485',NULL,NULL),(174,'OARADn3lJr5GJqpSz06dNuR1EoF24V','2024-04-28 12:08:57.874484','read write',1,1,'2024-04-28 02:08:57.874484','2024-04-28 02:08:57.874484',NULL,NULL),(175,'0FJSvV5BIhJXmnMfWyeM2upSiMdO4l','2024-04-28 12:14:50.966609','read write',1,1,'2024-04-28 02:14:50.966609','2024-04-28 02:14:50.966609',NULL,NULL),(176,'KliVxBsqIdiqcfoWs9tL1MsOiaLesJ','2024-04-28 12:14:50.982607','read write',1,1,'2024-04-28 02:14:50.982607','2024-04-28 02:14:50.982607',NULL,NULL),(177,'5LYpIiPn6ITFv7J30QaIkkKrhJuhAb','2024-04-28 12:25:59.578128','read write',1,1,'2024-04-28 02:25:59.579126','2024-04-28 02:25:59.579126',NULL,NULL),(178,'ubsC9Sljl2OtQOiCkgYtQlhqJgYSWj','2024-04-28 12:25:59.595125','read write',1,1,'2024-04-28 02:25:59.595125','2024-04-28 02:25:59.595125',NULL,NULL),(179,'cqoQegjgOOjqR92loV1HAhRbmrKUEY','2024-05-02 18:02:31.526835','read write',1,1,'2024-05-02 08:02:31.527823','2024-05-02 08:02:31.527823',NULL,NULL),(180,'NuyfxCUXofjNT4wh7CrsKrkAT8srZG','2024-05-02 18:02:48.289012','read write',1,1,'2024-05-02 08:02:48.289012','2024-05-02 08:02:48.289012',NULL,NULL),(181,'SzwMEz8sFX0MECIztYKuVYmb76LNGg','2024-05-02 18:03:13.897507','read write',1,1,'2024-05-02 08:03:13.898507','2024-05-02 08:03:13.898507',NULL,NULL),(182,'PthrfwDl6dZ9Cd35EqjkxSgzaPvKOd','2024-05-02 18:45:21.965348','read write',1,1,'2024-05-02 08:45:21.966622','2024-05-02 08:45:21.966622',NULL,NULL),(183,'gcfTRjPBQcwY1wPEuhyjzWnl9XiA0E','2024-05-02 18:46:56.163278','read write',1,1,'2024-05-02 08:46:56.163278','2024-05-02 08:46:56.163278',NULL,NULL),(184,'nSqUufXQwcZBcoV0mfLaiiEuVlsqqq','2024-05-02 23:41:15.451461','read write',1,1,'2024-05-02 13:41:15.451461','2024-05-02 13:41:15.451461',NULL,NULL),(185,'OferJnGqdd0hCdiI7cn5COYaOP0SXx','2024-05-03 19:02:18.384679','read write',1,1,'2024-05-03 09:02:18.384679','2024-05-03 09:02:18.384679',NULL,NULL),(186,'nFg9oboqaEbGFSCm9Pw8HWCDTG9RrP','2024-05-04 17:39:22.994098','read write',1,1,'2024-05-04 07:39:22.994098','2024-05-04 07:39:22.994098',NULL,NULL),(187,'NiUnoxpmo5GpUPYmr6er5LdLu79uyr','2024-05-04 17:40:28.047381','read write',1,1,'2024-05-04 07:40:28.048381','2024-05-04 07:40:28.048381',NULL,NULL),(188,'9d1Ep8WDXKBuI9ITmT8ZKydWYAwMkh','2024-05-04 19:46:27.829733','read write',1,1,'2024-05-04 09:46:27.830734','2024-05-04 09:46:27.830734',NULL,NULL),(189,'08T5HpzBT7fMKY04frnvDVaZy1daPn','2024-05-04 19:55:15.092677','read write',1,1,'2024-05-04 09:55:15.092677','2024-05-04 09:55:15.092677',NULL,NULL),(190,'iTiJsh1dICIU8alNU4SlhfxWSB2pFn','2024-05-05 12:11:04.586158','read write',1,1,'2024-05-05 02:11:04.587159','2024-05-05 02:11:04.587159',NULL,NULL),(191,'KukAmoZ41i0iN8Dgq1KoddpTNjmLOX','2024-05-05 17:16:06.598138','read write',1,1,'2024-05-05 07:16:06.599137','2024-05-05 07:16:06.599137',NULL,NULL),(192,'XsxAryVAOVdNhnaxMtiYwE7zOXmOh8','2024-05-06 11:49:44.974441','read write',1,1,'2024-05-06 01:49:44.974441','2024-05-06 01:49:44.974441',NULL,NULL),(193,'AnV94QiCYcJ5QIigg3K2NR23cCbnGw','2024-05-06 17:54:05.811344','read write',1,1,'2024-05-06 07:54:05.811344','2024-05-06 07:54:05.811344',NULL,NULL),(194,'ZHIZk1PuvYnQ0ZVtL4mvje3CYklLWc','2024-05-06 17:55:39.178478','read write',1,1,'2024-05-06 07:55:39.178478','2024-05-06 07:55:39.178478',NULL,NULL),(195,'kU72QIBKWfIEpNGsdOH6U9yNuK8pu4','2024-05-06 17:57:58.664135','read write',1,1,'2024-05-06 07:57:58.664135','2024-05-06 07:57:58.664135',NULL,NULL),(196,'et8nLEMMygnZV032FbRTfAsCLVWRDw','2024-05-06 18:01:09.226069','read write',1,1,'2024-05-06 08:01:09.227070','2024-05-06 08:01:09.227070',NULL,NULL),(197,'g50u5gdWJ7FHAGAhbJNddzslqxRNRR','2024-05-06 18:01:46.548495','read write',1,1,'2024-05-06 08:01:46.548495','2024-05-06 08:01:46.548495',NULL,NULL),(198,'QEdmcvduSNzvLuvCJkPHIqwe7aSn6y','2024-05-06 18:09:03.355690','read write',1,1,'2024-05-06 08:09:03.355690','2024-05-06 08:09:03.355690',NULL,NULL),(199,'mXdLjP1af7v4nNIWrcdjQPgBW66fg1','2024-05-06 18:22:22.012769','read write',1,1,'2024-05-06 08:22:22.012769','2024-05-06 08:22:22.012769',NULL,NULL),(200,'S3sl1W6qYTwOzXAXsBTu95EqwzthuA','2024-05-06 18:23:47.471512','read write',1,1,'2024-05-06 08:23:47.472512','2024-05-06 08:23:47.472512',NULL,NULL),(201,'rOdPyBmGnrlOOTu1geohFwDSKQWNk8','2024-05-09 13:05:51.969161','read write',1,1,'2024-05-09 03:05:51.974162','2024-05-09 03:05:51.974162',NULL,NULL),(202,'YJQNovhbiSth7Yu4A0u88mmn0QywPS','2024-05-09 13:07:43.824134','read write',1,1,'2024-05-09 03:07:43.824134','2024-05-09 03:07:43.824134',NULL,NULL),(203,'atlz0AqTyNpaKkb60fKksanKiRCMkb','2024-05-09 17:38:20.930964','read write',1,1,'2024-05-09 07:38:20.931964','2024-05-09 07:38:20.931964',NULL,NULL),(204,'c3YQ8PhaRcTFKD8rUTqhhEKb5tNnKu','2024-05-10 11:29:42.156831','read write',1,1,'2024-05-10 01:29:42.156831','2024-05-10 01:29:42.156831',NULL,NULL),(205,'VhG3ZPNS7URxmORnq3M4p7CzTaD9M0','2024-05-10 22:24:00.852535','read write',1,1,'2024-05-10 12:24:00.852535','2024-05-10 12:24:00.852535',NULL,NULL),(206,'kiwtRNr0vJAIFvg3PGpEtXhFAsRSlM','2024-05-11 11:13:34.560608','read write',1,1,'2024-05-11 01:13:34.560608','2024-05-11 01:13:34.560608',NULL,NULL),(207,'j3zeY5AGq3f3hYNYsd79bYrgXogIJ0','2024-05-11 19:21:46.701692','read write',1,1,'2024-05-11 09:21:46.701692','2024-05-11 09:21:46.701692',NULL,NULL),(208,'zY7ZxEWFifRLlQpQQTSkbRqnDFQkcg','2024-05-12 11:28:41.186288','read write',1,1,'2024-05-12 01:28:41.187287','2024-05-12 01:28:41.187287',NULL,NULL),(210,'cU9gV454ZVR2zzrpCL1sbst9akKmIP','2024-05-12 11:47:39.065217','read write',1,1,'2024-05-12 01:47:39.084217','2024-05-12 01:47:39.084217',209,NULL),(212,'x8NwtpWytqLfda8dRhGL2AaVBEryDS','2024-05-12 11:58:54.814066','read write',1,1,'2024-05-12 01:58:54.821063','2024-05-12 01:58:54.821063',211,NULL),(217,'iIFd8tq3DZh6JFfNS4JdEtgKmtelEI','2024-05-12 12:15:10.965922','read write',1,1,'2024-05-12 02:15:10.975925','2024-05-12 02:15:10.975925',216,NULL),(219,'qJ6rjBtbR2GcY2nDEMXJmAtNOD6qY3','2024-05-12 12:18:46.731657','read write',1,1,'2024-05-12 02:18:46.739660','2024-05-12 02:18:46.739660',218,NULL),(221,'P5vZi92NLco8RPgAivyJElhgqoWwJC','2024-05-12 12:20:41.127785','read write',1,1,'2024-05-12 02:20:41.137803','2024-05-12 02:20:41.137803',220,NULL),(227,'PqdQh5RutS5FG77IaENzpUupjnMFmG','2024-05-12 12:22:38.736603','read write',1,1,'2024-05-12 02:22:38.746604','2024-05-12 02:22:38.746604',226,NULL),(228,'OaXNioiahVOzKi0skkFM9cpByyRzd5','2024-05-12 13:46:36.072981','read write',1,1,'2024-05-12 03:46:36.073980','2024-05-12 03:46:36.073980',NULL,NULL),(229,'tSmv7eRd9BjplcBTk835zqNx2lfEQh','2024-05-12 13:47:07.896470','read write',1,1,'2024-05-12 03:47:07.896470','2024-05-12 03:47:07.896470',NULL,NULL),(230,'dLh8mgW7zxdfmR4h9ucJVmSrIj8jn8','2024-05-12 13:47:57.186430','read write',1,1,'2024-05-12 03:47:57.186430','2024-05-12 03:47:57.186430',NULL,NULL);
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_application`
--

DROP TABLE IF EXISTS `oauth2_provider_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_application` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `client_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect_uris` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorization_grant_type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_secret` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `skip_authorization` tinyint(1) NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `algorithm` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_logout_redirect_uris` longtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (_utf8mb3''),
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id` (`client_id`),
  KEY `oauth2_provider_appl_user_id_79829054_fk_soundclou` (`user_id`),
  KEY `oauth2_provider_application_client_secret_53133678` (`client_secret`),
  CONSTRAINT `oauth2_provider_appl_user_id_79829054_fk_soundclou` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_application`
--

LOCK TABLES `oauth2_provider_application` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_application` DISABLE KEYS */;
INSERT INTO `oauth2_provider_application` VALUES (1,'h6rqnFxmhiJMBO5VEV2fBHJTACDEcw80xheZQZBk','','confidential','password','pbkdf2_sha256$600000$tJKKNmRVAvLyh5qzJd4mu8$oo7rkppVjpXdyxw0yC2mlc+nRHEOqDGPb1MHA9uThxY=','SoundCloudApp',1,0,'2024-03-18 07:01:05.158026','2024-03-18 07:01:05.158026','','');
/*!40000 ALTER TABLE `oauth2_provider_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_grant`
--

DROP TABLE IF EXISTS `oauth2_provider_grant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_grant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `redirect_uri` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `code_challenge` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_challenge_method` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nonce` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `claims` longtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (_utf8mb3''),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_grant_user_id_e8f62af8_fk_soundcloud_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_grant_user_id_e8f62af8_fk_soundcloud_user_id` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_grant`
--

LOCK TABLES `oauth2_provider_grant` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_grant` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_grant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_idtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_idtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_idtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `jti` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jti` (`jti`),
  KEY `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_idtoken_user_id_dd512b59_fk_soundcloud_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_idtoken_user_id_dd512b59_fk_soundcloud_user_id` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_idtoken`
--

LOCK TABLES `oauth2_provider_idtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_refreshtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_refreshtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` bigint DEFAULT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `revoked` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_token_id` (`access_token_id`),
  UNIQUE KEY `oauth2_provider_refreshtoken_token_revoked_af8a5134_uniq` (`token`,`revoked`),
  KEY `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_refr_user_id_da837fce_fk_soundclou` (`user_id`),
  CONSTRAINT `oauth2_provider_refr_access_token_id_775e84e8_fk_oauth2_pr` FOREIGN KEY (`access_token_id`) REFERENCES `oauth2_provider_accesstoken` (`id`),
  CONSTRAINT `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_refr_user_id_da837fce_fk_soundclou` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_refreshtoken`
--

LOCK TABLES `oauth2_provider_refreshtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_refreshtoken` VALUES (1,'fxEk5mlKrvXvpoq2qlVLVeCdEmUWnl',1,1,1,'2024-03-19 14:46:09.273881','2024-03-19 14:46:09.273881',NULL),(2,'MSihgh7dS4VX0gjPdbmLCTULcmLwwL',2,1,1,'2024-04-22 09:39:57.092404','2024-04-22 09:39:57.092404',NULL),(3,'WZ1e6K4ZntL2jU42Z0Vjdt0A2GP7zN',3,1,1,'2024-04-22 09:42:49.339683','2024-04-22 09:42:49.339683',NULL),(4,'BiDM2HKTaNTvv4R2dOc8Qh6DZsr06A',4,1,1,'2024-04-23 12:40:57.907344','2024-04-23 12:40:57.907344',NULL),(5,'i56HaAI6KyY1PieNqJ5JpVZ052muhS',5,1,1,'2024-04-23 13:30:40.390031','2024-04-23 13:30:40.390031',NULL),(6,'U5CUylRS6TmMnklAnaHILUdr4rP59M',6,1,1,'2024-04-24 02:22:02.120597','2024-04-24 02:22:02.120597',NULL),(7,'bOkOO0pcaKP5ieHL33bwOTsWwQD8Mp',7,1,1,'2024-04-24 02:22:09.655553','2024-04-24 02:22:09.655553',NULL),(8,'FAIFT43rS2ODLlq3dmCTskkCkK336L',8,1,1,'2024-04-24 02:27:02.661319','2024-04-24 02:27:02.661319',NULL),(9,'K96U4gqtGNACNYE9ucjkNFEVt8vz4N',9,1,1,'2024-04-24 02:27:02.676290','2024-04-24 02:27:02.676290',NULL),(10,'9IRGJszkHBQx86OYInU0VdqS1LwV87',10,1,1,'2024-04-24 02:27:14.729624','2024-04-24 02:27:14.729624',NULL),(11,'qWMzTT1E2cD2LrmOCOKLZzwdPEiEjk',11,1,1,'2024-04-24 02:27:14.755625','2024-04-24 02:27:14.755625',NULL),(12,'FBk5YCH32POKNUp2uQfBTaclKaXZPg',12,1,1,'2024-04-24 02:36:04.407544','2024-04-24 02:36:04.407544',NULL),(13,'LFds0YVsyWcCnQy0ui5FPYEcQU6dbE',13,1,1,'2024-04-24 02:36:04.433530','2024-04-24 02:36:04.433530',NULL),(14,'h7SUng8Ykk00wWVMY02Kgf8857XgS9',14,1,1,'2024-04-24 02:36:04.615532','2024-04-24 02:36:04.615532',NULL),(15,'IkdWZuviGH1binPybcZbBNv1LS5FQr',15,1,1,'2024-04-24 02:36:20.638399','2024-04-24 02:36:20.638399',NULL),(16,'3PKd9yQic8jvDlq38HQxG54z0DafaW',16,1,1,'2024-04-24 02:36:20.643398','2024-04-24 02:36:20.643398',NULL),(17,'1LmHI07ajgxFmk2cwdg39W4GYkrspM',17,1,1,'2024-04-24 02:36:21.563805','2024-04-24 02:36:21.563805',NULL),(18,'SelvNrC6Gs7hN5Vs32tfJR1J71MpNp',18,1,1,'2024-04-24 02:36:21.573805','2024-04-24 02:36:21.573805',NULL),(19,'2NFfSoZVBdbADOE1HeHlEdssuT82h7',19,1,1,'2024-04-24 02:39:01.571435','2024-04-24 02:39:01.571435',NULL),(20,'LGVlK8MEVvGScz6js2sekBDKqBynBX',20,1,1,'2024-04-24 02:39:01.574435','2024-04-24 02:39:01.574435',NULL),(21,'0z6S7mZYA0ZujJnd5kPKTSaZ05rP8m',21,1,1,'2024-04-24 02:39:02.689879','2024-04-24 02:39:02.689879',NULL),(22,'0EkMLRxSWDl2EbZgm9K0SYHjO6NCPx',22,1,1,'2024-04-24 02:39:02.702877','2024-04-24 02:39:02.702877',NULL),(23,'OOA8nYGyNaixgytuYnhrtOvZKACjZr',23,1,1,'2024-04-24 02:39:02.704883','2024-04-24 02:39:02.704883',NULL),(24,'X981lbW0b1hoY45JknlIZ69Az0blM6',24,1,1,'2024-04-24 02:39:12.121263','2024-04-24 02:39:12.121263',NULL),(25,'gmo29zexKeAkULsFNMACtnyeLAn3Vj',25,1,1,'2024-04-24 02:39:12.134261','2024-04-24 02:39:12.134261',NULL),(26,'YTfHXNYmTkGY1iVlZgYbCMtP0H720W',26,1,1,'2024-04-24 02:48:54.816165','2024-04-24 02:48:54.816165',NULL),(27,'QAjUCSNJ23hI2TNLQDj5SeuxvAjAVd',27,1,1,'2024-04-24 02:48:54.825166','2024-04-24 02:48:54.825166',NULL),(28,'607EKNDwCC9aOzKyoRZBXa33zEJmbm',28,1,1,'2024-04-24 02:48:55.533785','2024-04-24 02:48:55.533785',NULL),(29,'7PKKs5xjYnIWVpvu4m0MSAGPR6XjjV',29,1,1,'2024-04-24 02:52:11.365190','2024-04-24 02:52:11.365190',NULL),(30,'syPIWveCBqZ4goNb9T9zzDCEAucpd5',30,1,1,'2024-04-24 02:52:11.411194','2024-04-24 02:52:11.411194',NULL),(31,'RuizBChZXrYBvyNr6occJSRZmasITj',31,1,1,'2024-04-24 02:52:11.419192','2024-04-24 02:52:11.419192',NULL),(32,'6oB4rvgtkAvO8wcNQ5HTphScL0zCIC',32,1,1,'2024-04-24 02:52:11.500199','2024-04-24 02:52:11.500199',NULL),(33,'kCLwXQ95vEGIsInKf2PTMIn9ZbkddE',33,1,1,'2024-04-24 02:53:31.890056','2024-04-24 02:53:31.890056',NULL),(34,'Ewzv2IGIMPAVwaHKpBWY3DdrxLYgOA',34,1,1,'2024-04-24 02:53:31.894060','2024-04-24 02:53:31.894060',NULL),(35,'m3hrK93A85uKuySvVXOvbpegGRaGjs',35,1,1,'2024-04-24 02:53:32.566056','2024-04-24 02:53:32.566056',NULL),(36,'HDITgzGS8H7AZoNRJWmlBJ0xeKfJOf',36,1,1,'2024-04-24 02:53:32.589248','2024-04-24 02:53:32.589248',NULL),(37,'BGadfRs1AF8xiy1kQPvDI0sy221oHO',37,1,1,'2024-04-24 02:53:32.652247','2024-04-24 02:53:32.652247',NULL),(38,'3qVZ8v2KXWXGLc5tbfHie0DLD6mwJH',38,1,1,'2024-04-24 02:54:21.771344','2024-04-24 02:54:21.771344',NULL),(39,'lW1GB3Z73WsQcAJcLlot4qOkHE2cWl',39,1,1,'2024-04-24 02:54:21.774345','2024-04-24 02:54:21.774345',NULL),(40,'vtXaAi9K2avdMBetuQh7TWpmxEv14E',40,1,1,'2024-04-24 02:55:56.878351','2024-04-24 02:55:56.878351',NULL),(41,'Gi9Tl4empNRPR39wAxfRUV5ZZMsjlN',41,1,1,'2024-04-24 02:55:56.902429','2024-04-24 02:55:56.902429',NULL),(42,'33LvXIHqcyNEgKZODxLu1YANFt7u3W',42,1,1,'2024-04-24 02:55:57.542429','2024-04-24 02:55:57.542429',NULL),(43,'pT3HdYPXqUgyt7Ue2XrV7k88qpujpm',43,1,1,'2024-04-24 02:57:12.833837','2024-04-24 02:57:12.833837',NULL),(44,'d6ccvAQsHUfKLkVBXSIRdnpZmxMwHT',44,1,1,'2024-04-24 02:57:12.845837','2024-04-24 02:57:12.845837',NULL),(45,'bBXc4WHzsSB4YCc3UcZtODCAdOgPpE',45,1,1,'2024-04-24 02:57:13.470870','2024-04-24 02:57:13.470870',NULL),(46,'aWAr8dcLHFbSaVZibddg2JuxywhxhX',46,1,1,'2024-04-24 02:57:13.498864','2024-04-24 02:57:13.498864',NULL),(47,'ODSdCnnVvjRnnYM2b6bRBj0lEsSpX0',47,1,1,'2024-04-24 03:01:32.565120','2024-04-24 03:01:32.565120',NULL),(48,'mCKH0pGUHRmUAsGoAw1UYcY9D7fDLK',48,1,1,'2024-04-24 03:01:32.615120','2024-04-24 03:01:32.615120',NULL),(49,'iUvXzuo18LbFOQEoLA7n8hXhFq45tB',49,1,1,'2024-04-24 03:01:32.702117','2024-04-24 03:01:32.702117',NULL),(50,'d8OdefnppeWls9PaSZGOAToPqafXmS',50,1,1,'2024-04-24 03:01:32.717117','2024-04-24 03:01:32.717117',NULL),(51,'Sahwy1hVX0Rhsp5AawsZ8VFm2zGHkV',51,1,1,'2024-04-24 03:01:32.732117','2024-04-24 03:01:32.732117',NULL),(52,'Y1wSVPCuVgpW0by1gGM5rhQLUnhaf8',52,1,1,'2024-04-24 03:06:35.216848','2024-04-24 03:06:35.217846',NULL),(53,'R7KHpZlyhsl96RkQAj8YgC0S5cwNFO',53,1,1,'2024-04-24 03:06:35.239847','2024-04-24 03:06:35.239847',NULL),(54,'wNSAMY4sS7epGMkYkscSkQ2dNWi9Sf',54,1,1,'2024-04-24 03:06:35.807845','2024-04-24 03:06:35.807845',NULL),(55,'I0TAkAc0M6yjamv9M9Es5OGQfgFRpz',55,1,1,'2024-04-24 03:06:35.817847','2024-04-24 03:06:35.817847',NULL),(56,'t876M6YxBsvoOIn4acZR8ncvGKQyxm',56,1,1,'2024-04-24 03:06:35.858848','2024-04-24 03:06:35.858848',NULL),(57,'2zlcSjBSKstfDMHFLDjPL0oKhCbQyo',57,1,1,'2024-04-24 03:06:35.871846','2024-04-24 03:06:35.871846',NULL),(58,'PqNKjF0fQsBASA2kP1VWuWINIJ2IAl',58,1,1,'2024-04-24 03:08:06.245786','2024-04-24 03:08:06.245786',NULL),(59,'Ybq82S4xurKMGDKs59B7fvk8UFQtFT',59,1,1,'2024-04-24 03:08:06.322789','2024-04-24 03:08:06.322789',NULL),(60,'eAWhMmPFSHKHy1bVqLBcTBfCfsiqa0',60,1,1,'2024-04-24 03:08:06.736786','2024-04-24 03:08:06.736786',NULL),(61,'5kYM0b8mStsZnT4fwXYMcG6qi3xSw9',61,1,1,'2024-04-24 03:08:06.763884','2024-04-24 03:08:06.763884',NULL),(62,'PYDX1XHhRbE1sEwkyaCIpsjBf2RZFM',62,1,1,'2024-04-24 03:08:06.770883','2024-04-24 03:08:06.770883',NULL),(63,'hjnl63Nvre161PEeTcrOyvhpYa5fyG',63,1,1,'2024-04-24 03:08:06.783950','2024-04-24 03:08:06.783950',NULL),(64,'GxJ9bA6OFtmB8J6iAv8U5x3rq2nQuM',64,1,1,'2024-04-24 03:08:07.008645','2024-04-24 03:08:07.008645',NULL),(65,'FVSypW9iYMCniwqb9skhsS4ObMBamd',65,1,1,'2024-04-24 03:08:34.942380','2024-04-24 03:08:34.942380',NULL),(66,'bZmYHrIqT7lFWw1xzjHwgIPYeJp0yL',66,1,1,'2024-04-24 03:08:34.999379','2024-04-24 03:08:34.999379',NULL),(67,'TdeM7evWc1AhJ4Ove4dUzmV52gWntJ',67,1,1,'2024-04-24 03:08:35.874502','2024-04-24 03:08:35.874502',NULL),(68,'S4VwB2zr48YaHkSsi4Q7ZwVmCU0qRJ',68,1,1,'2024-04-24 03:08:35.885506','2024-04-24 03:08:35.885506',NULL),(69,'AmELbcrHdkS8mU2hQ4tpgL6T7MSjwk',69,1,1,'2024-04-24 03:08:35.941525','2024-04-24 03:08:35.941525',NULL),(70,'GwcOQIZQrZZw6WuGwIe2d9gIhq7V66',70,1,1,'2024-04-24 03:08:35.949525','2024-04-24 03:08:35.949525',NULL),(71,'5dYaz3xeYVBickJjyqBX2fwO2bcYDn',71,1,1,'2024-04-24 03:08:35.966525','2024-04-24 03:08:35.966525',NULL),(72,'0yF88ehGU84XyKI40kjZwk9dx2GT8U',72,1,1,'2024-04-24 03:08:36.011525','2024-04-24 03:08:36.011525',NULL),(73,'Ogc6JM33gjAa78Q52tJfhoPL2TYPRg',73,1,1,'2024-04-24 03:14:00.908900','2024-04-24 03:14:00.908900',NULL),(74,'XYSsArPSNA4oN8eTPNePteNWyUwXma',74,1,1,'2024-04-24 03:14:00.926885','2024-04-24 03:14:00.926885',NULL),(75,'6BMZztQgE6g3IlQj2ctSHEvlmPk7O7',75,1,1,'2024-04-24 03:14:01.675063','2024-04-24 03:14:01.675063',NULL),(76,'YLCSNwAJAX4ViIMyIH3PvuGDAr5bE6',76,1,1,'2024-04-24 03:14:01.755065','2024-04-24 03:14:01.755065',NULL),(77,'CnOf5ZArBysbJtQmkcoIavsvyWMbsD',77,1,1,'2024-04-24 03:14:01.787066','2024-04-24 03:14:01.787066',NULL),(78,'oLEbG0kZJPdxrA0zyF5h94duCm4zL9',78,1,1,'2024-04-24 03:14:01.815068','2024-04-24 03:14:01.815068',NULL),(79,'eybUfcYVMJop7x880UlYXG1SFaDjCb',79,1,1,'2024-04-24 03:14:01.845065','2024-04-24 03:14:01.846065',NULL),(80,'oKgVezFdDxSzkkPXnxPkTVgqbU4woZ',80,1,1,'2024-04-24 03:14:01.876065','2024-04-24 03:14:01.876065',NULL),(81,'DLH47O5yfI3gRmUm54jwBO1G1j7rYF',81,1,1,'2024-04-24 03:14:02.424066','2024-04-24 03:14:02.424066',NULL),(82,'oR3ciUyDWAH1wdMFnY7YkdfCQWA14P',82,1,1,'2024-04-24 03:19:28.619071','2024-04-24 03:19:28.619071',NULL),(83,'uoDOuAKdnb85JTq5AXkEttJqW5t7ZX',83,1,1,'2024-04-24 03:19:28.620072','2024-04-24 03:19:28.620072',NULL),(84,'jSSphQrOjhmLrwVfwlAFprOUedNgd1',84,1,1,'2024-04-24 03:19:28.894186','2024-04-24 03:19:28.894186',NULL),(85,'r1PMj81rengoJUNkUC3P1wxaos0cNQ',85,1,1,'2024-04-24 03:19:28.898187','2024-04-24 03:19:28.898187',NULL),(86,'J0PRIcakh5DoJ5LHCCpYGCB7jiaM0I',86,1,1,'2024-04-24 03:19:28.922185','2024-04-24 03:19:28.922185',NULL),(87,'uoUQDo3WoiQETKzGNXLhA16GyX2hLm',87,1,1,'2024-04-24 03:19:29.029189','2024-04-24 03:19:29.029189',NULL),(88,'oZO4zWnfB6qgnVIwZydeuaaUWe1I1S',88,1,1,'2024-04-24 03:19:29.547186','2024-04-24 03:19:29.547186',NULL),(89,'UkUXyJR0Qa5GoJDz2yXlkGrui2L3jP',89,1,1,'2024-04-24 03:19:29.597187','2024-04-24 03:19:29.597187',NULL),(90,'GwiKgnsTAXYzFyVPGgHAhdiluCVMLv',90,1,1,'2024-04-24 03:19:29.745731','2024-04-24 03:19:29.745731',NULL),(91,'5notqjUu0O46qBwbWdwrAktbqdAvP2',91,1,1,'2024-04-24 03:19:29.749735','2024-04-24 03:19:29.749735',NULL),(92,'hJl3iIF3QEsQ9qXE5LvkAg2w5KeIIC',92,1,1,'2024-04-24 03:26:39.737353','2024-04-24 03:26:39.737353',NULL),(93,'WtH4Cd1df6mbWy2fdoWqmoFjCyP6Zi',93,1,1,'2024-04-24 03:26:39.793353','2024-04-24 03:26:39.793353',NULL),(94,'d0hp8sxPbWYAF6IuboheATqEgXLJ17',94,1,1,'2024-04-24 03:26:39.815354','2024-04-24 03:26:39.815354',NULL),(95,'TFKGORor4WiVUIYARiq6LrYX1Ebhqv',95,1,1,'2024-04-24 03:26:39.822355','2024-04-24 03:26:39.822355',NULL),(96,'BKeCpDJlgWKn4ffLVSC20BA8B9DNFE',96,1,1,'2024-04-24 03:26:39.850355','2024-04-24 03:26:39.850355',NULL),(97,'qwSy8geKNaybXAM6PBSGH3K8RpKXNZ',97,1,1,'2024-04-24 03:26:39.913072','2024-04-24 03:26:39.913072',NULL),(98,'YmwMe05rioTV4BjyjLTSQGi80MXHH7',98,1,1,'2024-04-24 03:26:40.664338','2024-04-24 03:26:40.664338',NULL),(99,'I1uN1akfFOoQpAcYPEDOvwPwmFLM61',99,1,1,'2024-04-24 03:26:40.683341','2024-04-24 03:26:40.683341',NULL),(100,'bbwbhr4zjr4GebzYPAAHD1geAkcf2i',100,1,1,'2024-04-24 03:26:40.721341','2024-04-24 03:26:40.721341',NULL),(101,'YiemNslxNqZ3AiQnq9VCTqdZKDUNdL',101,1,1,'2024-04-24 03:26:40.728344','2024-04-24 03:26:40.728344',NULL),(102,'LHjRJfFDABmGV6RkyCBRE6eYsrXVeN',102,1,1,'2024-04-24 03:26:40.734340','2024-04-24 03:26:40.734340',NULL),(103,'0bOIlIJKltQe4yJc5c059ctL6rsTka',103,1,1,'2024-04-24 03:30:40.509297','2024-04-24 03:30:40.509297',NULL),(104,'xU6Yi0CC7WOsAe9NfHJmoHAfyNwPWZ',104,1,1,'2024-04-24 03:30:40.592299','2024-04-24 03:30:40.592299',NULL),(105,'onLcFXBIK5p6cMN3pF8oJ2BFrq8ySn',105,1,1,'2024-04-24 03:30:40.893297','2024-04-24 03:30:40.893297',NULL),(106,'9teOtHdzfApfwCztdGzANLSbgtSfWg',106,1,1,'2024-04-24 03:30:40.898298','2024-04-24 03:30:40.898298',NULL),(107,'mSA3Z9t3tB9AQi7BAGlmHqrh34i35M',107,1,1,'2024-04-24 03:30:40.914296','2024-04-24 03:30:40.914296',NULL),(108,'MmVuAiCo9K5p9GfqWV77aANpL3F0VX',108,1,1,'2024-04-24 03:30:40.947296','2024-04-24 03:30:40.947296',NULL),(109,'aHrCPozfhKih923iSvo7tTbSBw5ezG',109,1,1,'2024-04-24 03:30:41.481297','2024-04-24 03:30:41.481297',NULL),(110,'mNHSEKdd5fCwT5pxtAwq7PAUnuSCI2',110,1,1,'2024-04-24 03:30:41.508298','2024-04-24 03:30:41.508298',NULL),(111,'iK6txfGLDmSkLTr2aVYOsXRWrpvpKx',111,1,1,'2024-04-24 03:30:41.826300','2024-04-24 03:30:41.826300',NULL),(112,'ZDFMK6k0gstBvUd09zRVfVcp6EhhIr',112,1,1,'2024-04-24 03:30:41.852298','2024-04-24 03:30:41.852298',NULL),(113,'CvwN3fV5y9CSZZ16uIgizrVKzq3LZJ',113,1,1,'2024-04-24 03:30:41.867297','2024-04-24 03:30:41.867297',NULL),(114,'Tl3dEo3wkQepxy7b1hbpqbn3aXRgBU',114,1,1,'2024-04-24 03:30:41.869301','2024-04-24 03:30:41.869301',NULL),(115,'oEQDzxo5MZn7rViMheTyQq28FQZxNt',115,1,1,'2024-04-24 03:31:33.019478','2024-04-24 03:31:33.019478',NULL),(116,'DiGIc31yV0mKEYt0OuWNISJL24qdJf',116,1,1,'2024-04-24 03:31:33.019478','2024-04-24 03:31:33.019478',NULL),(117,'J4ZdrA0WRw9fZJGnGY7D6XRGSPuVUI',117,1,1,'2024-04-24 03:31:33.849589','2024-04-24 03:31:33.849589',NULL),(118,'qGUPuwQhSDm8vfIrQfsWDkxB2TcR8p',118,1,1,'2024-04-24 03:31:33.975590','2024-04-24 03:31:33.975590',NULL),(119,'dPrH1W7evrx0AenmDrKQqY2RcNdEoo',119,1,1,'2024-04-24 03:31:33.979590','2024-04-24 03:31:33.979590',NULL),(120,'UhYGB9X7D3ZeoWWkyqe8H3ibrJpv3u',120,1,1,'2024-04-24 03:31:33.996589','2024-04-24 03:31:33.996589',NULL),(121,'kEkHMDFYKCknu0FJ5LXy465QobovxY',121,1,1,'2024-04-24 03:31:34.103589','2024-04-24 03:31:34.104589',NULL),(122,'7q8UsKiPgRFWH1AM05THSGINHCgeNf',122,1,1,'2024-04-24 03:31:34.184591','2024-04-24 03:31:34.184591',NULL),(123,'wESwT5haa2u314OeTOPSZivsvDPX43',123,1,1,'2024-04-24 03:31:34.943210','2024-04-24 03:31:34.943210',NULL),(124,'S2M34bYaXayzGTn9nJHIdqJpXT38Xa',124,1,1,'2024-04-24 03:31:34.954210','2024-04-24 03:31:34.954210',NULL),(125,'aUg6FBYEQ70u5ZvbrHHZWd0Ky6zRaA',125,1,1,'2024-04-24 03:31:34.975209','2024-04-24 03:31:34.975209',NULL),(126,'jaNZ1vHgRsmhuW2J4WjgsDR6Qo1VCM',126,1,1,'2024-04-24 03:31:34.977210','2024-04-24 03:31:34.977210',NULL),(127,'GOHbX3u9hA7wR54819NpqaPZhmgDen',127,1,1,'2024-04-24 03:31:35.110210','2024-04-24 03:31:35.110210',NULL),(128,'81yDgNwY9OKdLHdUiUcdnoaGYNdmjx',128,1,1,'2024-04-24 03:32:32.829089','2024-04-24 03:32:32.829089',NULL),(129,'RDaYoecF2yX4L6D7HnodIB3dW9u2KY',129,1,1,'2024-04-24 03:32:32.830078','2024-04-24 03:32:32.830078',NULL),(130,'tMaOjFKYX8CIRFI5sJnC5A8ZX4Oykw',130,1,1,'2024-04-24 03:32:33.862704','2024-04-24 03:32:33.863704',NULL),(131,'3HFoyYzMynjJnsk8r8QJooPGxd3d4G',131,1,1,'2024-04-24 03:32:33.874705','2024-04-24 03:32:33.874705',NULL),(132,'8MSObilujsddBNLjC3whu9yty5Vv1W',132,1,1,'2024-04-24 03:32:33.897704','2024-04-24 03:32:33.897704',NULL),(133,'SZkg3r6PWRvRI3QgXuxrswhteFrNRc',133,1,1,'2024-04-24 03:32:33.897704','2024-04-24 03:32:33.897704',NULL),(134,'YjNtzpBPDZaleysYf5hgnNHhNVKzrC',134,1,1,'2024-04-24 03:32:33.937704','2024-04-24 03:32:33.937704',NULL),(135,'ZBvX2a7WpeVfj1Dkb4gLS4admUxekx',135,1,1,'2024-04-24 03:32:34.005702','2024-04-24 03:32:34.005702',NULL),(136,'58hs8NogzUTKqTKigFR6UphiBNL7IN',136,1,1,'2024-04-24 03:32:34.787821','2024-04-24 03:32:34.787821',NULL),(137,'yHREIgItHMWW709h4YkN26t3mzUDA2',137,1,1,'2024-04-24 03:32:34.853822','2024-04-24 03:32:34.853822',NULL),(138,'Z5kB4wOiEfdmy1Gxq354neT4o4vxxM',138,1,1,'2024-04-24 03:32:34.904822','2024-04-24 03:32:34.904822',NULL),(139,'noGNGZxCaj25mw6RBMqD9wjVCMxDtf',139,1,1,'2024-04-24 03:32:34.932821','2024-04-24 03:32:34.932821',NULL),(140,'kPN6waCFIIn0r75lN6xdfaqpJonSgQ',140,1,1,'2024-04-24 03:32:34.946821','2024-04-24 03:32:34.946821',NULL),(141,'9O51zS1V7Tl99RjybiI7SsCZrfVgIS',141,1,1,'2024-04-24 03:32:34.987821','2024-04-24 03:32:34.987821',NULL),(142,'2qLn71THhwbqAp5Y0evhdmQsr3P7QG',142,1,1,'2024-04-24 08:07:46.761538','2024-04-24 08:07:46.761538',NULL),(143,'q8rJZt1nV49ns9Fs50hmrKIH3AGe1t',143,1,1,'2024-04-24 08:07:46.769538','2024-04-24 08:07:46.769538',NULL),(144,'xYfub97inA44UmP602HBQ5qegakIr8',144,1,1,'2024-04-24 08:07:51.152055','2024-04-24 08:07:51.152055',NULL),(145,'LvBSy9V5xvW1fLP3Tb49CM431nQFNh',145,1,1,'2024-04-24 08:07:51.152055','2024-04-24 08:07:51.152055',NULL),(146,'Y1BRrvwALTNtqet08q1M0boGo3GSUm',147,1,1,'2024-04-24 08:10:16.758468','2024-04-24 08:10:16.758468',NULL),(147,'f2YnmmsxEPPS3SQkHhNWpt9knxpn3d',146,1,1,'2024-04-24 08:10:16.758468','2024-04-24 08:10:16.758468',NULL),(148,'pfklD8rySkdyTGUmsO05IMgj5sKw4L',148,1,1,'2024-04-24 08:12:37.177146','2024-04-24 08:12:37.178144',NULL),(149,'4f0K585V7NgWALS1ZAOSpCO3HCSZPk',149,1,1,'2024-04-24 08:12:37.191160','2024-04-24 08:12:37.191160',NULL),(150,'88zF7lPCrg57HYrGgo2i3HUtm6rnsS',150,1,1,'2024-04-24 08:13:26.848920','2024-04-24 08:13:26.848920',NULL),(151,'A6c5Y2jqy6tqgqoPCGWBhvSwK5R88m',151,1,1,'2024-04-24 08:13:26.875921','2024-04-24 08:13:26.875921',NULL),(152,'fOE982XpKplu5uKBeXQrpyhEg3ohxl',152,1,1,'2024-04-24 08:14:50.648692','2024-04-24 08:14:50.648692',NULL),(153,'RQ7SivkyxsTT2lo2OAkEiuivmUadOS',153,1,1,'2024-04-24 08:14:50.683689','2024-04-24 08:14:50.683689',NULL),(154,'MQJPeZJna6QSmCyveHa15lHemjcVX1',154,1,1,'2024-04-24 08:24:37.269395','2024-04-24 08:24:37.269395',NULL),(155,'4CCRRhIf71EjczoFTrps5Z0dd9I5cF',155,1,1,'2024-04-24 08:24:37.295396','2024-04-24 08:24:37.295396',NULL),(156,'wkML5Jw98Bvo9hKbyxILxkYUXNI9ch',156,1,1,'2024-04-24 09:04:29.345810','2024-04-24 09:04:29.345810',NULL),(157,'CFaquhEqiLgO1rnvMsQNir5iFyHUQF',157,1,1,'2024-04-24 09:04:29.345810','2024-04-24 09:04:29.345810',NULL),(158,'DqY4wW2AddDIXoZNTXsb29pchxnD7n',158,1,1,'2024-04-24 09:06:08.349371','2024-04-24 09:06:08.349371',NULL),(159,'NtpcUIydiNecy7AK5n3yjT0RW5iQHC',159,1,1,'2024-04-24 09:06:08.375371','2024-04-24 09:06:08.375371',NULL),(160,'Oduq27g8mypdJZFMi7YRkoHWRBozPK',160,1,1,'2024-04-24 09:06:08.909542','2024-04-24 09:06:08.909542',NULL),(161,'fN49BwKQChK6QWegmr2Cye7mtGGAyt',161,1,1,'2024-04-24 09:06:08.933549','2024-04-24 09:06:08.933549',NULL),(162,'fJy1YyxaezWBo1XGikEz56jUt4ItwR',162,1,1,'2024-04-24 09:06:12.385588','2024-04-24 09:06:12.385588',NULL),(163,'GCrjxXRbruwKlzhA6ErCsGgzE0Rpjs',163,1,1,'2024-04-24 09:06:12.395588','2024-04-24 09:06:12.395588',NULL),(164,'qQhCtVMa8gnNIUSTQ29lVEyhXbaI1D',164,1,1,'2024-04-24 09:17:56.059960','2024-04-24 09:17:56.059960',NULL),(165,'bV7U8d0J72Q6kbW4eZOY2fyQk2BoCk',165,1,1,'2024-04-24 09:17:56.062963','2024-04-24 09:17:56.062963',NULL),(166,'nyFosYrlLuZKqPS7OZ7w6crZXX5Tc7',166,1,1,'2024-04-24 09:22:01.879609','2024-04-24 09:22:01.879609',NULL),(167,'aLFlZm7u4VcYROXzcq01u0vn0hzh8e',167,1,1,'2024-04-24 09:22:01.882609','2024-04-24 09:22:01.882609',NULL),(168,'3q8GaguKSYEQubB5l8C0efKJeVfSy5',169,1,1,'2024-04-28 02:07:35.350316','2024-04-28 02:07:35.350316',NULL),(169,'14i6UHRUeU6ZknVTvElzMniqjp1oy6',168,1,1,'2024-04-28 02:07:35.349316','2024-04-28 02:07:35.349316',NULL),(170,'8lzKm1dsfDyf8spY7tQxkTe7qe6NLg',171,1,1,'2024-04-28 02:07:39.100263','2024-04-28 02:07:39.100263',NULL),(171,'dmBzP9TX3JCWrAhQZiz0PaALyzXsS9',170,1,1,'2024-04-28 02:07:39.100263','2024-04-28 02:07:39.100263',NULL),(172,'UP8wIDMeWTcYoUdCRDl2ERz5X8CK3E',172,1,1,'2024-04-28 02:08:57.519484','2024-04-28 02:08:57.519484',NULL),(173,'VqIQygGx2jp6zQOaJqsIH8ucYbIUns',173,1,1,'2024-04-28 02:08:57.567484','2024-04-28 02:08:57.567484',NULL),(174,'aQ1BMikM2tdsLg9PkHfqpt7cbVgd8D',174,1,1,'2024-04-28 02:08:57.877484','2024-04-28 02:08:57.877484',NULL),(175,'uVoRARKcSOkiXBS9wOZsR3tfGZjjYN',175,1,1,'2024-04-28 02:14:50.969607','2024-04-28 02:14:50.969607',NULL),(176,'HRRpdN2c6nAV8xb5ZskUpN1c9rGrkz',176,1,1,'2024-04-28 02:14:50.983607','2024-04-28 02:14:50.983607',NULL),(177,'ZkeSKE7XMbgWWSxnd2JkvoEI8rW7hK',177,1,1,'2024-04-28 02:25:59.579126','2024-04-28 02:25:59.579126',NULL),(178,'6kkFMPXjiNGE864RUnFrSIoVntXsS1',178,1,1,'2024-04-28 02:25:59.597126','2024-04-28 02:25:59.597126',NULL),(179,'OzxWIUa6s24CMzJlA5eT2GfnUM8wUP',179,1,1,'2024-05-02 08:02:31.544822','2024-05-02 08:02:31.544822',NULL),(180,'1qHbhQksaRsCYEbbtTIGvX9VCgoSzg',180,1,1,'2024-05-02 08:02:48.293021','2024-05-02 08:02:48.293021',NULL),(181,'8LeU6T2EXCm3ccRchmfxpHWQyvoxms',181,1,1,'2024-05-02 08:03:13.902506','2024-05-02 08:03:13.902506',NULL),(182,'DC8AcQQd7w1M0NaAjhMG9O3Nnhc2u1',182,1,1,'2024-05-02 08:45:21.969348','2024-05-02 08:45:21.969348',NULL),(183,'CKLdXAeniL9FQy0HTbH84q0R0Yau0U',183,1,1,'2024-05-02 08:46:56.167282','2024-05-02 08:46:56.167282',NULL),(184,'J0Oh04Wha08BIY02rR0QxO0hT3KwYK',184,1,1,'2024-05-02 13:41:15.458460','2024-05-02 13:41:15.458460',NULL),(185,'rQff7VlOT7QCOYHyQUVmYCDa8jIN7W',185,1,1,'2024-05-03 09:02:18.402680','2024-05-03 09:02:18.402680',NULL),(186,'c8ahBJJGLxMH8rdPiMjjvC99h2AvIh',186,1,1,'2024-05-04 07:39:23.009099','2024-05-04 07:39:23.009099',NULL),(187,'Tg6Bti3zRXeM7ioBbtfb9mQes1rxjx',187,1,1,'2024-05-04 07:40:28.058379','2024-05-04 07:40:28.058379',NULL),(188,'XU9zjuylcsBpOEGMTRslO1qztKbZ2c',188,1,1,'2024-05-04 09:46:27.836733','2024-05-04 09:46:27.836733',NULL),(189,'0uDWfTDpfX4LVZKCLw7TGjLSQosxXH',189,1,1,'2024-05-04 09:55:15.098678','2024-05-04 09:55:15.098678',NULL),(190,'0gQWcQx9n2HEulfLLRhkWk53dlcMxh',190,1,1,'2024-05-05 02:11:04.603159','2024-05-05 02:11:04.603159',NULL),(191,'52Synisf5iV6xh5cwJiMzctQEZ7HkQ',191,1,1,'2024-05-05 07:16:06.607138','2024-05-05 07:16:06.607138',NULL),(192,'FDeJpBeywxwYOR6m7woRyS0bTIr7LE',192,1,1,'2024-05-06 01:49:44.984459','2024-05-06 01:49:44.984459',NULL),(193,'jv5Imc6Wrws9qZqa1KOF1uiVnt5yRY',193,1,1,'2024-05-06 07:54:05.822347','2024-05-06 07:54:05.822347',NULL),(194,'3vK5FgVWT8gCcCVlf9YccSPsNAAEkk',194,1,1,'2024-05-06 07:55:39.183478','2024-05-06 07:55:39.183478',NULL),(195,'UoMuRGcSj8mSpd7MTb4EF9B7cF4vhD',195,1,1,'2024-05-06 07:57:58.668135','2024-05-06 07:57:58.668135',NULL),(196,'TB29A5ewuSqARJS4JKfyQe7uY7FSVo',196,1,1,'2024-05-06 08:01:09.229069','2024-05-06 08:01:09.229069',NULL),(197,'FQebNZpjk2EsUyUuilUe5LqJx3akQG',197,1,1,'2024-05-06 08:01:46.553495','2024-05-06 08:01:46.553495',NULL),(198,'DDc97tPsDUFoEzCc78fNlej86Fz4Xn',198,1,1,'2024-05-06 08:09:03.390690','2024-05-06 08:09:03.390690',NULL),(199,'QBUFTNgEvBwNPkCiX8hQMgVUfi5fwq',199,1,1,'2024-05-06 08:22:22.018769','2024-05-06 08:22:22.018769',NULL),(200,'KkSdFAKSMvlpzx5BtyLXTzHGD6o91c',200,1,1,'2024-05-06 08:23:47.476527','2024-05-06 08:23:47.476527',NULL),(201,'qE5A8XqaNqD53c31lvTKibzBxjD7oV',201,1,1,'2024-05-09 03:05:51.988162','2024-05-09 03:05:51.988162',NULL),(202,'gTVcyfbviI0lMKsUwjJn1MzGxG3e38',202,1,1,'2024-05-09 03:07:43.827134','2024-05-09 03:07:43.827134',NULL),(203,'ee5MPDU4ZGPGMJKXjMpPJcCJROfwnB',203,1,1,'2024-05-09 07:38:20.937964','2024-05-09 07:38:20.938965',NULL),(204,'OAyciebJEl0qcxmFOW0irNQSlrT7TE',204,1,1,'2024-05-10 01:29:42.176861','2024-05-10 01:29:42.176861',NULL),(205,'gY0hlmj22EL8wZ1Wq6AAMSCCw4Tm7W',205,1,1,'2024-05-10 12:24:00.859534','2024-05-10 12:24:00.859534',NULL),(206,'x2hcAKaBATojkLgkHEJJC9GSRbwj4Z',206,1,1,'2024-05-11 01:13:34.570611','2024-05-11 01:13:34.570611',NULL),(207,'AAEv2ViHhpWXoVyDCoSG0a0tJ4qNea',207,1,1,'2024-05-11 09:21:46.714693','2024-05-11 09:21:46.714693',NULL),(208,'0YNu28RN8w3bbaf293peQjzGX0JYV8',208,1,1,'2024-05-12 01:28:41.198285','2024-05-12 01:28:41.198285',NULL),(209,'JpfCweCHeuSsuipo7al2tMPS6DjJ3v',NULL,1,1,'2024-05-12 01:43:59.343729','2024-05-12 01:47:39.082219','2024-05-12 01:47:39.081215'),(210,'Ghs9SaLCYrOCDTwp3waGWNcE9eIhpS',210,1,1,'2024-05-12 01:47:39.086215','2024-05-12 01:47:39.086215',NULL),(211,'1akuxixVcXNdPjmrnl1VU6gUHvQLed',NULL,1,1,'2024-05-12 01:58:28.614943','2024-05-12 01:58:54.819061','2024-05-12 01:58:54.819061'),(212,'3MIWLB191TDO5WS0aHrle0rUoPB8kE',212,1,1,'2024-05-12 01:58:54.822062','2024-05-12 01:58:54.822062',NULL),(213,'6GxmVHj6vav5sQriCWQnQfUzSKHDRV',NULL,1,1,'2024-05-12 02:10:34.285851','2024-05-12 02:10:50.500874','2024-05-12 02:10:50.500874'),(214,'VPJOEE3jU15mCokoTJnuAsQV32Eq8d',NULL,1,1,'2024-05-12 02:10:50.504874','2024-05-12 02:11:20.975321','2024-05-12 02:11:20.975321'),(215,'eytygOaG0wS1v8nPdLdgWTzhmOBsKc',NULL,1,1,'2024-05-12 02:11:20.977319','2024-05-12 02:11:32.437749','2024-05-12 02:11:32.437749'),(216,'ZJAxZQ4o1rAOa2DkwFQqJgcNA91Iwc',NULL,1,1,'2024-05-12 02:11:32.442745','2024-05-12 02:15:10.974924','2024-05-12 02:15:10.974924'),(217,'l6g0K9EaVzoTtem0DS7wGmJJwL7neG',217,1,1,'2024-05-12 02:15:10.977922','2024-05-12 02:15:10.977922',NULL),(218,'4nRT7amWGJyD1DmBzc5GzlTxUeLFgw',NULL,1,1,'2024-05-12 02:18:26.539111','2024-05-12 02:18:46.738659','2024-05-12 02:18:46.738659'),(219,'YBbspGaLJvb3ztafgzbJelBMJVKH96',219,1,1,'2024-05-12 02:18:46.740657','2024-05-12 02:18:46.740657',NULL),(220,'vHEWjE01jGH2zKWXSuGJIOQCNJfEc2',NULL,1,1,'2024-05-12 02:20:04.075238','2024-05-12 02:20:41.136790','2024-05-12 02:20:41.136790'),(221,'sZOwkN82PzS0JjqGTjJDhfyj6bdaov',221,1,1,'2024-05-12 02:20:41.139784','2024-05-12 02:20:41.139784',NULL),(222,'yL9mqVMK0E3HFy8Eu4W6Q1I8bZ2hVE',NULL,1,1,'2024-05-12 02:21:44.645197','2024-05-12 02:21:50.157069','2024-05-12 02:21:50.156068'),(223,'ftDLYIKq7NnipKmCGN6z2SMK1518Ow',NULL,1,1,'2024-05-12 02:21:50.159069','2024-05-12 02:21:55.729052','2024-05-12 02:21:55.729052'),(224,'nL1xJQkw3yTcjJs8w4BeZsCjn1kCI3',NULL,1,1,'2024-05-12 02:21:55.731050','2024-05-12 02:22:00.684772','2024-05-12 02:22:00.684772'),(225,'ywTfYPStP53RjxrIsXmevUy8PY4q3q',NULL,1,1,'2024-05-12 02:22:00.689772','2024-05-12 02:22:17.671141','2024-05-12 02:22:17.671141'),(226,'dR0RFY9eCwS6psld6a650M5I5dqHlF',NULL,1,1,'2024-05-12 02:22:17.673141','2024-05-12 02:22:38.744604','2024-05-12 02:22:38.744604'),(227,'aGZtIGoCe0mt22KQj07V3dmcH8Wk8k',227,1,1,'2024-05-12 02:22:38.748604','2024-05-12 02:22:38.748604',NULL),(228,'w2m33COBAnkNTTqSShTLRbgqdA9msV',228,1,1,'2024-05-12 03:46:36.082982','2024-05-12 03:46:36.082982',NULL),(229,'HRiBzicXJ2qWz0PGpZlqssRCxtbdwm',229,1,1,'2024-05-12 03:47:07.902469','2024-05-12 03:47:07.902469',NULL),(230,'b9F3rof8HWUheAd4tVMRkzIRCNA8rN',230,1,1,'2024-05-12 03:47:57.190429','2024-05-12 03:47:57.190429',NULL);
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `fk_user_id` bigint DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `playlist_fk_user_id_8b8f6e54_fk_soundcloud_user_id` (`fk_user_id`),
  CONSTRAINT `playlist_fk_user_id_8b8f6e54_fk_soundcloud_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (1,'2024-03-18 09:15:39.405360','2024-03-18 09:15:39.405360',1,'My Playlist','My Playlist',1,0);
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlisttracks`
--

DROP TABLE IF EXISTS `playlisttracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlisttracks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fk_playlist_id` bigint DEFAULT NULL,
  `fk_tracks_id` bigint DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `playlisttracks_fk_playlist_id_e7eb671f_fk_playlist_id` (`fk_playlist_id`),
  KEY `playlisttracks_fk_tracks_id_d2abe227_fk_tracks_id` (`fk_tracks_id`),
  CONSTRAINT `playlisttracks_fk_playlist_id_e7eb671f_fk_playlist_id` FOREIGN KEY (`fk_playlist_id`) REFERENCES `playlist` (`id`),
  CONSTRAINT `playlisttracks_fk_tracks_id_d2abe227_fk_tracks_id` FOREIGN KEY (`fk_tracks_id`) REFERENCES `tracks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlisttracks`
--

LOCK TABLES `playlisttracks` WRITE;
/*!40000 ALTER TABLE `playlisttracks` DISABLE KEYS */;
INSERT INTO `playlisttracks` VALUES (2,1,2,'2024-03-18 09:29:08.872710',1,'2024-03-18 09:29:08.872710'),(3,1,3,'2024-03-18 09:29:52.139294',1,'2024-03-18 09:29:52.139294'),(4,1,1,'2024-03-18 09:29:59.817147',1,'2024-03-18 09:29:59.817147');
/*!40000 ALTER TABLE `playlisttracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_social_user_id_8146e70c_fk_soundclou` (`user_id`),
  CONSTRAINT `socialaccount_social_user_id_8146e70c_fk_soundclou` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_secret` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int NOT NULL,
  `app_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soundcloud_user`
--

DROP TABLE IF EXISTS `soundcloud_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soundcloud_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `avatar` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soundcloud_user`
--

LOCK TABLES `soundcloud_user` WRITE;
/*!40000 ALTER TABLE `soundcloud_user` DISABLE KEYS */;
INSERT INTO `soundcloud_user` VALUES (1,'pbkdf2_sha256$600000$ItiMJhLtSpsVeHTXdjQiUe$ARgFOx+bNC5V/6LID742uzSfGwSfFwT5dTu+xXiyMcc=','2024-05-08 01:17:23.000000',1,'admin','','',1,1,'2024-03-18 06:58:54.000000','uploads/2024/05/artworks-WOHV793zLydx1Eev-17uJ1Q-t500x500_aTcApCo.jpg','hgooshvhd123@gmail.com','0816321502'),(2,'12345678',NULL,0,'user1','Dieu','Xuan',0,1,'2024-03-18 09:54:32.000000','uploads/2024/03/artworks-RmIIrpDm8l6iF2zc-PWl5VA-t500x500.jpg','user1@gmail.com','0916300500'),(3,'pbkdf2_sha256$600000$YgLHieTnSIYOllDKuWU3fw$rlaPWi3gAYpx38e79TTAOMYe5B8aY3EKkW2vOhmW+wY=',NULL,0,'user2','Dieu','Xuan',0,1,'2024-04-24 02:43:19.000000','uploads/2024/05/artworks-WOHV793zLydx1Eev-17uJ1Q-t500x500.jpg','dieuxuan@gmail.com','0816321505');
/*!40000 ALTER TABLE `soundcloud_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soundcloud_user_groups`
--

DROP TABLE IF EXISTS `soundcloud_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soundcloud_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `soundcloud_user_groups_user_id_group_id_6e9b2b8a_uniq` (`user_id`,`group_id`),
  KEY `soundcloud_user_groups_group_id_56a77d8f_fk_auth_group_id` (`group_id`),
  CONSTRAINT `soundcloud_user_groups_group_id_56a77d8f_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `soundcloud_user_groups_user_id_c77febc3_fk_soundcloud_user_id` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soundcloud_user_groups`
--

LOCK TABLES `soundcloud_user_groups` WRITE;
/*!40000 ALTER TABLE `soundcloud_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `soundcloud_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soundcloud_user_user_permissions`
--

DROP TABLE IF EXISTS `soundcloud_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soundcloud_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `soundcloud_user_user_per_user_id_permission_id_4100827a_uniq` (`user_id`,`permission_id`),
  KEY `soundcloud_user_user_permission_id_7e097c10_fk_auth_perm` (`permission_id`),
  CONSTRAINT `soundcloud_user_user_permission_id_7e097c10_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `soundcloud_user_user_user_id_2bdcf76f_fk_soundclou` FOREIGN KEY (`user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soundcloud_user_user_permissions`
--

LOCK TABLES `soundcloud_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `soundcloud_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `soundcloud_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `photo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fk_genre_id` bigint DEFAULT NULL,
  `fk_user_id` bigint DEFAULT NULL,
  `like` int NOT NULL,
  `view` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tracks_fk_genre_id_722c84ab_fk_genre_id` (`fk_genre_id`),
  KEY `tracks_fk_user_id_4b8e9459_fk_soundcloud_user_id` (`fk_user_id`),
  CONSTRAINT `tracks_fk_genre_id_722c84ab_fk_genre_id` FOREIGN KEY (`fk_genre_id`) REFERENCES `genre` (`id`),
  CONSTRAINT `tracks_fk_user_id_4b8e9459_fk_soundcloud_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `soundcloud_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
INSERT INTO `tracks` VALUES (1,'2024-03-18 08:56:00.136853','2024-05-12 01:30:10.990956',1,'Sau Cơn Mưa - CoolKid ft Rhyder','Sau Cơn Mưa - CoolKid ft Rhyder','photos/2024/05/artworks-WOHV793zLydx1Eev-17uJ1Q-t500x500.jpg','song/2024/03/Sau_Cơn_Mưa_-_CoolKid_ft_Rhyder.mp3',1,1,132,10001),(2,'2024-03-18 08:57:10.894842','2024-05-11 07:30:51.720672',1,'Think twice','Think twice','photos/2024/03/artworks-bpRynxDm2DKvmrdC-zFZ60g-t500x500.jpg','song/2024/03/Think_twice.mp3',2,1,182,10001),(3,'2024-03-18 08:58:25.665832','2024-05-11 07:23:40.984062',1,'니가_ (You_)','니가_ (You_)','photos/2024/03/artworks-YyAZXHylHhI1MGHs-GuWikg-t500x500.jpg','song/2024/05/니가__You_.mp3',3,1,169,11400),(4,'2024-04-23 12:26:02.498521','2024-04-23 12:26:02.498521',1,'B.O.R. (Birth of Rap)','B.O.R. (Birth of Rap)','photos/2024/04/artworks-tpbaG3n6Av2H-0-t500x500.jpg','song/2024/04/BOR_Birth_of_Rap.mp3',4,2,1100,3333),(5,'2024-04-23 12:30:22.360357','2024-05-11 07:26:59.264717',1,'Đen Đá Không Đường (Rap Version) -AMee','Đen Đá Không Đường (Rap Version) -AMee','photos/2024/04/artworks-000557512089-zq7sp2-t500x500.jpg','song/2024/04/Đen_Đá_Không_Đường_Rap_Version_-AMee.mp3',1,2,10001,10000002),(6,'2024-04-23 12:46:05.271036','2024-05-12 04:01:42.834768',1,'LOVE IS GONE FT. DYLAN MATTHEW (ACOUSTIC)','LOVE IS GONE FT. DYLAN MATTHEW (ACOUSTIC)','photos/2024/04/loveisgone.png','song/2024/04/LOVE_IS_GONE_FT_DYLAN_MATTHEW_ACOUSTIC.mp3',1,2,9999,1000006),(7,'2024-04-23 12:56:55.750682','2024-05-12 04:02:33.393617',1,'Justin Bieber - Love Yourself (COVER)','Justin Bieber - Love Yourself (COVER)','photos/2024/04/Screenshot_Capture_-_2024-04-23_-_19-55-21.png','song/2024/04/Justin_Bieber_-_Love_Yourself_COVER.mp3',1,2,99999,10000001),(8,'2024-04-23 13:00:01.256742','2024-05-12 04:02:14.168050',1,'we can\'t be friends (wait for your love) - ariana grande','we can\'t be friends (wait for your love) - ariana grande','photos/2024/04/Screenshot_Capture_-_2024-04-23_-_19-59-00.png','song/2024/04/we_cant_be_friends_wait_for_your_love_-_ariana_grandesped_up.mp3',1,2,5556,60005),(9,'2024-04-23 13:03:11.215070','2024-04-23 13:03:11.215070',1,'Each Time You Fall In Love','Each Time You Fall In Love','photos/2024/04/Screenshot_Capture_-_2024-04-23_-_20-02-13.png','song/2024/04/Each_Time_You_Fall_In_Love.mp3',1,2,3333,6666),(10,'2024-04-23 14:08:07.476801','2024-04-23 14:08:25.569734',1,'Over - KHOI VU (ft. khoivy) x minhnhat.','Over - KHOI VU (ft. khoivy) x minhnhat.','photos/2024/04/Screenshot_Capture_-_2024-04-23_-_20-59-40.png','song/2024/04/Over_-_KHOI_VU_ft_khoivy_x_minhnhat.mp3',2,2,223,4000),(11,'2024-04-23 14:11:03.711608','2024-04-23 14:11:03.711608',1,'Không Quan Trọng - Vụ Nổ Lớn','Không Quan Trọng - Vụ Nổ Lớn','photos/2024/04/Screenshot_Capture_-_2024-04-23_-_21-09-57.png','song/2024/04/Không_Quan_Trọng_-_Vụ_Nổ_Lớn.mp3',2,2,12345,123456),(12,'2024-04-23 14:13:24.496387','2024-04-23 14:13:24.496387',1,'Xe Đạp - Charles - Acoustic cover','Xe Đạp - Charles - Acoustic cover','photos/2024/04/Screenshot_Capture_-_2024-04-23_-_21-11-36.png','song/2024/04/Xe_đạp-_Charles.mp3',2,2,5555,67844),(13,'2024-04-23 14:15:05.008344','2024-04-23 14:15:05.008344',1,'Chạm Khẽ Tim Anh Một Chút Thôi - Noo Phước Thịnh','Chạm Khẽ Tim Anh Một Chút Thôi - Noo Phước Thịnh','photos/2024/04/Screenshot_Capture_-_2024-04-23_-_21-14-07.png','song/2024/04/Chạm_Khẽ_Tim_Anh_Một_Chút_Thôi_-_Noo_Phước_Thịnh.mp3',2,2,999999,999999);
/*!40000 ALTER TABLE `tracks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-13  9:00:04
