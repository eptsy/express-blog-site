const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const posts = [];

app.get("/", (request, response) => {
  response.render("home", { theposts: posts });
});
app.get("/blog", (request, response) => {
  response.render("blog");
});
app.get("/about", (request, response) => {
  response.render("about");
});
app.get("/compose", (request, response) => {
  response.render("compose");
});
app.get("/posts/:title", (request, response) => {
  let par = _.lowerCase(request.params.title);
  posts.forEach((e) => {
    if (par == _.lowerCase(e.postTitle)) {
      response.render("post", { title: e.postTitle, content: e.postDesc });
    }
  });
});

app.post("/compose", (request, response) => {
  const post = {
    postTitle: request.body.title,
    postDesc: request.body.post,
  };
  posts.push(post);
  response.redirect("/");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("— listening to 8000");
});
