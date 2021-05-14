axios = require('axios');

function posts () {

    var x = null;
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            x =response.data;
        });
    return x;
}


module.exports = posts;