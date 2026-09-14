import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: new Date(Date.now()).toUTCString()
  })
})
app.get("/api/:date", (req, res) => {
  const { date } = req.params
  function cekTanggalValid(inputString) {
  if (/^\d+$/.test(inputString)) {
    const timestamp = parseInt(inputString, 10);
    return !isNaN(new Date(timestamp).getTime());
  }
  return !isNaN(new Date(inputString).getTime());
  }
  if(!cekTanggalValid(date)){
    res.json({
      error: "Invalid Date"
    })
    
  }
  const response = {
    unix: /^\d+$/.test(date) ? parseInt(date) : new Date(date).getTime(),
    utc: /^\d+$/.test(date) ? new Date(parseInt(date)).toUTCString() : new Date(date).toUTCString()
    }
  res.json(response)
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
