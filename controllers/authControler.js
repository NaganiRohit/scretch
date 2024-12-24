const userModel = require("../models/user-model");
const bcrypt = require('bcryptjs');
const { generateaToken } = require("../utils/generatetoken");

//-------------------------------------------------------- Register ---------------------------------------------------------------
module.exports.registerUser = async function (req, res) {
    const { fullname, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            // Generate a salt
            bcrypt.genSalt(10, async (err, salt) => {
                if (err) {
                    return res.status(500).send("Error generating salt.");
                } else {
                    // Hash the password
                    bcrypt.hash(password, salt, async (err, hash) => {
                        if (err) {
                            return res.status(500).send("Error hashing password.");
                        } else {
                            // Create the user
                            const newUser = await userModel.create({
                                fullname,
                                email,
                                password: hash, // Save the hashed password
                            });

                            // Generate a token
                            const token = generateaToken(newUser);

                            // Set the token in cookies
                            res.cookie("token", token);
                            res.redirect("/shop");
                        }
                    });
                }
            });
        } else {
            res.send("You already have an account. Please login.");
        }
    } catch (err) {
        res.send(err.message);
    }
};

//--------------------------------------------------------- Login -----------------------------------------------------------------
module.exports.loginUser = async function (req, res) {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            res.send("User not found");
        } else {
            // Compare the password
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (result) {
                    // If passwords match, generate a token
                    const token = generateaToken(existingUser);

                    // Set the token in cookies
                    res.cookie("token", token);
                    res.redirect("/shop");
                } else {
                    res.send("Invalid password");
                }
            });
        }
    } catch (error) {
        res.send(error.message);
    }
};
