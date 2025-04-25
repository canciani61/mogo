const router = require('express').Router();
const { User, Thought } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v');
    
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v');
    
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT update a user by id
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE a user by id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    
    // BONUS: Remove a user's associated thoughts when deleted
    await Thought.deleteMany({ username: user.username });
    
    res.json({ message: 'User and associated thoughts successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// POST add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;