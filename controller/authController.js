const { admin, auth, User } = require('../config')


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
        const idToken = await userCredential.user.getIdToken();

        res.status(200).json({
            message: "User signed in successfully",
            id: userDoc.id,
            username: user.username,
            email: user.email,
            token: idToken
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
    const { email } = req.body;

    try {
        // Sign in the user with email and password using Firebase Admin SDK
        const userCredential = await admin.auth().getUserByEmail(email);
        
        // Use the provided password to re-authenticate
        const credential = admin.auth().createCustomToken(userCredential.uid);
        
        if (credential) {
            // Generate a new custom token
            const newToken = await admin.auth().createCustomToken(userCredential.uid);

            // Send the new token back to the frontend
            res.status(200).json({ token: newToken });
        } else {
            res.status(401).json({ error: 'Re-authentication failed' });
        }
    } catch (error) {
        console.error('Error re-authenticating user:', error);
        res.status(500).json({ error: 'Failed to re-authenticate user' });
    }
};


module.exports = { signup, signin, logout, reauthenticateUser }