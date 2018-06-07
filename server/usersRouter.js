const express = require('express');
const DB = require('./db');
const usersRouter = express.Router();


const db = new DB();

// GET /users
usersRouter.get('/',  (req, res) => {
    db.getUsers().then((data)=>{
        res.json(data);
    });
});

// POST /users
usersRouter.post('/',  (req, res) => {
     db.createUser(req.body).then((data)=>{
        res.json(data);
    });

});

// POST /users
usersRouter.delete('/:id',  (req, res) => {
    const id =req.params.id;

    db.deleteUser(id).then((data)=>{
        res.json(data);
    })

})

// POST /users/7
/*usersRouter.post('/:id', async (req, res) => {
    const users = await db.createUsers();
    res.json(users);
});*/

module.exports = usersRouter;