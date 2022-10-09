const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
process.setMaxListeners(Infinity);

const username = 'nepmods'; // your temp instagram username for session cookie
const password = '698692Ak12z'; // your password for session coookie

const cookiee = 'csrftoken=PVl3mN49EWvYwRCDFZIvd15Lmg2UY09A; rur=\"EAG\\05455583039443\\0541696829346:01f751faf32795acbc182eed3f8a7b38d321b887d2ed13bef0b9392c7f207439d43d3530\"; sessionid=55583039443%3AnHiGPSIvWn0ID1%3A11%3AAYcBlftSFQLIfRPJeT_N-abgcZf8e2gUa05sm79zWg; ds_user_id=55583039443';
/* How To Get Cookie 
Deploy Your App On Server The Visit Bellow Link

https://yourdomain.com/session

*/

const { igApi ,getCookie } = require("insta-fetcher");
// This Code Use insta-fetcher I respect The owner

let ig = new igApi(cookiee);


app.get("/api", async(req, res) => {
  const url = req.query.url
    ig.fetchPost(url).then((data) => {
      if (!data) {
        res.status(400).json({status : false})
      }
  res.status(200).json({data})
})



})
app.get("/session", async(req, res) => {
    // this rout for get session id Make In Private for your Account Safety Chnage Rout Adresssss
(async () => {
  try {
    const cookie = await getCookie(username, password);
    res.status(200).json({cookie})
  } catch (error) {
    res.status(400).json({error})
  }
})();
})

app.get("/", (req, res) => {
    res.setHeader("Cache-Control", "public,max-age=0");
    res.status(200).json({
        YouTube: 'https://youtube.com/technostone',
        webSite: 'https://www.technostone.xyz',
        telegram: 'https://telegram.me/stonechats'
    })
})


app.listen(port, function(){
    console.log("Your App Running on", port);
/* This File Created By TechnoStone.xyz */
});
