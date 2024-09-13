const { Goal } = require('../config')

const getGoals = async (req, res) =>{
    const { id } = req.params
    console.log(`this is the id: ${id}`)
    try {
        const snapshot = await Goal
        .where('userid', '==', id)
        .get();
        
        const list = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log(list);
    
        res.status(200).json(list);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

const createGoal = async (req, res) =>{
    const {contributionamount,
        contrubitiontype, 
        currentamount,
        deadline,
        name,
        targetamount,
        userid
    } = req.body;  

    const createdAt = Date.now()

    try { 
        const newGoal = {
            contributionamount: contributionamount,
            contrubitiontype: contrubitiontype,
            currentamount: currentamount,
            deadline: deadline,
            name: name,
            targetamount: targetamount, 
            userid: userid,
            createdAt: createdAt
        }
        await Goal.add( newGoal );
        //res.status(201).json({ message: 'Goal created successfully.' });
        res.send({ msg: "User Added" });
    } catch (error) {
        console.error('Error creating Goal:', error);
        res.status(500).json({ error: 'Failed to create Goal' });
    }
}

const updateGoal = async (req, res) =>{
    const { id } = req.params;

    const { contributionamount,
        contrubitiontype, 
        currentamount,
        deadline,
        name,
        targetamount } = req.body;

    const updatedAt = Date.now()
    try {
        const updatedGoal = {
            contributionamount: contributionamount,
            contrubitiontype: contrubitiontype,
            currentamount: currentamount,
            deadline: deadline,
            name: name,
            targetamount: targetamount,
            updatedAt: updatedAt
        }
        const GoalRef = Goal.doc(id);
        await GoalRef.update( updatedGoal );
        res.status(200).json({ message: 'Goal updated successfully.' });
    } catch (error) {
        console.error('Error updating Goal:', error);
        res.status(500).json({ error: 'Failed to update Goal' });
    }
}


const deleteGoal = async (req, res) =>{
    const { id } = req.params;
    try {
        const GoalRef = Goal.doc(id);
        await GoalRef.delete();
        res.status(200).json({ message: 'Goal deleted successfully.' });
    } catch (error) {
        console.error('Error deleting Goal:', error);
        res.status(500).json({ error: 'Failed to delete Goal' });
    }
}


module.exports = { getGoals, createGoal, updateGoal, deleteGoal }