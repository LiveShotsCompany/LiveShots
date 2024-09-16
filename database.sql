CREATE DATABASE  IF NOT EXISTS `liveshots` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `liveshots`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: liveshots
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `competitions`
--

DROP TABLE IF EXISTS `competitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competitions` (
                                `Id` int NOT NULL,
                                `Name` varchar(255) DEFAULT NULL,
                                PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitions`
--

LOCK TABLES `competitions` WRITE;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;
INSERT INTO `competitions` VALUES (1,'Premier League'),(2,'Bundesliga'),(3,'Ligue 1'),(4,'Serie A'),(5,'La Liga');
/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
                           `Id` int NOT NULL,
                           `CompetitionId` int DEFAULT NULL,
                           `Date` date DEFAULT NULL,
                           `Time` time DEFAULT NULL,
                           PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (1,1,'2024-09-12','15:00:00'),(2,1,'2024-09-12','15:00:00'),(3,1,'2024-09-12','15:00:00'),(4,1,'2024-09-12','15:00:00'),(5,1,'2024-09-12','15:00:00'),(6,1,'2024-09-12','15:00:00'),(7,1,'2024-09-12','15:00:00'),(8,1,'2024-09-13','15:00:00'),(9,1,'2024-09-13','15:00:00'),(10,1,'2024-09-13','15:00:00'),(11,1,'2024-09-13','15:00:00'),(12,1,'2024-09-13','15:00:00'),(13,1,'2024-09-13','15:00:00'),(14,1,'2024-10-13','15:00:00'),(15,1,'2024-10-13','15:00:00'),(16,2,'2024-10-13','15:00:00'),(17,1,'2024-09-13','17:30:00'),(18,1,'2024-09-13','20:00:00'),(19,1,'2024-09-13','15:00:00'),(20,1,'2024-09-11','15:00:00'),(21,1,'2024-09-11','15:00:00'),(22,1,'2024-09-11','15:00:00'),(23,1,'2024-09-11','15:00:00'),(24,1,'2024-09-11','15:00:00');
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
                           `Id` int NOT NULL AUTO_INCREMENT,
                           `Name` varchar(255) DEFAULT NULL,
                           `teamId` int DEFAULT NULL,
                           PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'Kevin De Bruyne',1),(2,'Mohamed Salah',2),(3,'Heung-Min Son',5),(4,'Harry Kane',5),(5,'Alexandre Lacazette',6),(6,'Robert Lewandowski',21),(7,'Erling Haaland',22),(8,'Jadon Sancho',22),(9,'Serge Gnabry',21),(10,'Thomas Muller',21),(11,'Lionel Messi',64),(12,'Antoine Griezmann',64),(13,'Sergio Busquets',64),(14,'Kylian Mbappe',33),(15,'Neymar',33),(16,'Angel Di Maria',33),(17,'Mauro Icardi',33),(18,'Marco Verratti',33),(19,'Zlatan Ibrahimovic',48),(20,'Romelu Lukaku',49),(21,'Cristiano Ronaldo',50),(22,'Paulo Dybala',50),(23,'Rodrigo Bentancur',50),(24,'Alessandro Bastoni',48),(25,'Lautaro Martinez',49),(26,'Nicolo Barella',49),(27,'Stefan de Vrij',49),(28,'Leonardo Bonucci',50),(29,'Giorgio Chiellini',50),(30,'Matthijs de Ligt',50),(31,'Karim Benzema',64),(32,'Vinicius Junior',64),(33,'Eden Hazard',64),(34,'Luka Modric',64),(35,'Toni Kroos',64),(36,'Federico Chiesa',48),(37,'Gianluigi Donnarumma',48),(38,'Mike Maignan',48),(39,'Achraf Hakimi',49),(40,'Hugo Lloris',5),(41,'Lucas Moura',5),(42,'Gareth Bale',5),(43,'Tanguy Ndombele',5),(44,'Sergio Reguilón',5),(45,'Eric Dier',5),(46,'Matt Doherty',5),(47,'Steven Bergwijn',5),(48,'Dele Alli',5),(49,'Pierre-Emerick Aubameyang',6),(50,'Bukayo Saka',6),(51,'Thomas Partey',6),(52,'Gabriel Martinelli',6),(53,'Emile Smith Rowe',6),(54,'Granit Xhaka',6),(55,'Nicolas Pépé',6),(56,'Bernd Leno',6),(57,'Kieran Tierney',6),(58,'Martin Ødegaard',6);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teammatches`
--

DROP TABLE IF EXISTS `teammatches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teammatches` (
                               `TeamId` int DEFAULT NULL,
                               `MatchId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teammatches`
--

LOCK TABLES `teammatches` WRITE;
/*!40000 ALTER TABLE `teammatches` DISABLE KEYS */;
INSERT INTO `teammatches` VALUES (1,1),(2,1),(3,2),(4,2),(5,3),(6,3),(6,4),(7,4),(8,5),(9,5),(10,6),(11,6),(11,7),(12,7),(13,8),(14,8),(21,16),(22,16);
/*!40000 ALTER TABLE `teammatches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
                         `Id` int NOT NULL,
                         `Name` varchar(255) DEFAULT NULL,
                         `CompetitionId` int DEFAULT NULL,
                         PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Manchester City',1),(2,'Liverpool',1),(3,'Chelsea',1),(4,'Manchester United',1),(5,'Tottenham Hotspur',1),(6,'Arsenal',1),(7,'West Ham United',1),(8,'Leicester City',1),(9,'Everton',1),(10,'Aston Villa',1),(11,'Newcastle United',1),(12,'Wolverhampton Wanderers',1),(13,'Leeds United',1),(14,'Southampton',1),(15,'Brighton & Hove Albion',1),(16,'Burnley',1),(17,'Crystal Palace',1),(18,'Norwich City',1),(19,'Watford',1),(20,'Brentford',1),(21,'Bayern Munich',2),(22,'Borussia Dortmund',2),(23,'RB Leipzig',2),(24,'Bayer Leverkusen',2),(25,'Eintracht Frankfurt',2),(26,'Borussia Monchengladbach',2),(27,'VfL Wolfsburg',2),(28,'TSG Hoffenheim',2),(29,'SC Freiburg',2),(30,'1. FC Union Berlin',2),(31,'1. FSV Mainz 05',2),(32,'FC Augsburg',2),(33,'Paris Saint-Germain',3),(34,'Marseille',3),(35,'Lyon',3),(36,'Monaco',3),(37,'Lille',3),(38,'Rennes',3),(39,'Nice',3),(40,'Montpellier',3),(41,'Strasbourg',3),(42,'Angers',3),(43,'Bordeaux',3),(44,'Lorient',3),(45,'Clermont Foot',3),(46,'Reims',3),(47,'Troyes',3),(48,'AC Milan',4),(49,'Inter Milan',4),(50,'Juventus',4),(51,'Napoli',4),(52,'Roma',4),(53,'Atalanta',4),(54,'Lazio',4),(55,'Fiorentina',4),(56,'Sassuolo',4),(57,'Torino',4),(58,'Udinese',4),(59,'Bologna',4),(60,'Sampdoria',4),(61,'Genoa',4),(62,'Venezia',4),(63,'Cagliari',4),(64,'Real Madrid',5),(65,'Barcelona',5),(66,'Atletico Madrid',5),(67,'Sevilla',5);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userfavoritematches`
--

DROP TABLE IF EXISTS `userfavoritematches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userfavoritematches` (
                                       `UserID` int DEFAULT NULL,
                                       `MatchID` int DEFAULT NULL,
                                       `home_team` varchar(100) DEFAULT NULL,
                                       `away_team` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userfavoritematches`
--

LOCK TABLES `userfavoritematches` WRITE;
/*!40000 ALTER TABLE `userfavoritematches` DISABLE KEYS */;
INSERT INTO `userfavoritematches` VALUES (1,1,NULL,NULL),(1,2,NULL,NULL),(1,3,NULL,NULL),(2,4,NULL,NULL),(2,5,NULL,NULL),(2,6,NULL,NULL),(3,7,NULL,NULL),(3,8,NULL,NULL),(3,9,NULL,NULL),(4,10,NULL,NULL),(4,11,NULL,NULL),(4,12,NULL,NULL),(5,13,NULL,NULL),(5,14,NULL,NULL),(5,15,NULL,NULL),(6,16,NULL,NULL),(6,17,NULL,NULL),(6,18,NULL,NULL),(7,19,NULL,NULL),(7,20,NULL,NULL),(7,21,NULL,NULL),(8,22,NULL,NULL),(8,23,NULL,NULL),(8,24,NULL,NULL),(9,25,NULL,NULL),(NULL,16,NULL,NULL),(NULL,16,NULL,NULL),(14,NULL,NULL,NULL),(14,NULL,'Bayern Munich','Borussia Dortmund'),(14,NULL,'Bayern Munich','Borussia Dortmund'),(14,NULL,'Bayern Munich','Borussia Dortmund'),(14,16,'Bayern Munich','Borussia Dortmund'),(15,2,'Chelsea','Manchester United'),(14,4,'Arsenal','West Ham United'),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(NULL,3,NULL,NULL),(14,3,'Tottenham Hotspur','Arsenal'),(16,2,'Chelsea','Manchester United'),(16,3,'Tottenham Hotspur','Arsenal'),(16,4,'Arsenal','West Ham United'),(NULL,1,'Manchester City','Liverpool'),(NULL,8,'Leeds United','Southampton'),(NULL,1,'Manchester City','Liverpool'),(NULL,2,'Chelsea','Manchester United'),(NULL,1,'Manchester City','Liverpool'),(NULL,2,'Chelsea','Manchester United'),(NULL,8,'Leeds United','Southampton'),(NULL,8,'Leeds United','Southampton'),(NULL,1,'Manchester City','Liverpool'),(NULL,8,'Leeds United','Southampton'),(NULL,8,'Leeds United','Southampton'),(NULL,1,'Manchester City','Liverpool'),(NULL,4,'Arsenal','West Ham United'),(NULL,1,'Manchester City','Liverpool'),(NULL,1,'Manchester City','Liverpool'),(14,8,'Leeds United','Southampton'),(NULL,1,'Manchester City','Liverpool'),(16,1,'Manchester City','Liverpool');
/*!40000 ALTER TABLE `userfavoritematches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
                         `Id` int NOT NULL AUTO_INCREMENT,
                         `Name` varchar(255) DEFAULT NULL,
                         `Password` varchar(255) DEFAULT NULL,
                         `Email` varchar(255) DEFAULT NULL,
                         PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,NULL,'$2b$10$MN7sTi4B/SvzEbzjyLq/GOCr3ORDPq/pMsB9ebyeiy0c3nwvOzrw.','daniel.r.gumbs@gssmail.com'),(5,NULL,'$2b$10$btZYOWdVAdvT0edO0HYSs.Ja/Jz4Nu4SXqMkuWqzFOUHMmG5/v7zy','asgumbs@gmail.com'),(6,NULL,'$2b$10$V0QThRDWllj7wqB3fJA7RuoffenES717kp2F28EJsxy9TLTIz6uLm','123@gmail.com'),(7,NULL,'$2b$10$dvdxIvDlzwX5dEDiGoQol.OCuhyM5v4VvdJGtjZuc90r2CdXAGx3a','1234@gmail.com'),(8,NULL,'$2b$10$M2a/UVeTcIc7E32DEGZfTue0A9/dHKtIn0vlTIfWovSfEqVXfBcpe','abc@gmail.com'),(9,NULL,'$2b$10$y40BcTCDTC2ACUMTMvxWcOuKTok2YkRSp527E4NV3sg5Y5ESC9RvC','daniel@gmail.com'),(10,NULL,'$2b$10$KpoaxjnsbKLbGOy4gtCFJewplYBuVEd54JzfLsB75ikJJ5Ueb.X4a','dr@gmail.com'),(11,NULL,'$2b$10$kaT4CmI7OB/EtDocAcK4n.5CVl96/lO9X.A6pi5rrjknsGQAy68di','as@gmail.com'),(12,NULL,'$2b$10$kW36xOwgSIdU0W416neq/Omb3Q2fgHVQVsPCj9VujhE1chabhQB2e','danielgumbs@gmail.com'),(13,NULL,'$2b$10$PI1Xd/PEWpywvGbk99TTkeSpS8ET1HWu87eLiVi15C7YfVmN/W7VO','daniel.r.gumbs@gmail.coms'),(14,NULL,'$2b$10$66jAQZmfJzmv1MMBbyGbkuCmRVuRqbzNtVz4bfSBnfj54Hnw2JUEa','daniel.r.gumbs@gmail.com'),(15,NULL,'$2b$10$y6JRoluFS3TDJ2wwYTgPs.cbThQTbOwbQk2TrX4lRGsIiKhW2hqW2','justin@gmail.com'),(16,NULL,'$2b$10$1mFRCQY.iFkPMNoMzGUZQOI8n3axEM1Uek3bhxwCYjahnzKqGjWg6','test123@gmail.com'),(17,NULL,'$2b$10$9RLQ6VLsBQcLG71ENbsfROZzeUrmLFJG1rQVzNOscXx2XIZl6AQHu','12345@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'liveshots'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-16 21:08:28
