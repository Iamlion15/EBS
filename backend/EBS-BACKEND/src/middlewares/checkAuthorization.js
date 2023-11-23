const userModel = require("../model/userModel")

exports.checkEBSAuthorization = (req, res, next) => {
    try {
        if (req.user.role === "EBS") {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}


exports.checkADMINAuthorization = (req, res, next) => {
    try {
        if (req.user.role === "ADMIN") {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}

exports.checkFINANCEAuthorization = (req, res, next) => {
    try {
        if (req.user.role === "FINANCE") {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}

exports.checkSTAFFAuthorization = (req, res, next) => {
    try {
        if (req.user.role === "STAFF") {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}




exports.checkApproversAuthorization=(req,res,next)=>{
    try {
        if (req.user.role === "FINANCE" || req.user.role === "EBS") {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}