
module.exports=(req,res,next)=>{
    const { serverName } = req.params;
  if (!serverName || typeof serverName !== "string" || serverName.trim() === "") {
    return res.status(400).json({ message: "Invalid server name in request parameters" });
  }
  next();
}