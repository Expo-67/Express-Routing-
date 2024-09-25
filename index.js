// index.js
import express from "express";
import path from "path";

const app = express();

// Middleware to check if the server is within working hours
function checkWorkingHours(req, res, next) {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  // Check if it's Monday to Friday and between 9am and 5pm
  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next(); // Proceed to the next middleware/route
  } else {
    res.send(
      `<h1>Sorry, our website is only available during working hours (Monday to Friday, from 9 AM to 5 PM)</h1>`
    );
  }
}

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Serve static files (CSS)
app.use(express.static(path.join(path.resolve(), "public")));

// Apply the custom middleware
app.use(checkWorkingHours);

// Home route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Our Services route
app.get("/services", (req, res) => {
  res.render("services", { title: "Our Services" });
});

// Contact Us route
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
