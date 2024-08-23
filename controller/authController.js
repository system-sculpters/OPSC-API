const { User } = require('../config')


const signup = (req, res) => {
    const { username, email, password } = req.body

    try {
        const addUser = User.add({
            "username": username,
            "email": email,
            "balance": 10_000
        })

        res.send({ message: "Category Added" });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

const signin = (req, res) => {

}

const logout = (req, res) => {

}