const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

const saltRounds = 10; // You can adjust the salt rounds as needed

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'Girija@6595',
    database: 'FITNESS',
    waitForConnections: true,
    queueLimit: 0,
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/submit-signup', (req, res) => {
  const { name, username, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error encrypting password');
      } else {
          let sql = `INSERT INTO signup_info (Username, Name, Email, Password) VALUES (?, ?, ?, ?)`;
          db.query(sql, [username, name, email, hash], (err, result) => {
              if (err) {
                  console.error(err);
                  res.status(500).send('Error saving user');
              } else {
                  res.send('User created successfully');
              }
          });
      }
  });
});

app.post('/submit-appointment', (req, res) => {
  const { name, email, date, service } = req.body;
  let sql = 'INSERT INTO appointments (name, email, appointment_date, service) VALUES (?, ?, ?, ?)';

  db.query(sql, [name, email, date, service], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error saving appointment');
      } else {
          res.send('Appointment booked successfully');
      }
  });
});

app.get('/get-appointments', (req, res) => {
  let sql = 'SELECT * FROM appointments';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving appointments');
    } else {
      res.json(results);
    }
  });
});

app.get('/get-user-profiles', (req, res) => {
  let sql = 'SELECT * FROM user_profiles';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving user profiles');
    } else {
      res.json(results);
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM signup_info WHERE email = ?';

  db.query(sql, [email], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Server error');
      } else {
          if (results.length > 0) {
              bcrypt.compare(password, results[0].Password, (err, result) => {
                  if (result) {
                      res.json({ success: true });
                  } else {
                      res.json({ success: false, message: 'Incorrect password' });
                  }
              });
          } else {
              res.json({ success: false, message: 'User not found' });
          }
      }
  });
});

app.post('/submit-profile', (req, res) => {
  const { name, age, dob, height, weight, bmi, goals } = req.body;

  let sql = 'INSERT INTO user_profiles (name, age, dob, height, weight, bmi, fitness_goals) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, age, dob, height, weight, bmi, goals], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error saving profile');
      } else {
          res.send('Profile saved successfully');
      }
  });
});


// Add this endpoint to your server.js

app.get('/get-signup-info', (req, res) => {
    let sql = 'SELECT * FROM signup_info';  // Adjust the SQL query as needed
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving signup info');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/delete-user', (req, res) => {
    const { email } = req.body;
    // Assuming 'email' is the unique identifier for the user
    let sql = 'DELETE FROM signup_info WHERE email = ?';

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting user');
        } else {
            res.send('User deleted successfully');
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});