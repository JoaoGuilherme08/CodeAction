const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

async function run() {
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const TENOR_TOKEN = core.getInput("TENOR_TOKEN");
  var results;

  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;
  console.log(context.payload);

  if (context.payload.action == "closed") {
    do {
      const randomPos = Math.round(Math.random() * 10);
      const url = `https://api.tenor.com/v1/search?q=refused&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
      const response = await fetch(url);
      results = await response.json();
    } while (results["next"] === "0");
    var gifUrl = results["results"][0]["media"][0]["tinygif"]["url"];
    var mensagem =
      "Sua pull foi recusada, mas não desista!, A Solinftec é a melhor.\n\n<img src=" +
      gifUrl +
      " alt='thank you' />";
  } else if (context.payload.action == "opened") {
    do {
      const randomPos = Math.round(Math.random() * 10);
      const url = `https://api.tenor.com/v1/search?q=tamo%20junto&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
      const response = await fetch(url);
      results = await response.json();
    } while (results["next"] === "0");
    var gifUrl = results["results"][0]["media"][0]["tinygif"]["url"];
    var mensagem =
      "Obrigado pela pull request, A Solinftec é a melhor.\n\n<img src=" +
      gifUrl +
      " alt='thank you' />";
  } else if (context.payload.action == "reopened") {
    do {
      const randomPos = Math.round(Math.random() * 10);
      const url = `https://api.tenor.com/v1/search?q=yay&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
      const response = await fetch(url);
      results = await response.json();
    } while (results["next"] === "0");
    var gifUrl = results["results"][0]["media"][0]["tinygif"]["url"];
    var mensagem =
      "Ebaaa sua pull foi reaberta!, A Solinftec é a melhor.\n\n<img src=" +
      gifUrl +
      " alt='thank you' />";
  }

  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: mensagem,
  });
}

run();
