const { admin, auth, User } = require('../config')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    const { username, email, password } = req.body

    try { 
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: username,
        });

        await User.doc(userRecord.uid).set({
            username: username,
            email: email,
            balance: 10_000
        })

        res.status(200).json({ message: "user registration successful", id: userRecord.uid });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

const signin = async (req, res) => {
    const { username, password } = req.body
    try {
        // Fetch the user document using the username
        const userSnapshot = await User.where('username', '==', username).get();

        if (userSnapshot.empty) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Assuming usernames are unique and there's only one user
        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();
        
        console.log(userDoc.id)
        // Sign in the user using email and password
        const userCredential = await auth.signInWithEmailAndPassword(user.email, password);
        const userData = await userCredential.user

        const payload = {
            uid: userData.uid,
            email: userData.email
        };

        // Sign a JWT with a 3-day expiration
        const token = jwt.sign(payload, process.env.POLYGON_API_KEY, { expiresIn: '3d' });

        res.status(200).json({
            message: "User signed in successfully",
            id: userDoc.id,
            username: user.username,
            email: user.email,
            token: token
        });
    } catch (error) { 
        console.error('Error signing in user:', error);
        res.status(401).json({ error: 'Invalid username or password' });
    }
}

const logout = async (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split('Bearer ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authorization token is missing' });
        }

        // Verify the token to get the user's UID
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        // Revoke all refresh tokens for the specified user
        await admin.auth().revokeRefreshTokens(uid);

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error logging out user:', error);
        if (error.code === 'auth/argument-error') {
            return res.status(400).json({ error: 'Invalid token format' });
        } else if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ error: 'Token expired' });
        } else {
            return res.status(500).json({ error: 'Failed to log out user' });
        }
    }
};

const reauthenticateUser = async (req, res) => {
    const {refreshToken} = req.body;

    try {
        const newTokens = await refreshIdToken(refreshToken);
        res.status(200).json({
        idToken: newTokens.idToken,
        refreshToken: newTokens.refreshToken, // Optionally update client-side refresh token
        expiresIn: newTokens.expiresIn,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const refreshIdToken = async (refreshToken) => {
    const apiKey = process.env.FIREBASE_API_KEY; // Use your Firebase API key here
    const refreshTokenUrl = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;
  
    const response = await fetch(refreshTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      return {
        idToken: data.id_token,
        refreshToken: data.refresh_token, // Updated refresh token
        expiresIn: data.expires_in, // Time until new token expires
      };
    } else {
      throw new Error(`Error refreshing token: ${data.error.message}`);
    }
  };


module.exports = { signup, signin, logout, reauthenticateUser }