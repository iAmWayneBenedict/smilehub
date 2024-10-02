-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Oct 02, 2024 at 01:32 PM
-- Server version: 8.0.39
-- PHP Version: 8.2.8

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
  `ID` int NOT NULL,
  `FULLNAME` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `EMAIL` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PHONE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `APPOINTMENT_DATE` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `APPOINTMENT_TIME` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PURPOSE` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `STATUS` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment_table`
--

INSERT INTO `appointment_table` (`ID`, `FULLNAME`, `EMAIL`, `PHONE`, `APPOINTMENT_DATE`, `APPOINTMENT_TIME`, `PURPOSE`, `STATUS`) VALUES
(8, 'Kharl Samson', 'khrlsmsn1110@gmail.com', '9121212121', '2024-08-11', '8:00 AM - 9:00 AM', 'Cleaning', 'Completed'),
(46, 'John Doe', 'john.doe@example.com', '555-1234', '2024-09-23', '10:00 AM - 11:00 AM', 'Dental Crowns', 'Completed'),
(47, 'John Doe', 'john.doe@example.com', '555-1234', '2024-10-03', '8:00 AM - 9:00 AM', 'Dentures', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `appointment_time_table`
--

CREATE TABLE `appointment_time_table` (
  `ID` int NOT NULL,
  `TIME` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
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
-- Table structure for table `assessment_table`
--

CREATE TABLE `assessment_table` (
  `ID` int NOT NULL,
  `PATIENT_ID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `TOOTH_NO` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `COLOR` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `TEXTURE` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `GUM_HEALTH` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `PRESENCE_OF_DECAY` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `CAVITIES` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `SENSITIVITY` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `MOBILITY` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `PREVIOUS_TREATMENT` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessment_table`
--

INSERT INTO `assessment_table` (`ID`, `PATIENT_ID`, `TOOTH_NO`, `COLOR`, `TEXTURE`, `GUM_HEALTH`, `PRESENCE_OF_DECAY`, `CAVITIES`, `SENSITIVITY`, `MOBILITY`, `PREVIOUS_TREATMENT`, `DATETIME`) VALUES
(9, '11', '1', 'Brown', 'Pitted', 'Receding', 'no', 'yes', 'no', 'Moderately Loose', 'Extraction', '2024-10-02 12:14:16');

-- --------------------------------------------------------

--
-- Table structure for table `employee_table`
--

CREATE TABLE `employee_table` (
  `ID` int NOT NULL,
  `FULLNAME` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `EMAIL` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `BIRTHDAY` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `GENDER` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PASSWORD` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ROLE` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `STATUS` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_table`
--

INSERT INTO `employee_table` (`ID`, `FULLNAME`, `EMAIL`, `BIRTHDAY`, `GENDER`, `PASSWORD`, `ROLE`, `DATETIME`, `STATUS`) VALUES
(13, 'admin account', 'admin@gmail.com', '', '', '$2y$10$VGlvB1ERQmNkmslHNFIo1.4iSy8O7QFyQgD.BRyAe5KX3O0S2fiCi', 'ADMIN', '2024-08-04 17:52:05', 'ACTIVE'),
(17, 'John Doe', 'johndoe@example.com', '1990-01-01', 'Male', '$2y$10$.nV1N45hhXt0DNF.QSdsEOJrb0BAkFpRY1yoaDbcjrsRUZGAy1LmG', 'ADMIN', '2024-09-01 12:01:16', 'ACTIVE'),
(18, 'Staff Sample', 'staff@gmail.com', '', '', '$2y$10$1R/6yHk79PwHSpr/nrhewuoHjfPX0CKMEFIfKPSQm.OukgAB12PoS', 'STAFF', '2024-09-01 12:05:01', 'ACTIVE'),
(19, 'test name', 'dsamsonoel@gmail.com', '2024-09-22', 'Male', '$2y$10$arRC3ZL6jlQbwoSWXWht1u9wXkLUF.NBqp8CWZ4bW.xU0e3sbJ9Ui', 'ADMIN', '2024-09-22 16:12:00', 'ARCHIVE');

-- --------------------------------------------------------

--
-- Table structure for table `file_assessment_table`
--

CREATE TABLE `file_assessment_table` (
  `ID` int NOT NULL,
  `PATIENT_ID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `URL` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file_assessment_table`
--

INSERT INTO `file_assessment_table` (`ID`, `PATIENT_ID`, `URL`, `DATETIME`) VALUES
(13, '15', '035f86b401af16c24ee7f9c250a6ae72_1.png', '2024-10-02 12:07:41'),
(14, '11', '21e2d7b8c59b33d5e403b38acfcda0fe_1.png', '2024-10-02 12:13:58'),
(15, '15', 'e3ca06eab81406de22d5d900765ec054_1.png', '2024-10-02 12:19:25'),
(16, '12345', 'test', '2024-10-02 12:34:50');

-- --------------------------------------------------------

--
-- Table structure for table `form_table`
--

CREATE TABLE `form_table` (
  `ID` int NOT NULL,
  `PATIENT_ID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `TITLE` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `FIRST_NAME` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `LAST_NAME` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `OCCUPATION` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `BIRTHDAY` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `HOME_ADDRESS` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `CONTACT_NUMBER` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `EMAIL_ADDRESS` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `HEALTH_FUND` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `MEMBER_NUMBER` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `EMERGENCY_CONTACT_NAME` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `EMERGENCY_CONTACT_NUMBER` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `EMERGENCY_CONTACT_RELATIONSHIP` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `FAMILY_DOCTOR` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `DOCTOR_CONTACT` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `SUFFERING` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `PREGNANT_DURATION` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `HOSPITAL_PAST_2_DURATION` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `MEDICATION` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `SMOKE_PER_DAY` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `DENTAL_CONCERN_PROBLEMS` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `VISIT_PURPOSE` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `LAST_DENTAL` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `MAKE_YOU_NERVOUS` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `DENTAL_TREATMENT_REQUIREMENT` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `REFFERAL` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_table`
--

INSERT INTO `form_table` (`ID`, `PATIENT_ID`, `TITLE`, `FIRST_NAME`, `LAST_NAME`, `OCCUPATION`, `BIRTHDAY`, `HOME_ADDRESS`, `CONTACT_NUMBER`, `EMAIL_ADDRESS`, `HEALTH_FUND`, `MEMBER_NUMBER`, `EMERGENCY_CONTACT_NAME`, `EMERGENCY_CONTACT_NUMBER`, `EMERGENCY_CONTACT_RELATIONSHIP`, `FAMILY_DOCTOR`, `DOCTOR_CONTACT`, `SUFFERING`, `PREGNANT_DURATION`, `HOSPITAL_PAST_2_DURATION`, `MEDICATION`, `SMOKE_PER_DAY`, `DENTAL_CONCERN_PROBLEMS`, `VISIT_PURPOSE`, `LAST_DENTAL`, `MAKE_YOU_NERVOUS`, `DENTAL_TREATMENT_REQUIREMENT`, `REFFERAL`, `DATETIME`) VALUES
(3, '15', 'Mr.', 'test', 'test', 'test', 'N/A', 'test', '09197174114', 'test@gmail.com', 'test', 'test', 'test', 'N/A', 'test', 'test', '09197174114', 'Bone Disease (Osteoporosis)', 'test', 'test', 'test', 'test', 'Array', 'test', '2024-10-02', 'Yes', 'N/A', 'Array', '2024-10-02 13:17:56');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_group_table`
--

CREATE TABLE `inventory_group_table` (
  `ID` int NOT NULL,
  `NAME` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_group_table`
--

INSERT INTO `inventory_group_table` (`ID`, `NAME`, `DATETIME`) VALUES
(1, 'Dental Care Equipment A', '2024-09-22 13:14:00'),
(7, 'Dental Care Equipment B', '2024-10-02 13:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_item_table`
--

CREATE TABLE `inventory_item_table` (
  `ID` int NOT NULL,
  `NAME` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ITEM_GROUP` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `LOCATION` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `QUANTITY` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_item_table`
--

INSERT INTO `inventory_item_table` (`ID`, `NAME`, `ITEM_GROUP`, `LOCATION`, `QUANTITY`, `DATETIME`) VALUES
(4, 'Updated Item Name A', 'Dental Care Equipment A', 'Updated Storage Location', '20', '2024-09-22 13:53:18'),
(7, 'Updated Item Name B', 'Dental Care Equipment B', 'Updated Storage Location', '9', '2024-09-22 13:51:28'),
(8, 'Updated Item Name C', 'Dental Care Equipment B', 'Updated Storage Location', '20', '2024-09-22 13:53:18'),
(9, 'Updated Item Name D', 'Dental Care Equipment A', 'Updated Storage Location', '20', '2024-09-22 13:51:28'),
(15, 'Item 1', 'Dental Care Equipment B', 'Storage A', '3', '2024-10-02 13:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `patient_table`
--

CREATE TABLE `patient_table` (
  `ID` int NOT NULL,
  `FIRSTNAME` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `LASTNAME` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `BIRTHDATE` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `GENDER` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PHONE` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `EMAIL` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PASSWORD` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ROLE` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_table`
--

INSERT INTO `patient_table` (`ID`, `FIRSTNAME`, `LASTNAME`, `BIRTHDATE`, `GENDER`, `PHONE`, `EMAIL`, `PASSWORD`, `ROLE`, `DATETIME`) VALUES
(11, 'Kharl', 'Samson', '2024-08-03T16:00:00.000Z', 'Male', '09396164117', 'khrlsmsn1110@gmail.com', '$2y$10$jqgnoka8AbzWKe21b50o2u8vHpi0sSoBN4QicTN9xHoig8HbEliAy', 'PATIENT', '2024-08-04 18:06:41'),
(15, 'John', 'Doe', '1985-08-15', 'Male', '555-1234', 'john.doe@example.com', '$2y$10$w0mmF/Jswfr7Cw3hEsYWXu/TlUXhbKm7RGKk8DFJXYH/YQS2Lqbx2', 'PATIENT', '2024-08-18 11:19:37');

-- --------------------------------------------------------

--
-- Table structure for table `progress_table`
--

CREATE TABLE `progress_table` (
  `ID` int NOT NULL,
  `PATIENT_ID` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `COMPLAINT` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `HISTORY_UPDATE` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `X_RAY_FILE` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `DIAGNOSIS` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `TREATMENT_PLAN` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `PROCEDURES` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `MATERIALS_USED` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `INSTRUCTION` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `RESPONSE` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `SIGNATURE` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `DATE` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_table`
--

CREATE TABLE `task_table` (
  `ID` int NOT NULL,
  `TITLE` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DESCRIPTION` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `STATUS` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CREATOR` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CREATOR_EMAIL` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for table `assessment_table`
--
ALTER TABLE `assessment_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `employee_table`
--
ALTER TABLE `employee_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `file_assessment_table`
--
ALTER TABLE `file_assessment_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `form_table`
--
ALTER TABLE `form_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `inventory_group_table`
--
ALTER TABLE `inventory_group_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `inventory_item_table`
--
ALTER TABLE `inventory_item_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `patient_table`
--
ALTER TABLE `patient_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `progress_table`
--
ALTER TABLE `progress_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `task_table`
--
ALTER TABLE `task_table`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment_table`
--
ALTER TABLE `appointment_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `appointment_time_table`
--
ALTER TABLE `appointment_time_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `assessment_table`
--
ALTER TABLE `assessment_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employee_table`
--
ALTER TABLE `employee_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `file_assessment_table`
--
ALTER TABLE `file_assessment_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `form_table`
--
ALTER TABLE `form_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventory_group_table`
--
ALTER TABLE `inventory_group_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inventory_item_table`
--
ALTER TABLE `inventory_item_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `patient_table`
--
ALTER TABLE `patient_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `progress_table`
--
ALTER TABLE `progress_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `task_table`
--
ALTER TABLE `task_table`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
