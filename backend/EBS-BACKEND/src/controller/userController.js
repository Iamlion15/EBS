const userModel = require("../model/userModel")
const { hash_password, match_password } = require("../helpers/hash_match_password")
const generate_Token = require("../helpers/tokenGenerator")

exports.loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        else {
            const match = await match_password(password, user.password);
            if (match) {
                const userName = user.firstname + " " + user.lastname;
                const userInformation = {
                    username: userName,
                    role: user.role
                }
                const token = generate_Token(user.email);
                user.password = "";
                return res.status(200).json({ message: "successfully authenticated", token: token, user: userInformation, loggedInUser: user })
            }
            else {
                return res.status(403).json({ message: "Invalid username or password" })
            }
        }
    } catch (error) {
        return
    }
}

exports.addUser = async (req, res) => {
    const newUser = new userModel({ ...req.body, password: await hash_password(req.body.password) });
    try {
        await newUser.save();
        res.status(200).json({ message: "successfully saved user" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error: err })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the user document with the new data
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.nID = req.body.nID;

        const updatedUser = await user.save();
        updatedUser.password = ""
        const userInformation = {
            username: user.firstname + " " + user.lastname
        }
        res.status(200).json({ message: "Successfully updated user", updatedUser, userInformation });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.checkPassword = async (req, res) => {
    const password = req.body.oldpassword
    try {
        const match = await match_password(password, req.user.password);
        if (match) {
            res.status(200).json({ confirm: true })
        }
        else {
            res.status(200).json({ confirm: false })
        }
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

exports.updateUserPassword=async(req,res)=>{
    const newpassword=req.body.newpassword
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the user document with the new data
        const password=await hash_password(newpassword)
        user.password=password;
        await user.save();
        res.status(200).json({ message: "Successfully changed passwords"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}


