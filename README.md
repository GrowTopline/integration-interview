# Topline integration interview project

Thanks for taking the time to interview! We really appreciate it, and we hope to see the best of your work.

## Rules

Please do this interview project on your own, without the help of anyone else.
With that being said, you are more than welcome to use the internet.
Google and Stack Overflow are invaluable tools in our daily lives, and we wouldn't expect you to do your best work without them.

We'd really like to see every part of your development process, so please _record your screen while you work_.

In addition to writing the code required by the instructions, write down your answers to the questions in the instructions directly in this README file.
Most of the questions are open ended, and you don't need to make your code handle the questions below each prompt, but please make sure your code works before moving on to the next question.
Clear writing and expressing your ideas is just as valuable as writing great code.

## Motivation

We are testing you on your ability to reason through ambiguity, interact with software tools, and create features.
We are aware that working with the Intuit developer api and documentation is difficult. If you join us as an integrations engineer, you'll likely work with even more difficult integrations on a daily basis. We want to make sure you have the skills required to navigate the myriad of integration documents out in the world.

## Getting started

Make a fork of this repo on your own GitHub account and then clone it down to your personal computer.

- Read through the files in the `/src` directory.
- Install dependencies for the project with `yarn install`.
- Start the backend server with `yarn start` or `yarn dev` depending on whether you want the server to run in "watch mode".
- Navigate to [http://localhost:8080](http://localhost:8080) in your browser

If you have trouble, please don't hesitate to reach out to elliot@growtopline.com.

## Instructions

1. This application has been written to go through the Intuit OAuth flow. The code should work as written, but it will require the credentials of a sandbox Intuit account to work properly. Please [create a developer account](https://accounts.intuit.com/signup.html?offering_id=Intuit.devx.devx) with Intuit and use the [developer dashboard](https://developer.intuit.com/app/developer/dashboard) to create a Intuit App in the sandbox environment. Using the client ID and secret from your app, make the OAuth flow work.

- What did you need to do to make the app work?
- Why is it important to verify that the `state` value created in the OAuth URI is the same state value provided in the callback?
- If this app were running in production, how would you give the app access to your Intuit client ID and secret?

2. Now that the OAuth flow works, store the auth tokens in the database. You'll likely need to modify `/src/db.ts` as well as `/src/main.ts`. Once you've got the tokens stored in the database, implement the `/refresh-token` route using the Intuit OAuth client.

- Why might it be a good idea to encrypt the auth_token and the refresh_token? (you don't need to implement this encryption)
- What race conditions might be important to consider when refreshing the auth tokens?

3. Implement the `/company-info` route using the [CompanyInfo](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/companyinfo) query endpoint and the [makeApiCall](https://www.npmjs.com/package/intuit-oauth#make-api-call) method on the OAuthClient.
   Pass the result of the call directly back to the user as JSON.

- What are the pros and cons of passing the JSON value received from this endpoint directly back to the calling user?

## Tips

- The project needs some organization. Feel free to create as many files and folders as you need.
- Git is your friend. Commit often and use descriptive commit messages. Push your work to GitHub so you don't lose it.
- Get it working and then make it look good. Don't get lost in the perfect solution before you have a working solution.
- Write down your responses to all the questions in the prompt before moving on to the next prompt.
- Include more comments than you would in normal code. This will help us understand your thought process.
- Take breaks when you need them.
- You don't have to finish all of the prompts. We prefer thorough, well thought out responses over a complete solution without written responses.

## Responses

Please write your responses to the questions in the instructions here. Please indicate any tradeoffs you made.

1.
2.
3.

## Submitting

To submit your code, send us a link to your repo.
Once we confirm that we've downloaded your work, please delete the repo you created so future candidates don't accidentally find your solution.

To submit your screen recording, please reach out to schedule a time we can use https://webwormhole.io/ to transfer the large file.
