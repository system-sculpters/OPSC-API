const { Goal } = require('../config')

const getGoals = async (req, res) =>{
    const {id} = req.params
    console.log(`this is the id: ${id}`)
    try {
        const snapshot = await Goal.get();
        
        const list = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(doc => doc.data.userid === id);
        
        console.log(list);
    
        res.status(200).json({list});
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

const createGoal = async (req, res) =>{
    const data = req.body;
    //const { userid, name } = data
    try { 
        await Goal.add({ data });
        //res.status(201).json({ message: 'Goal created successfully.' });
        res.send({ msg: "User Added" });
    } catch (error) {
        console.error('Error creating Goal:', error);
        res.status(500).json({ error: 'Failed to create Goal' });
    }
}

const updateGoal = async (req, res) =>{
    const { id } = req.params;
    const { Name, target_amount, current_amount, deadline, contribution_type, contribution_amount } = req.body;
    try {
        const GoalRef = Goal.doc(id);
        await GoalRef.update({  Name, target_amount, current_amount, deadline, contribution_type, contribution_amount});
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