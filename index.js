const express = require("express");
const colors = require("colors");
const cors = require("cors");
const axios = require("axios");
const base64 = require("image-to-base64");
const { json } = require("express");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
  })
);
app.use(json());
const PORT = process.env.PORT || 5000;

console.clear();

app.listen(PORT, () =>
  console.log(
    `Server is running on ${
      process?.env?.DEV_ENV ? `http://localhost:${PORT}` : PORT
    }`
  )
);

// utils
const imgUrlToBase64 = async (url) => {
  const res = await base64(url);
  return `data:image/jpeg;base64,${res}`;
};

// instagram api

// home
app.get("/", async (req, res) => {
  res.send("Server is working!");
let url = "https://www.instagram.com/reel/CjhAuBPNHEo/?igshid=YmMyMTA2M2Y="
const shortcodeFormatter = (url) => {
    const re = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com(?:\/.+?)?\/(p|reel|tv)\/)([\w-]+)(?:\/)?(\?.*)?$/gim.exec(url) || '';
    return {
        type: re[1],
        shortcode: re[2],
        url: 'https://www.instagram.com/' + re[1] + '/' + re[2],
    };
};
let short = shortcodeFormatter(url)
let shortcode = short.shortcode

 
  console.log( shortcode);
});

// instagram post

const cookie = 'csrftoken=KpnYS98RZO9LtGdDNGOlAydtqDQsRM9j; rur=\"NCG\\05455589687233\\0541696868553:01f7cea7bd1f083843295fa4d6620bba2623ee8a525f6d362cc471b3437b8e2e04ef6e25\"; sessionid=55589687233%3Akc4ZZ3SkBdM5ea%3A19%3AAYcREGOzKAwsPlzc8nW4Ab3nKVrolbRV4W2VkBIeLg; ds_user_id=55589687233';
app.get("/p", async (req, res) => {
  try {
    const igurl = req?.query.url
    const shortcodeFormatter = (url) => {
        const re = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com(?:\/.+?)?\/(p|reel|tv)\/)([\w-]+)(?:\/)?(\?.*)?$/gim.exec(url) || '';
        return {
            type: re[1],
            shortcode: re[2],
            url: 'https://www.instagram.com/' + re[1] + '/' + re[2],
        };
    };
    let short = shortcodeFormatter(igurl)
    let shortcode = short.shortcode
    const url = `https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`;
    const { data } = await axios({
      url,
      method: "get",
      headers: {
        "user-agent":
          "Instagram 22.0.0.15.68 Android (23/6.0.1; 640dpi; 1440x2560; samsung; SM-G935F; hero2lte; samsungexynos8890; en_US)",
        cookie,
      },
      validateStatus: false,
    });

    if (data) {
      const jsonData = async () => {
        return {
          isVideo: data?.items[0]?.video_versions ? true : false,
          singleMedia: data?.items[0]?.carousel_media
            ? null
            : {
                resources: data?.items[0]?.image_versions2?.candidates?.map(
                  (item) => ({
                    src: item.url,
                    width: item.width,
                    height: item.height,
                  })
                ),
                videoResources: data?.items[0]?.video_versions
                  ? data?.items[0]?.video_versions?.map((item) => ({
                      src: item.url,
                      width: item.width,
                      height: item.height,
                    }))
                  : null,
              },
        };
      };
      res.status(200).json(await jsonData());
    } else {
      res.status(200).json({
        error: "No data found",
      });
    }
  } catch (error) {
    console.log(colors.red(error.message));
    res.status(500).json({
      ...error,
      message: error.message,
    });
  } finally {
    console.log(colors.green(`Ended at: ${new Date().toLocaleString()}`));
  }
});
