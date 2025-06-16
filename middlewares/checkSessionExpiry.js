module.exports = (sessionExpiryTime = 5 * 60 * 1000) => {
  return (req, res, next) => {
    if (!req.session) {
      return res.status(401).json({ error: "Session not found" });
    }

    const now = Date.now();
    const sessionStartTime = req.session.startTime || now; // 初始化 startTime
    req.session.startTime = sessionStartTime;

    if (now - sessionStartTime > sessionExpiryTime) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        }
        return res
          .status(403)
          .json({ error: "Session expired. Please log in again." });
      });
    } else {
      next(); // 会话有效，继续
    }
  };
};
