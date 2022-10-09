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

const cookiee = 'csrftoken=KpnYS98RZO9LtGdDNGOlAydtqDQsRM9j; rur=\"NCG\\05455589687233\\0541696868553:01f7cea7bd1f083843295fa4d6620bba2623ee8a525f6d362cc471b3437b8e2e04ef6e25\"; sessionid=55589687233%3Akc4ZZ3SkBdM5ea%3A19%3AAYcREGOzKAwsPlzc8nW4Ab3nKVrolbRV4W2VkBIeLg; ds_user_id=55589687233';
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
       status : true
    })
})


app.listen(port, function(){
    console.log("Your App Running on", port);
/* This File Created By TechnoStone.xyz */
});
