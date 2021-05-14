express = require('express');
router = express();
axios = require('axios');

fetchAPI = require('../APIs/fetchAPI');



router.get('/fetchPosts', (request, response)=>{

    response.send(fetchAPI);

});

module.exports = router;