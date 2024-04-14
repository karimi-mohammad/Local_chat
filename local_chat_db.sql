-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2024 at 06:17 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `local_chat_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_groups`
--

CREATE TABLE `tbl_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_groups`
--

INSERT INTO `tbl_groups` (`id`, `name`, `url`) VALUES
(1, 'تست', 'test'),
(2, 'امیرکبیر', 'amirkabir10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_group_msgs`
--

CREATE TABLE `tbl_group_msgs` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `time_sent` datetime DEFAULT current_timestamp(),
  `group_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_group_msgs`
--

INSERT INTO `tbl_group_msgs` (`id`, `user_name`, `message`, `time_sent`, `group_url`) VALUES
(1, 'gsdb', 'salam', '2024-04-14 19:44:11', 'amirkabir10'),
(2, 'gsdb', 'sad', '2024-04-14 19:44:20', 'amirkabir10'),
(3, 'ASFD', 'zxc', '2024-04-14 19:44:37', 'amirkabir10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_msgs`
--

CREATE TABLE `tbl_msgs` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `message` longtext NOT NULL,
  `time_sent` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_msgs`
--

INSERT INTO `tbl_msgs` (`id`, `user_name`, `message`, `time_sent`) VALUES
(1, 'Akbar', 'salam', '2024-01-08 14:24:46'),
(2, 'Akbar', 'hi', '2024-01-08 14:24:50'),
(3, 'Akbar', 'xcjhjkv', '2024-01-08 14:25:34'),
(4, 'Akbar', 'vbkg', '2024-01-08 14:25:37'),
(5, 'AFSsD', 'http://localhost:3000/index.html', '2024-01-08 14:46:42'),
(6, 'AFSsD', 'asdasfa', '2024-01-08 14:48:11'),
(7, 'ali', 'asfeadsf', '2024-01-08 14:50:22'),
(8, 'sfzfddxzcvxzxvvx', 'fdfd', '2024-01-08 15:04:17'),
(9, 'dzf', 'sgsgfdg', '2024-01-17 15:10:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_groups`
--
ALTER TABLE `tbl_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_tbl_groups` (`url`);

--
-- Indexes for table `tbl_group_msgs`
--
ALTER TABLE `tbl_group_msgs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_group_msgs_tbl_groups` (`group_url`);

--
-- Indexes for table `tbl_msgs`
--
ALTER TABLE `tbl_msgs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_groups`
--
ALTER TABLE `tbl_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_group_msgs`
--
ALTER TABLE `tbl_group_msgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_msgs`
--
ALTER TABLE `tbl_msgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_group_msgs`
--
ALTER TABLE `tbl_group_msgs`
  ADD CONSTRAINT `fk_tbl_group_msgs_tbl_groups` FOREIGN KEY (`group_url`) REFERENCES `tbl_groups` (`url`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
