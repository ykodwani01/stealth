const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


exports.register = async (req, res) =>{
  try{
    const {username, password} = req.body;
    if(!username || !password){
      return res.status(400).json({message: "Please provide username and password"});
    }
    const existingUser = await User.findOne({username});
    if(existingUser){
      return res.status(400).json({message: "Username already exists"});
    }
    const newUser = new User({username, password});
    await newUser.save();
    res.status(201).json({message: "User registered successfully"});
  }
  catch(err){
    res.status(500).json({message: "Error registering user", error: err.message})
  }
}

//login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password){ return res.status(400).json({ message: 'Username and password are required' });
    }
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password)))
        {return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id }, 'phaserunner03', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};