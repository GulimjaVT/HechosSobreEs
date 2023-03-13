const { TwitterApi } = require("twitter-api-v2");
const conf = require("./config.json");
const fs = require("fs")

const cli = new TwitterApi({
	appKey: conf.apikey,
	appSecret: conf.apisec,
	accessToken: conf.accesskey,
	accessSecret: conf.accesssec
});

async function main() {
    fs.readFile("facts.json", async (err, data) => {
        let factsJSON = JSON.parse(data);
        let facts = factsJSON.factsString.split("\n");
    
        let fact = facts[Math.floor(Math.random() * facts.length)];
    
        facts.splice(facts.indexOf(fact), 1);
    
        factsJSON.quotesString = facts.join("\n");
    
        fs.writeFile("facts.json", JSON.stringify(factsJSON), (err) => {
            if (err) console.log(err);
        }); 
    
        cli.v1.tweet(fact).then((tweet) => {
            console.log("Tweeted")
        })
    })
}

main()
setInterval(main, 86400000);
