const FormData = require('form-data');
const express = require('express');
const axios = require('axios');
const PORT = process.env.PORT || 7000;
const ROOT_API = 'https://770fe6b535f5.ngrok.io';
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('body:', req.body);
    if (req.method === "POST") {
        var bodyFormData = new FormData();
        for (key in Object.keys(req.body)) {
            bodyFormData.append(key, req.body[key])
        }
        console.log('bodyFormData:', bodyFormData);
        axios
            .post(`${ROOT_API}${req.originalUrl}`, bodyFormData, {
                headers:{'Content-Type': 'multipart/form-data' }
            })
            .then(_res => {
                res.json(_res.data)
            })
            .catch(error => {
                console.log(error);
                res.json({
                    "response_type": "ephemeral",
                    "text": "API error!"
                })
            });
    } else {
        res.json({
            "response_type": "ephemeral",
            "text": "API method is not supported!"
        })
    }
});

// var router = express.Router();
//
// router.get('/slack/log', function (req, res, next) {
//     res.send('hello, log api!')
// });

// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.get('/', (req, res) => res.render('pages/index'));
// app.use('/api', router);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
