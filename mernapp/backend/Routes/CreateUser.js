const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator')
const bycrypt =require('bcryptjs');
const jwt=require("jsonwebtoken");
const jwySecret="MynameisEndtoEndYouTubeChannel$#"

router.post("/createuser",
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt= await bycrypt.genSalt(10);
        let secPassword=await bycrypt.hash(req.body.password,salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.json({ success: false });
        }
    });

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userdata = await User.findOne({ email })
            if (!userdata) {
                return res.status(400).json({ errors: "try logging in with correct credentials" });
            }
            const pwdCompare=await bycrypt.compare(req.body.password,userdata.password)
            if (!pwdCompare ) {
                return res.status(400).json({ errors: "try logging in with correct credentials" });
            }
            const data = {
                user:{
                    id:userdata.id
                }
            }
            const authtoken=jwt.sign(data,jwySecret)
            return res.json({ success: true ,authtoken:authtoken});
        } catch (error) {
            console.error(error);
            res.json({ success: false });
        }
    });

module.exports = router;
