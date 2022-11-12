import posts from "./tuits.js";
let tuits = posts;

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit.time = '2h';
    newTuit.topic = 'Space';
    newTuit.liked = false;
    newTuit.likes = 0;
    newTuit.disliked = false;
    newTuit.dislikes = 0;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    newTuit._id = (new Date()).getTime() + '';
    tuits.unshift(newTuit);
    res.json(newTuit);
}

const findTuits  = (req, res) => {
    res.json(tuits);
}

const updateTuit = (req, res) => {
    const tuitIdToUpdate = req.params['tid'];
    const updates = req.body;
    const tuitIndex = tuits.findIndex((t) => t._id.toString() === tuitIdToUpdate);
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}

const deleteTuit = (req, res) => {
    const tuitIdToDelete = req.params['tid'];
    tuits = tuits.filter(tuit => tuit._id.toString() !== tuitIdToDelete);
    res.sendStatus(200);
}