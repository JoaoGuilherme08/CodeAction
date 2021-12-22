const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

async function run() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
    var results;
    var gifUrl;

    const octokit = github.getOctokit(GITHUB_TOKEN);

    const { context = {} } = github;
    const { pull_request } = context.payload;  
    
    if(pull_request.action == "closed") {

      do{
        const randomPos = Math.round(Math.random() * 10);
        const url = `https://api.tenor.com/v1/search?q=recusado&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
        const response = await fetch(url);
        results = await response.json();
      }while(results['next'] === "0" );

      gifUrl = results['results'][0]['media'][0]['tinygif']['url'];
    }else if(pull_request.action == "opened"){
      do{
        const randomPos = Math.round(Math.random() * 10);
        const url = `https://api.tenor.com/v1/search?q=tamo%20junto&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
        const response = await fetch(url);
        results = await response.json();
      }while(results['next'] === "0" );
      gifUrl = results['results'][0]['media'][0]['tinygif']['url'];
    }

    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: `Obrigado pela pull request, A Solinftec é a melhor.\n\n<img src="${gifUrl}" alt="thank you" />`
    });
  }


  
  run();