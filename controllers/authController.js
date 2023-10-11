const bcrypt = require('bcrypt');
const User = require('../models/user-model');
/* const jwt = require('jsonwebtoken');
 const secretKey = 'secretkey';

const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
}*/

const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userexist = await User.findOne({username});
        if(userexist){
            return res.status(400).json({message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword , role: role || 'user' }); // save to db default role is user
        await user.save();

        res.json({ message:'Register Successfully..'});

    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};
/*
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid LoginDetail' })
        }

        const passwd = await bcrypt.compare(password, user.password)
        if (!passwd) {
            return res.status(401).json({ message: "Invalid LoginDetail" })
        }

        if(!registeredToken){
            return res.status(401).json({message:"Invalid Token"})
        }

        // const token = generateToken(user);
        res.json({ message :'Login Successful....'});
    } catch (error) {
        res.status(500).json({ message: 'Login Failed', error: error.message });
    }
};
*/
module.exports = { registerUser}