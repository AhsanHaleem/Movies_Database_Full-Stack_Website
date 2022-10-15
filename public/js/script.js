// For extracting data from JSON
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let names = require('../../Movie-Database-Json/movie-data.json');
// console.log(names[0].Director);

// var obj = JSON.parse(
//     fs.readFileSync('Movie-Database-Json/movie-data-short.json').toString()
// );
// obj.title = eval('(' + obj.title + ')');

// names.forEach((x) => {
//     if() {
//         console.log(x.Director);
//     }
    
    
// });
