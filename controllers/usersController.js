const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
    res.json(usersDB.users); //200 OK (default)
}

const getUser = (req, res) => {
    const user = usersDB.users.find(usr => usr.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ "message": `User ID ${req.params.id} not found` }); //404 Not Found
    }
    res.json(user); //200 OK (default)
}

const createNewUser = async (req, res) => {
    const { id, name, major, minor, skills, email, pwd } = {
        id: usersDB.users?.length ? usersDB.users[usersDB.users.length - 1].id + 1 : 1,
        ...req.body
    }

    if(
        !name ||
        !major ||
        //minor optional
        !skills ||
        !email ||
        !pwd
    ) {
        return res.status(400).json({ 'message': 'Please fill out the required fields.' }); //400 Bad Request
    }
    //unique ID is email
    const duplicate = usersDB.users.find(person => person.email === email);
    if(duplicate) return res.sendStatus(409); //409 Conflict
    try{
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store new user
        const newUser = {
            "id": id,
            "fullname": name,
            "major": major,
            "minor": minor,
            "skills": skills,
            "email": email,
            "password": hashedPwd
        };
        //set DB on server
        usersDB.setUsers([...usersDB.users, newUser]);
        //set DB file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({"message": `Account created for ${name} (${email})!`}); //201 Created
    }
    catch(err){
        res.status(500).json({'message': err.message}); //500 Internal Server Error
    }
}

const updateUser = async (req, res) => {
    const user = usersDB.users.find(usr => usr.id === parseInt(req.body.id));
    if (!user) {
        return res.status(404).json({ "message": `User ID ${req.body.id} not found.` }); //404 Not Found
    }
    if (req.body.name) user.fullname = req.body.name;
    if (req.body.major) user.major = req.body.major;
    if (req.body.minor) user.minor = req.body.minor;
    if (req.body.skills) user.skills = req.body.skills;
    if (req.body.email) user.email = req.body.email;
    //filter out un-updated user, add back in, and sort by ID for consistency
    const filteredArray = usersDB.users.filter(usr => usr.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, user];
    //set DB on server
    usersDB.setUsers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    //set DB file
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );
    res.json(usersDB.users); // 200 OK (default)
}

const deleteUser = async (req, res) => {
    const user = usersDB.users.find(usr => usr.id === parseInt(req.body.id));
    if (!user) {
        return res.status(404).json({ "message": `User with ID ${req.body.id} not found.` }); //404 Not Found
    }
    const filteredArray = usersDB.users.filter(usr => usr.id !== parseInt(req.body.id));
    //set DB on server
    usersDB.setUsers([...filteredArray]);
    //set DB file
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );
    res.json(usersDB.users); //200 OK (default)
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}