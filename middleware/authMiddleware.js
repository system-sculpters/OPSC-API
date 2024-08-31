const { admin } = require('../config');

const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1]

    if(!idToken){
        return res.status(401).json({ error: 'Unauthorized: No token provided'});
    }

    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next()
    } catch(error){
        console.error('Error verifying ID token:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

const verifyUser = (req, res, next) => {
    const { id } = req.params;

    if (req.user.uid !== id) {
        console.log(`${req.user.uid} = ${id}`)
        return res.status(403).json({ message: 'User does not match' });
    }

    next();
};

module.exports = { verifyToken, verifyUser }