const getCurrent = async (req,res) => {
try {
    if(!req.user){ 
    throw new Error("The user is not authenticated");
    }
    const {email,name} = req.user;
    res.json({email,name});
} catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
}

}

module.exports = getCurrent;