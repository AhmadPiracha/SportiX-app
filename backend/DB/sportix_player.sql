-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: sportix
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team` varchar(255) DEFAULT NULL,
  `playername` varchar(255) DEFAULT NULL,
  `rollno` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Soul Hunters','Ali Zaib','19F0101'),(2,'Soul Hunters','Osama Khan','19F0102'),(3,'Soul Hunters','Wajid Ali','19F0103'),(4,'Hydra Devils90','Syed Azib','19F0190'),(5,'Hydra Devils90','Wahaj Ali','19F0191'),(6,'Hydra Devils90','Talha zahid','19F0192'),(7,'91Hunters','Ayesha Khan','19F5610'),(8,'91Hunters','Saba Faisal','19F5611'),(9,'91Hunters','Nasreen','19F5612'),(10,'DX45','Sohaib  Ahmad','20F1011'),(11,'DX45','Ahmad Khan','20F1012'),(12,'DX45','Abdullah Ali','20F1013'),(13,'Hunters99','Saad','22F1010'),(14,'Hunters99','Junaid','22F1011'),(15,'Hunters99','Ali Ahmed','22F1012'),(16,'Hunters99','Ahmed Waseem','22F1013'),(17,'Hunters99','Zain Khan','22F1014'),(18,'Hunters99','Osama','22F1015'),(19,'Qalander','Wajid Ali','22F1026'),(20,'Qalander','Ali Wajid','22F1025'),(21,'Qalander','Waseem','22F1021'),(22,'Qalander','Sami khan','22F1024'),(23,'Qalander','Noman Ali','22F1023'),(24,'Qalander','Ali Noman','22F1022'),(25,'XTV FC','Ali khan','19F3000'),(26,'XTV FC','Sami Khan','19F3008'),(27,'XTV FC','Osama Khan','19F3001'),(28,'XTV FC','Junaid Khan','19F3009'),(29,'XTV FC','Wajid Khan','19F3002'),(30,'XTV FC','Sami','19F3003'),(31,'XTV FC','Ali Tahir','19F3004'),(32,'XTV FC','Abdullah','19F3005'),(33,'XTV FC','zohaib','19F3006'),(34,'XTV FC','Danish','19F3007'),(35,'DXD FC9','Ali Sami','19F3010'),(36,'DXD FC9','Osama Khan','19F3011'),(37,'DXD FC9','Wajid Umer','19F3012'),(38,'DXD FC9','Sami Abdullah','19F3013'),(39,'DXD FC9','Ali Junaid','19F3014'),(40,'DXD FC9','Abdullah Qadeer','19F3015'),(41,'DXD FC9','zohaib umer','19F3016'),(42,'DXD FC9','Danish Khan','19F3017'),(43,'DXD FC9','Sami Noman','19F3018'),(44,'DXD FC9','Junaid Ali','19F3019'),(78,'Mighty Ducks','Amjad','19F6762'),(79,'Mighty Ducks','Zain','19F6761'),(80,'Mighty Ducks','Kamal','19F6763'),(81,'Mighty Ducks','Ali','19F6764'),(82,'Mighty Ducks','Subhan','19F6765'),(83,'Mighty Ducks','Daim','19F6766'),(84,'Mighty Ducks','Ahmed','19F6767'),(85,'Mighty Ducks','Sohail','19F6768'),(86,'Mighty Ducks','Ahad','19F6769'),(87,'Mighty Ducks','Nabi','19F6770'),(88,'Mighty Ducks','Rashid','19F6771'),(89,'Mighty Ducks','Babar','19F6772'),(93,'Tiger77','Ahmed','19F1190'),(94,'Tiger77','Waseem','19F1999'),(95,'Tiger77','Umer','19F7861'),(96,'Titans123','Haziq Gill','19F0358'),(97,'Titans123','Ahmed Waseem','19F1234'),(98,'Titans123','Ali Tahir','19F1111'),(99,'Titans123','bbbbb','19F0909'),(100,'Titans123','aaaa','19F0000'),(101,'Titans123','dddd','19F5656'),(102,'Titans123','cccc','19F7654'),(103,'Titans123','GHGH','19F5454');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 23:38:30
