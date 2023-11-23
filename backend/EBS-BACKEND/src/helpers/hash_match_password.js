const bcrypt = require("bcrypt")

exports.hash_password = async (password) => {
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}


exports.match_password=async(enteredPassword,password)=>{
    const match=await bcrypt.compare(enteredPassword,password);
    return match;
}