// Utility to fetch user's authorized groups from DB
const Group = require('../models/Group');

const getUserGroups = async (userId) => {
  try {
    const groups = await Group.find({ members: userId }).select('_id');
    return groups.map(group => group._id.toString());
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return [];
  }
};

module.exports = { getUserGroups };
