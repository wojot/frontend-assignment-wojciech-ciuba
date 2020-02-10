# Schibsted Frontend Assignment
Your task is to develop a frontend application that will display list of article previews.
You are expected to fetch data from a mock api (`server.js`) provided along with this assignment.
We have prepared a simple skeleton app for you (check out [README.md](README.md))

The user of this app should be able to:
 1. view a list of articles containing image, title, preamble and publication date
 2. filter articles by their source (fashion, sport or both)
 3. sort articles by publication date

The basic wireframes for the app can be found in the attached `*.png` files.
Please use them as guidelines for your solution, but style it as you would style a normal production website keeping in mind web standards.
Make sure that you properly handle backend responses, as backend can never be truly trusted and may sometimes return errors.

### A couple of things we would like you to consider when writing this application:
 - it should run on the current versions of browsers (chrome/ff) and be compliant to current version of ecma script standard,
 - the code should be testable,
 - you can use any library you want as long as it's reasonable, but do not overcomplicate things,
 - try to make it look good on different devices,
 - pay attention to bundle size,
 - keep the code clean and understandable (document it if you feel it's needed),
 - do not sacrifice code quality for the sake of completeness of the task.


## Final note

Please provide a short description of what you have created and possible ways to improve your solution.

We expected the assignment to be done with GIT. Using a public github repository or private bitbucket/gitlab will be fine.
Also please don’t forget about commit messages.

Feel free to get in touch with us at any time throughout this task in case of any questions.
We realise and appreciate that you’re taking personal time out to complete this task so we’re happy to help.




## ReadMe:

This is a very basic npm project with default webpack setup.

You should use this project as a base for your solution.
Feel free to modify/extend this with whatever you need.

In case you need some assistance take a look at official webpack docs:
 - [Guides](https://webpack.js.org/guides/) 
 - [Concepts](https://webpack.js.org/concepts/)

Eventually this application will request live data from a real API.

You can find the full description of your assignment in [ASSIGNMENT.md](ASSIGNMENT.md)

## API Documentation
Api server can be found in `server.js` file. You should not modify this file, only use it.

To run the server do:
> `$ node server.js`

Server will start listening on port `6010`.

The server has 2 endpoints:

`/articles/sports` - returns a list of articles from `sport` category

`/articles/fashion` - returns a list of articles from `fashion` category

Be aware of backend errors!