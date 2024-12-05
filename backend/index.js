const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const app = express();
const port=5000;


app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aiztsdb',
  password: 'asma99',
  port: 5432
});

app.get('/allemp', async (req, res)=>{
  try{
    const result=await pool.query('select * from employee');
   // res.json({status:"200",employeeList:result.rows});
    res.json(result.rows);
  }catch(err){
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

////////// fetch assigned tasks
app.get('/assignedtasks', async (req, res)=>{
  try{
    const result=await pool.query('select * from tasks');
    //res.json({status:"200",tasksList:result.rows});
    res.json(result.rows);
  }catch(err){
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

// add emloyee details
app.post('/registeremp', async (req, res) => {
  const { emp_name, emp_mobile, emp_EmergencyMob, emp_email, emp_joiningDate, emp_address } = req.body;

  try {
    // Check if an employee with the same name or email already exists
    const existingEmployee = await pool.query(
      'SELECT * FROM employee WHERE emp_name = $1 OR emp_email = $2',
      [emp_name, emp_email]
    );

    if (existingEmployee.rows.length > 0) {
      return res.status(400).json({ message: 'Employee already exists with the same name or email.' });
    }

    // Insert new employee into the database
    const result = await pool.query(
      'INSERT INTO employee (emp_name, emp_mobile, emp_EmergencyMob, emp_email, emp_joiningDate, emp_address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [emp_name, emp_mobile, emp_EmergencyMob, emp_email, emp_joiningDate, emp_address]
    );

    res.json({ message: 'Employee registered successfully!', employee: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});



// Register new user and hash the password
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into the database
    const result = await pool.query(
      'INSERT INTO login (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    res.json({ message: 'User registered successfully!', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login and compare password
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const result = await pool.query('SELECT * FROM login WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Login failed. Check your credentials.' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Login failed. Check your credentials.' });
    }

    res.json({ message: 'Login successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

/////////// task api  /////////

// Endpoint to assign a task
app.post('/assign-task', async (req, res) => {
    const { emp_id, task_description, task_end_time } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tasks (emp_id, task_description, task_end_time) VALUES ($1, $2, $3) RETURNING *',
            [emp_id, task_description, task_end_time]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to assign task' });
    }
});

/////// Delete Employee by Id

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
