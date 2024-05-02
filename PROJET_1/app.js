const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const {Pool} = require('pg')
const session = require('express-session')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use(session({
  secret : 'DavidBens', 
  resave : false,
  saveUninitialized : false, 
  cookie : {
    secure: false, 
    maxAge : 1000*60*60*24
  }
}))

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: 'david2001',
    port: 5432
})

//Register
app.post('/register', async(req, res)=>{

    const {username, password, email} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    try{

      const existingUser = await pool.query(
        `SELECT * FROM tasks where username = $1 OR email = $2`, 
        [username, email]
      )
      if(existingUser.rows.length >0){
        res.status(409).json({ error: 'Username or E-mail already used' })
      }
      else{
        const newUser = await pool.query(
          `INSERT INTO tasks(username, password, email) VALUES($1, $2, $3) RETURNING *`,
          [username, hashedPassword, email]
        )  
        req.session.user = newUser.rows[0]
        res.status(201).json({ message: 'User created successfully' })
      }
    }
    catch(error){
      res.send('Error creating new user', error)
    }
})

//Login

app.post('/login', async(req,res)=>{
  const {username, password} = req.body

  try{
    const result = await pool.query(
      `SELECT * FROM tasks WHERE username = $1`, 
      [username]
    )
    if(result.rows.length > 0){
      const user = result.rows[0]
      const passwordMatch = await bcrypt.compare(password, user.password)

      if(passwordMatch){
        req.session.user = user
        res.json({ message: 'Successfully connected' });
      }
      else{
        res.status(400).json({ error: 'Wrong password' });
      }
    }
    else{
      res.status(404).json({error : 'Wrong Username'})
    }
  }
  catch(error){
    res.status(404).json({ error: 'Error during login', details: error })
  }
})

app.post('/logout', (req, res) => {
  if(req.session.user){
  req.session.destroy(err => {
      if (err) {
          return res.status(500).send('Error in the logout');
      }
      res.send('Successfully deconnected');
  });
  }
});



app.listen(4000, ()=>{
    console.log('Server is listening on 4000');
})