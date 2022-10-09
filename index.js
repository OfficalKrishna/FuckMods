const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
process.setMaxListeners(Infinity);

const username = 'rahulsinghaniya894'; // your temp instagram username for session cookie
const password = 'rahul123'; // your password for session coookie

const cookiee = 'csrftoken=EuktobwqO8774vVaXbGubMzV1rmhhkLm; rur=\"NAO\\05455583039443\\0541696866753:01f73fcb16e3daa5a3e9745bd15bb1ddfebef34727a2d2a1252d18bafb7451cfe1b6da15\"; sessionid=55583039443%3AODCIMPK5V10ijZ%3A14%3AAYdsRoAzjFKfbAAV8YB2iftvdJvVte3GvqTA8QI7fg; ds_user_id=55583039443';
/* How To Get Cookie 
Deploy Your App On Server The Visit Bellow Link

https://yourdomain.com/session

*/

const { igApi ,getCookie } = require("insta-fetcher");
// This Code Use insta-fetcher I respect The owner

let ig = new igApi(cookiee);


app.get("/api", async(req, res) => {
  const url = req.query.url
  if (!url) {
    res.status(400).json({status : false})
  }
  try {
    ig.fetchPost(url).then((data) => {
      if (!data) {
        res.status(400).json({status : false})
      }
  res.status(200).json({data})
}).catch((e) => {
  console.log(e);
})
  } catch (error) {
    console.log(error);
  }
   

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
