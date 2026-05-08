const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('15_IFB452_BB_20242_Evaluasi2.docx.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error) {
    console.error("Error reading PDF:", error);
});
