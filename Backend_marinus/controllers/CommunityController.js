import Community from '../models/Community.js';

// Create a new community
export const createCommunity = async (req, res) => {
  const { name, description, location } = req.body;
  try {
    const community = new Community({ name, description, location });
    await community.save();
    res.status(201).json(community);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all communities
export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a community by ID
export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });
    res.json(community);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a community by ID
export const updateCommunity = async (req, res) => {
  const { name, description, location } = req.body;
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });

    community.name = name || community.name;
    community.description = description || community.description;
    community.location = location || community.location;

    await community.save();
    res.json(community);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a community by ID
export const deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });

    await community.remove();
    res.json({ message: 'Community removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
