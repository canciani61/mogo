const router = require('express').Router();
const { Thought, User } = require('../../models');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single thought by id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    
    // Add thought to the associated user's thoughts array
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT update a thought by id
router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE a thought by id
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    
    // Remove thought from user's thoughts array
    await User.findOneAndUpdate(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } }
    );
    
    res.json({ message: 'Thought successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// POST create a reaction stored in a single thought's reactions array
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE remove a reaction by the reaction's reactionId
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;