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

        res.status(200).json({ message: "user registration successful", uid: userRecord.uid });

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
        
        console.log(user)
        // Sign in the user using email and password
        const userCredential = await auth.signInWithEmailAndPassword(user.email, password);
        const idToken = await userCredential.user.getIdToken();

        res.status(200).json({
            message: "User signed in successfully",
            uid: userDoc.id,
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

}


module.exports = { signup, signin, logout }