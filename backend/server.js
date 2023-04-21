const instagramGetUrl = require("./instagram-url-direct-local")
// const instagramGetUrl = require("instagram-get-url");
// const { createProxyMiddleware } = require('http-proxy-middleware');

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { default: axios } = require('axios');
const app = express();

// middleware
const corsOptions = {
    origin: "*", // frontend URI (ReactJS)
    optionsSuccessStatus: 200,
    preflightContinue:true,
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header', "Access-Control-Allow-Headers"]
}
app.use(express.json());
app.use(logger('combined'))
app.use(cors(corsOptions));

// Allow cross-origin requests from any domain
app.use(cors());


// const getMediaUrl = async (inputURL) => {
//     try {
//         let links = await instagramGetUrl(inputURL);
//         // console.log(links)
//         return new Promise((resolve, reject) => {
//             // some asynchronous operation here
//             // ...
//             // const result = 42; // the value you want to return
//             resolve(links); // wrap the value in a resolved Promise
//         });
//     } catch (error) {
//         // Handle the error
//         // console.error({InstagramBasedError:error});
//         console.log("error----------", error);
//         // Return a rejected Promise
//         return Promise.reject(error);
//     }
// };

app.post('/', async (req, res) => {
  try {
    const BASE_URL = "https://instasupersave.com/"
    const data = {
      url: req.body.inputValue
    }

    let getUrl = await axios.post(`${BASE_URL}api/convert`, data)

    let ig = []
    if (Array.isArray(getUrl.data)) {
      getUrl.data.forEach(post => { ig.push(post.sd === undefined ? post.thumb : post.sd.url) })
    } else {
      ig.push(getUrl.data.url[0].url)
    }

    res.json({ links: ig });
  } catch (error) {
    console.log("error----------", error);
    res.status(500).json({ error: 'Internal server error-> ' + error });
  }
});
app.get('/ping', (req, res)=>{
    res.json({message:"pong"})
})

app.post('/ping', (req, res)=>{
    let message = req.body
    res.json({message})
})

// Start the server
app.listen(5001, () => {
    console.log('Server listening on port 5001');
});
