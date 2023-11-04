//fetch = require("node-fetch")
import stream from "stream";
import { promisify } from "util";
import got from "got";
const pipeline = promisify(stream.pipeline);
export default ((req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  let p = req.url.indexOf("url=");
  let dest = req.url.substr(p + 4);
  dest = decodeURIComponent(dest);
  if (!/https?:\/\/.*/.test(dest)) {
    dest = "http://" + dest;
  }
  let headers = req.headers;
  try {
    headers.host = new URL(dest).host;
  } catch (e) {
    res.statusCode = 400;
    res.setHeader("access-control-allow-origin", "*");
    res.json({
      message: "Parameter error",
      error: e
    });
    return;
  }
  let option = {
    allowGetBody: true,
    throwHttpErrors: false,
    method: req.method,
    headers: headers,
    body: req
  };
  ;
  (async () => {
    try {
      await pipeline(got.stream(dest, option), res);
    } catch (err) {
      console.log("Error at await pipeline", err);
      res.json(err);
    }
  })();
});
export const config = {
  api: {
    bodyParser: false
  }
};