import express from "express";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/login", (req, res) => {
    const cookieUsername = req.signedCookies.username;
    if (!cookieUsername){
        return res.sendStatus(401);
    }

    const user = users.find(u => u.username === cookieUsername);
    const {fullName, username} = user;
    res.json({username, fullName});
})

const users = [
    {
        username: "administrator", password: "321terces", fullName: "Test Persson"
    },
    {
        username: "dummyuser", password: "dummy", fullName: "Noen Andrè"
    }
]


app.post("/login", (req, res) => {

    const {password, username} = req.body;

    const user = users.find(u => u.username === username);
    if (user && user.password === password){
        res.cookie("username", username, {signed: true});
        res.sendStatus(200)
    } else {
        res.send(401);
    }
})

app.use(express.static("public"));

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`server started at http://localhost:${server.address().port}`);
    })
