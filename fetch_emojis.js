const https = require("https");
const fs = require('fs');

const token = process.env.SLACK_TOKEN;
const url = 'https://slack.com/api/emoji.list?token=' + token;


https.get(url, res => {
    res.setEncoding("utf8");

    let body = "";

    res.on("data", data => {
        body += data;
    });

    res.on("end", () => {
        body = JSON.parse(body);
        if (!body.ok) {
            console.log(body);
            return;
        }

        fs.writeFile("emojis.json", JSON.stringify(body.emoji, null, 2), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("Emojis successfully updated");
        });

    });
});