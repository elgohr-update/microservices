import express, { Request } from "express";
import bodyparser from "body-parser";
import axios from "axios";
import { Event } from "../../shared/Types";

const app = express();
app.use(bodyparser.json());

app.post("/events", (req: Request<{}, {}, Event>, res) => {
  const event = req.body;
  axios.post<any, any, Event>("http://localhost:4002/events", event);
  axios.post<any, any, Event>("http://localhost:2001/events", event);
  axios.post<any, any, Event>("http://localhost:2002/events", event);
  console.log("Event fired", event);
  res.send({ status: "OK" });
});
app.listen(4005, () => {
  console.log("bus listening on 4005");
});
