const { admin, auth, User } = require('../config')

const getUser = async (req, res) =>{
  const { id } = req.params

  try {
    const userSnapshot = await User.where('username', '==', username).get();

    if (userSnapshot.empty) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Assuming usernames are unique and there's only one user
    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();
    
    res.status(200).json({
        message: "User signed in successfully",
        uid: userDoc.id,
        username: user.username,
        email: user.email
    });

  } catch (error) {
    
    console.error('Error fetching user details:', error);
    return res.status(500).json({ message: 'Failed to get user.', error: error.message });
  }
}

const updateEmailAndUsername = async (req, res) => {
    const { id } = req.params
    const { newEmail, newUsername } = req.body
    try {
      // Update the user's email and username in Firebase Auth
      await admin.auth().updateUser(id, {
        email: newEmail,
        displayName: newUsername,
      });
  
      // Update the username in your Firestore database
      await User.doc(id).update({
        email: newEmail,
        username: newUsername,
      });
  
      console.log('Successfully updated email and username.');
      res.status(200).json({ message: 'Email and username updated successfully.' });
    } catch (error) {
      console.error('Error updating email and username:', error);
      return res.status(500).json({ message: 'Failed to update email and username.', error: error.message });
    }
};

const updatePassword = async (req, res) => {
    const { id } = req.params
    const { newPassword } = req.body
    try {
      // Update the user's password in Firebase Auth
      await admin.auth().updateUser(id, {
        password: newPassword,
      });
  
      console.log('Successfully updated password.');
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error('Error updating password:', error);
      return res.status(500).json({ message: 'Failed to update password.', error: error.message });
    }
};

  module.exports = { getUser, updateEmailAndUsername, updatePassword}