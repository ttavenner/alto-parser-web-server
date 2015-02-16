## ALTO XML Command Line Text Parser

---

A simple web server written in Node that lets users submit a link to an XML file in the ALTO schema and displays the text from the document.
The XML file must use the [ALTO 2.0 schema](http://www.loc.gov/standards/alto/).

Instructions for Use:

1. Install [NodeJS](http://nodejs.org/)
2. Install [NPM] (https://www.npmjs.com/)
3. Clone this Repo
4. From the command line CD into the repo where you saved the repo and run `npm install`
5. Set the hostname and port in the top of parser.js. The default is localhost:3000
6. Run `node parser.js`