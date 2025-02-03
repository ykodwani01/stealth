const appService = require("../services/appService");

// Register user
async function contact(req, res) {
  try {
    // console.log(req.body);
    res.status(200).json({ data: req.body, message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Error  ", error: err.message });
  }
}
async function bookSlot(req, res) {
    try {
      // console.log(req.body);
      res.status(200).json({ data: req.body, message: "Success" });
    } catch (err) {
      res.status(500).json({ message: "Error  ", error: err.message });
    }
  }


module.exports = {contact,bookSlot};