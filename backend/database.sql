CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
https://www.youware.com/project/jkznsbs51r
-- SQL statement to create the 'contacts' table
-- This table stores messages submitted through the contact form.
CREATE TABLE IF NOT EXISTS `contacts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SQL statement to create the 'blogs' table
-- This table stores blog posts, which are fetched by the /blogs endpoint.
CREATE TABLE IF NOT EXISTS `blogs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `author` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Seed data for the 'contacts' table
INSERT INTO `contacts` (`name`, `email`, `message`) VALUES
('John Doe', 'john.doe@example.com', 'I had a question about your services. Could you please get back to me?'),
('Jane Smith', 'jane.smith@example.com', 'Just wanted to say great website! Looking forward to new content.'),
('Alice Brown', 'alice.b@example.com', 'I encountered an issue with the contact form. It seemed to hang for a moment.');

-- Seed data for the 'blogs' table
INSERT INTO `blogs` (`title`, `content`, `author`) VALUES
('The Future of Web Development', 'Web development is constantly evolving, with new frameworks and technologies emerging regularly. This post explores the latest trends and what to expect in the coming years, focusing on AI-driven development and serverless architectures.', 'ChatGPT'),
('A Guide to Modern JavaScript', 'JavaScript remains the backbone of web development. This guide covers essential modern JavaScript features, including ES6+ syntax, asynchronous programming (async/await), and modular patterns for building scalable applications.', 'Babe Ruth'),
('Understanding Database Normalization', 'Database normalization is a crucial concept for designing efficient and robust databases. This article breaks down the different normal forms (1NF, 2NF, 3NF, BCNF) and explains why and how to apply them to prevent data redundancy and improve data integrity.', 'Albert Einstein'),
('Tips for Effective Remote Work', 'Working remotely has become a norm for many. This blog post offers practical tips to stay productive and maintain a healthy work-life balance while working from home, including setting up a dedicated workspace and managing distractions.', 'Marie Curie');
