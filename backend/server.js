const instagramGetUrl = require("./instagram-url-direct-local")
// const instagramGetUrl = require("instagram-get-url");
// const { createProxyMiddleware } = require('http-proxy-middleware');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

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
// app.use(cors());

// Parse incoming request bodies as JSON
app.use(bodyParser.json());


// app.use(
//     '/api',
//     createProxyMiddleware({
//         target: 'http://api.example.com',
//         changeOrigin: true,
//     })
// );

// const getMediaUrl = async (inputURL) => {
//     let links = await instagramGetUrl(inputURL)
//     // let links = await instagramGetUrl(inputURL);
//     // console.log(links)
//     return new Promise((resolve, reject) => {
//         // some asynchronous operation here
//         // ...
//         // const result = 42; // the value you want to return
//         resolve(links); // wrap the value in a resolved Promise
//     });
// }

const getMediaUrl = async (inputURL) => {
    try {
        let links = await instagramGetUrl(inputURL);
        console.log(links)
        return new Promise((resolve, reject) => {
            // some asynchronous operation here
            // ...
            // const result = 42; // the value you want to return
            resolve(links); // wrap the value in a resolved Promise
        });
    } catch (error) {
        // Handle the error
        console.error({InstagramBasedError:error});
        // Return a rejected Promise
        return Promise.reject(error);
    }
};


// Define a route to handle incoming POST requests
// app.post('/api/getmedia', async (req, res) => {
//     inputURL = req.body.inputValue;
//     // Log the data sent in the request body
//     // console.log(req.body.inputValue);
//     links = await getMediaUrl(inputURL)
//     // console.log(links.url_list, 'from')
//     // Send a JSON response to the client
//     res.json({ links: links.url_list });
// });

app.post('/', async (req, res) => {
    try {
        const inputURL = req.body.inputValue;
        const links = await getMediaUrl(inputURL);
        console.log({links})
        res.json({ links: links.url_list });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error-> ' + error });
    }
});
app.get('/ping', (req, res)=>{
    res.json({message:"pong"})
})

app.post('/ping', (req, res)=>{
    let message = res.body.msg
    res.json({message})
})

// Start the server
app.listen(5001, () => {
    console.log('Server listening on port 5001');
});
