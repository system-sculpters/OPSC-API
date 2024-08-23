const { admin, auth, User } = require('../config')


const updateEmailAndUsername = async (req, res) => {
    const { uid } = req.params
    const { newEmail, newUsername } = req.body
    try {
      // Update the user's email and username in Firebase Auth
      await admin.auth().updateUser(uid, {
        email: newEmail,
        displayName: newUsername,
      });
  
      // Update the username in your Firestore database
      await User.doc(uid).update({
        email: newEmail,
        username: newUsername,
      });
  
      console.log('Successfully updated email and username.');
      res.status(200).json({ message: 'Email and username updated successfully.' });
    } catch (error) {
      console.error('Error updating email and username:', error);
      throw new Error('Failed to update email and username.');
    }
};

const updatePassword = async (req, res) => {
    const { uid } = req.params
    const { newPassword } = req.body
    try {
      // Update the user's password in Firebase Auth
      await admin.auth().updateUser(uid, {
        password: newPassword,
      });
  
      console.log('Successfully updated password.');
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error('Error updating password:', error);
      throw new Error('Failed to update password.');
    }
};

  module.exports = { updateEmailAndUsername, updatePassword}