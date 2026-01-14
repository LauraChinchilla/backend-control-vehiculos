CREATE DATABASE  IF NOT EXISTS `control_vehiculos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `control_vehiculos`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: control_vehiculos
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados` (
  `IdStatus` int NOT NULL AUTO_INCREMENT,
  `Status` varchar(50) NOT NULL,
  PRIMARY KEY (`IdStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
INSERT INTO `estados` VALUES (1,'Activo'),(2,'Eliminado');
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motoristas`
--

DROP TABLE IF EXISTS `motoristas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motoristas` (
  `idMotorista` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `IdStatus` int NOT NULL DEFAULT '1',
  `apellido` varchar(50) DEFAULT NULL,
  `numeroLicencia` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idMotorista`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motoristas`
--

LOCK TABLES `motoristas` WRITE;
/*!40000 ALTER TABLE `motoristas` DISABLE KEYS */;
INSERT INTO `motoristas` VALUES (1,'Juan Pérez',2,NULL,NULL),(2,'María',1,'López','123'),(3,'Laura',2,NULL,NULL),(4,'Laura Karina',1,'Chinchilla','1234'),(5,'Erick',1,'Montufar','12345');
/*!40000 ALTER TABLE `motoristas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros`
--

DROP TABLE IF EXISTS `registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros` (
  `idRegistro` int NOT NULL AUTO_INCREMENT,
  `vehiculo_id` int DEFAULT NULL,
  `motorista_id` int DEFAULT NULL,
  `tipo` enum('entrada','salida') DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `IdStatus` int NOT NULL DEFAULT '1',
  `kilometraje` bigint DEFAULT NULL,
  `kilometrajeInicial` bigint DEFAULT NULL,
  `kilometrajeFinal` bigint DEFAULT NULL,
  `hora` time DEFAULT NULL,
  PRIMARY KEY (`idRegistro`),
  KEY `vehiculo_id` (`vehiculo_id`),
  KEY `motorista_id` (`motorista_id`),
  CONSTRAINT `registros_ibfk_1` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculos` (`idVehiculo`),
  CONSTRAINT `registros_ibfk_2` FOREIGN KEY (`motorista_id`) REFERENCES `motoristas` (`idMotorista`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros`
--

LOCK TABLES `registros` WRITE;
/*!40000 ALTER TABLE `registros` DISABLE KEYS */;
INSERT INTO `registros` VALUES (1,3,4,'salida','2026-01-14',1,155,345,500,'16:52:34'),(2,4,5,'salida','2026-01-13',1,76,124,200,'17:53:35');
/*!40000 ALTER TABLE `registros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculos` (
  `idVehiculo` int NOT NULL AUTO_INCREMENT,
  `placa` varchar(20) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `IdStatus` int NOT NULL DEFAULT '1',
  `marca` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idVehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES (1,'ABC-123','Toyota Corolla 2020',2,NULL),(2,'XYZ-789','Civic 2021',1,'Honda'),(3,'HBU2574','Ford',1,'Test'),(4,'HBU2576','Hilux',1,'Yoyota'),(5,'HBU2573','Hilu',1,'Ford'),(6,'XYZ-787','Corolla',1,'Toyota');
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vta_vehiculos`
--

DROP TABLE IF EXISTS `vta_vehiculos`;
/*!50001 DROP VIEW IF EXISTS `vta_vehiculos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vta_vehiculos` AS SELECT 
 1 AS `idVehiculo`,
 1 AS `placa`,
 1 AS `modelo`,
 1 AS `IdStatus`,
 1 AS `marca`,
 1 AS `VehiculoC`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_registrosdetalle`
--

DROP TABLE IF EXISTS `vw_registrosdetalle`;
/*!50001 DROP VIEW IF EXISTS `vw_registrosdetalle`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_registrosdetalle` AS SELECT 
 1 AS `idRegistro`,
 1 AS `tipo`,
 1 AS `fecha`,
 1 AS `hora`,
 1 AS `IdStatus`,
 1 AS `kilometraje`,
 1 AS `kilometrajeInicial`,
 1 AS `kilometrajeFinal`,
 1 AS `vehiculo`,
 1 AS `vehiculo_id`,
 1 AS `placa`,
 1 AS `modelo`,
 1 AS `marca`,
 1 AS `motorista_id`,
 1 AS `motorista`,
 1 AS `numeroLicencia`,
 1 AS `kilometrajeRecorrido`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vta_vehiculos`
--

/*!50001 DROP VIEW IF EXISTS `vta_vehiculos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vta_vehiculos` AS select `ve`.`idVehiculo` AS `idVehiculo`,`ve`.`placa` AS `placa`,`ve`.`modelo` AS `modelo`,`ve`.`IdStatus` AS `IdStatus`,`ve`.`marca` AS `marca`,concat(`ve`.`placa`,' - ',`ve`.`marca`,' - ',`ve`.`modelo`) AS `VehiculoC` from `vehiculos` `ve` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_registrosdetalle`
--

/*!50001 DROP VIEW IF EXISTS `vw_registrosdetalle`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_registrosdetalle` AS select `r`.`idRegistro` AS `idRegistro`,`r`.`tipo` AS `tipo`,`r`.`fecha` AS `fecha`,`r`.`hora` AS `hora`,`r`.`IdStatus` AS `IdStatus`,`r`.`kilometraje` AS `kilometraje`,`r`.`kilometrajeInicial` AS `kilometrajeInicial`,`r`.`kilometrajeFinal` AS `kilometrajeFinal`,concat(`v`.`placa`,' ',`v`.`marca`,' ',`v`.`modelo`) AS `vehiculo`,`v`.`idVehiculo` AS `vehiculo_id`,`v`.`placa` AS `placa`,`v`.`modelo` AS `modelo`,`v`.`marca` AS `marca`,`m`.`idMotorista` AS `motorista_id`,concat(`m`.`nombre`,' ',`m`.`apellido`) AS `motorista`,`m`.`numeroLicencia` AS `numeroLicencia`,(`r`.`kilometrajeFinal` - `r`.`kilometrajeInicial`) AS `kilometrajeRecorrido` from ((`registros` `r` join `vehiculos` `v` on((`r`.`vehiculo_id` = `v`.`idVehiculo`))) join `motoristas` `m` on((`r`.`motorista_id` = `m`.`idMotorista`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-14 17:43:23
