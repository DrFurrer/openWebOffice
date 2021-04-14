-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3309
-- Erstellungszeit: 14. Apr 2021 um 12:23
-- Server-Version: 10.5.9-MariaDB
-- PHP-Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `openweboffice`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `crm_structure_process`
--

CREATE TABLE `crm_structure_process` (
  `RecNo` bigint(20) NOT NULL,
  `StateCd` smallint(6) DEFAULT 1,
  `LangCd` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProcessCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProcessCategoryCd` int(11) DEFAULT NULL,
  `Designation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProcessData` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ValidBegin` datetime DEFAULT NULL,
  `ValidEnd` datetime DEFAULT NULL,
  `Competence` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Permission` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `crtUser` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `crtDate` datetime DEFAULT NULL,
  `updUser` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tabellenstruktur für Tabelle `crm_structure_process_detail`
--

CREATE TABLE `crm_structure_process_detail` (
  `RecNo` bigint(20) NOT NULL,
  `StateCd` smallint(6) DEFAULT 1,
  `LangCd` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProcessId` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProcessTitle` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProcessText` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ValidBegin` datetime DEFAULT NULL,
  `ValidEnd` datetime DEFAULT NULL,
  `Competence` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Permission` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `crtUser` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `crtDate` datetime DEFAULT NULL,
  `updUser` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `crm_structure_process`
--
ALTER TABLE `crm_structure_process`
  ADD PRIMARY KEY (`RecNo`),
  ADD KEY `Competence` (`crtUser`,`Competence`),
  ADD KEY `StateCd` (`StateCd`,`ValidBegin`,`ValidEnd`) USING BTREE,
  ADD KEY `crtUser` (`crtUser`,`Permission`) USING BTREE;

--
-- Indizes für die Tabelle `crm_structure_process_detail`
--
ALTER TABLE `crm_structure_process_detail`
  ADD PRIMARY KEY (`RecNo`),
  ADD KEY `Competence` (`crtUser`,`Competence`),
  ADD KEY `StateCd` (`StateCd`,`ValidBegin`,`ValidEnd`) USING BTREE,
  ADD KEY `crtUser` (`crtUser`,`Permission`) USING BTREE;

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `crm_structure_process`
--
ALTER TABLE `crm_structure_process`
  MODIFY `RecNo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `crm_structure_process_detail`
--
ALTER TABLE `crm_structure_process_detail`
  MODIFY `RecNo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
