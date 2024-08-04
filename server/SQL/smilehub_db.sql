-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 04, 2024 at 02:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smilehub_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment_table`
--

CREATE TABLE `appointment_table` (
  `ID` int(11) NOT NULL,
  `FULLNAME` varchar(70) NOT NULL,
  `EMAIL` varchar(70) NOT NULL,
  `PHONE` varchar(20) NOT NULL,
  `APPOINTMENT_DATE` varchar(30) NOT NULL,
  `APPOINTMENT_TIME` varchar(30) NOT NULL,
  `PURPOSE` varchar(50) NOT NULL,
  `STATUS` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_time_table`
--

CREATE TABLE `appointment_time_table` (
  `ID` int(11) NOT NULL,
  `TIME` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment_time_table`
--

INSERT INTO `appointment_time_table` (`ID`, `TIME`) VALUES
(1, '8:00 AM - 9:00 AM'),
(2, '9:00 AM - 10:00 AM'),
(3, '10:00 AM - 11:00 AM'),
(4, '11:00 AM - 12:00 PM'),
(5, '12:00 PM - 1:00 PM'),
(6, '1:00 PM - 2:00 PM'),
(7, '2:00 PM - 3:00 PM'),
(8, '3:00 PM - 4:00 PM'),
(9, '4:00 PM - 5:00 PM'),
(10, '5:00 PM - 6:00 PM');

-- --------------------------------------------------------

--
-- Table structure for table `employee_table`
--

CREATE TABLE `employee_table` (
  `ID` int(11) NOT NULL,
  `FULLNAME` varchar(70) NOT NULL,
  `EMAIL` varchar(70) NOT NULL,
  `PASSWORD` varchar(300) NOT NULL,
  `ROLE` varchar(15) NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_table`
--

INSERT INTO `employee_table` (`ID`, `FULLNAME`, `EMAIL`, `PASSWORD`, `ROLE`, `DATETIME`) VALUES
(13, 'admin account', 'admin@gmail.com', '$2y$10$VGlvB1ERQmNkmslHNFIo1.4iSy8O7QFyQgD.BRyAe5KX3O0S2fiCi', 'ADMIN', '2024-08-04 17:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `patient_table`
--

CREATE TABLE `patient_table` (
  `ID` int(11) NOT NULL,
  `FIRSTNAME` varchar(50) NOT NULL,
  `LASTNAME` varchar(50) NOT NULL,
  `BIRTHDATE` varchar(30) NOT NULL,
  `GENDER` varchar(10) NOT NULL,
  `PHONE` varchar(15) NOT NULL,
  `EMAIL` varchar(70) NOT NULL,
  `PASSWORD` varchar(300) NOT NULL,
  `ROLE` varchar(15) NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_table`
--

INSERT INTO `patient_table` (`ID`, `FIRSTNAME`, `LASTNAME`, `BIRTHDATE`, `GENDER`, `PHONE`, `EMAIL`, `PASSWORD`, `ROLE`, `DATETIME`) VALUES
(11, 'Kharl', 'Samson', '2024-08-03T16:00:00.000Z', 'Female', '09396164117', 'khrlsmsn1110@gmail.com', '$2y$10$jqgnoka8AbzWKe21b50o2u8vHpi0sSoBN4QicTN9xHoig8HbEliAy', 'PATIENT', '2024-08-04 18:06:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment_table`
--
ALTER TABLE `appointment_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `appointment_time_table`
--
ALTER TABLE `appointment_time_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `employee_table`
--
ALTER TABLE `employee_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `patient_table`
--
ALTER TABLE `patient_table`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment_table`
--
ALTER TABLE `appointment_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `appointment_time_table`
--
ALTER TABLE `appointment_time_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `employee_table`
--
ALTER TABLE `employee_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `patient_table`
--
ALTER TABLE `patient_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
