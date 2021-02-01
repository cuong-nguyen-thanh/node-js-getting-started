const FormData = require('form-data');
const express = require('express');
const axios = require('axios');
const PORT = process.env.PORT || 7000;
const ROOT_API = 'https://034bfb9405bf.ngrok.io';
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.method === "POST") {
        var bodyFormData = new FormData();
        Object.keys(req.body).forEach(key => {
            bodyFormData.append(key, req.body[key])
        });
        axios
            .post(`${ROOT_API}${req.originalUrl}`, bodyFormData, {
                headers: bodyFormData.getHeaders()
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
