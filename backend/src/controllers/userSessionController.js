const UserSession = require("../models/UserSession");

// Get all sessions for a user
async function getUserSessions(req, res) {
  try {
    const { userId } = req.params;
    const sessions = await UserSession.findAll({ where: { user_id: userId } });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a session (logout from a device)
async function deleteSession(req, res) {
  try {
    const { id } = req.params;
    await UserSession.destroy({ where: { id } });
    res.json({ message: "Session deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUserSessions, deleteSession };
