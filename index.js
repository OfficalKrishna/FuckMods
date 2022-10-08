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

const cookiee = 'csrftoken=BpG58oHmA7T7Zcw8wVDDw5kcjqKy0Jzj; ig_did=03D63A41-1A25-41B3-8B15-FDFC85EF6990; ig_nrcb=1; mid=Y0EQKAAEAAFLxE07K2wRRDQ2HaH2';
/* How To Get Cookie 
Deploy Your App On Server The Visit Bellow Link

https://yourdomain.com/session

*/

const { igApi ,getCookie } = require("insta-fetcher");
// This Code Use insta-fetcher I respect The owner

let ig = new igApi(cookiee);


app.get("/api", async(req, res) => {
  const url = req.query.url
  if(url == '' || url == null){
    return res.status(400).send({
      success: false,
      message: "Query Can't Be Empty!",
      creator: "technostoneyt"
    });
  }
    ig.fetchPost(url).then((data) => {
  console.log(data);
  res.status(200).json({data})
});

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
