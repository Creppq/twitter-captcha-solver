const axios = require('axios');

const PAGE_URL = "https://twitter.com"; // Replace with your Website
const CLIENT_KEY = "capsolver.com api key";  // Replace with your CAPSOLVER API Key
const SITE_KEY = "0152B4EB-D2DC-460A-89A1-629838B529C9";

const headers = {
    "cache-control": "max-age=0",
    "sec-ch-ua": '"Not/A)Brand";v="99", "Google Chrome";v="107", "Chromium";v="107"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Windows",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    "accept": "*/*",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
    "sec-fetch-dest": "document",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en,fr-FR;q=0.9,fr;q=0.8,en-US;q=0.7"
  };

async function createTask(payload) {
  try {
    const res = await axios.post('https://api.capsolver.com/createTask', {
      clientKey: CLIENT_KEY,
      task: payload
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
async function getTaskResult(taskId) {
    try {
        success = false;
        while(success == false){

            await sleep(1000);
        console.log("Getting task result for task ID: " + taskId);
      const res = await axios.post('https://api.capsolver.com/getTaskResult', {
        clientKey: CLIENT_KEY,
        taskId: taskId
      });
      if( res.data.status == "ready") {
        success = true;
        console.log(res.data)
        return res.data;
      }
    }
  
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

async function solveFuncaptcha(pageURL, siteKey) {
  const taskPayload = {
    type: "FunCaptchaTaskProxyless",
    websiteURL: pageURL,
    websitePublicKey: siteKey,

  };
  const taskData = await createTask(taskPayload);
  return await getTaskResult(taskData.taskId);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {
  try {
   
      const response = await solveFuncaptcha(PAGE_URL, SITE_KEY );
      console.log(`Received FunCaptcha Token: ${response.solution.token}`);
        
    }
catch (error) {
    console.error(`Error: ${error}`);
  }

}
main();
