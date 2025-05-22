const express = require("express");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs"); // For checking .env file
const dotenv = require("dotenv");

// Explicitly load environment variables from .env file
const envPath = path.resolve(__dirname, ".env");
const result = dotenv.config({ path: envPath });

// Throw error if critical variables are missing
if (!process.env.HOST || !process.env.SENDER || !process.env.PASSWORD) {
  console.error("Error: Missing required environment variables (HOST, SENDER, PASSWORD)");
  process.exit(1);
}

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Update with your MySQL password if required
  database: "structured_db",
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.HOST || "smtp.gmail.com", // Fallback to smtp.gmail.com
  port: process.env.PORT ? parseInt(process.env.PORT) : 465,
  secure: true, // Use SSL/TLS for port 465
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASSWORD,
  },
});

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Contact form API
app.post("/api/contact-form", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // Send email notification using Nodemailer
    const mailOptions = {
      from: process.env.SENDER,
      to: "violetlamai521@gmail.com", // Receiver
      subject: "New Contact Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email error:", err);
        return res.status(500).json({ message: " failed to send email" });
      }
      console.log("Email sent:", info.response);
      res.json({ message: "Your Message Has been recieved!!We'll get back to you soon" });
    });
  });
});
// GET all
 app.get('/blogs', async (req, res) => {
  try {
    const [blogs] = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.render('blogs', { blogs }); // using EJS template
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading blogs');
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});