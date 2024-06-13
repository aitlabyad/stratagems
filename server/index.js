const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UsersModel = require('./models/Users')
const TasksModel = require('./models/Task')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())

// Connection to MonogoDB
mongoose.connect("mongodb://127.0.0.1:27017/users")


// Login Route
app.post('/login', (req,res)=>{
    const {email, password} = req.body;
    UsersModel.findOne({email:email})
    .then(user => {
        if(user){
        
        bcrypt.compare(password, user.password, (err, response)=>{
            if(response){
                const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn:"1d"})
                res.cookie("token", token);
                
                res.json({
                    msg: "Success",
                    email:user.email
                });
            }else{
                res.json("the password is incorrect")
            }

        })


        }else {
            res.json("no user found")
        }
    })
})


// Register user Route

app.post('/register', (req,res)=>{
    const {name, email, password}= req.body;
    bcrypt.hash(password,10)
    .then(hash =>{
        UsersModel.create({name, email, password:hash})
        .then(users => res.json('user added'))
        .catch(err => res.json(err.message))
    })
        
    .catch(err => res.json(err.message))
})


// Add task Route

app.post('/add', async (req,res)=>{
    const {title,desc,state,owner} = req.body;
    const task = new TasksModel({
        title: req.body.title,
        desc: req.body.desc,
        state: req.body.status,
        owner: req.body.user,
        })
        await task.save()
        .then((response) => {
            res.status(200).send({ response: response });
        })
        .catch((err) => {
        res.status(500).send({ response: err.message });
        });
})


/// get tasks by owner Route
app.post('/tasks', async (req, res) => {
    const { username, isCompleted } = req.body;
    
    try {
        
        const query = {}; // Start with an empty query
        query.owner = username;
       

        if (isCompleted === "completed" || isCompleted === "incompleted") {
            query.state = isCompleted ;
        } 
       
      const tasks = await TasksModel.find(query);

      
  
      res.send(tasks);
      
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
  
 

// delete task by id Route
    app.delete('/delete', async (req, res) => {
        console.log('caled')
        const { id } = req.body; 
        console.log(id)
        try {
          const deletedTask = await TasksModel.findByIdAndDelete(id); 
      
          if (!deletedTask) {
            return res.status(404).send({ message: 'Task not found' });
          }
      
          res.send({ id});
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error deleting task' });
        }
      });

/// update tasks by id Route
      app.put('/update/:id', async (req, res) => {
        const taskId = req.params.id;
        const updatedTaskData = req.body; 
        console.log("Updated task data:", updatedTaskData);
        const data = {id:taskId , data:updatedTaskData}
        try {
            const updatedTask = await TasksModel.findByIdAndUpdate(
                taskId, updatedTaskData, { new: true }
            );
            if (!updatedTask) {
                return res.status(404).send({ message: 'Task not found' });
            }
            const resso = { response: updatedTaskData , taskid:taskId }
            res.send(resso);
            console.log(resso)
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal server error' });
        }
    });




app.listen(3001, ()=>{
    console.log('server is runing')
})

