const express = require('express');
const router = express.Router();
const tvchannels = require('../../schemas/TvChannel');


router.get('/', (req,res) => {
    tvchannels.find({})
        .exec()
        .then(tvchannels =>res.json(tvchannels))
        .catch(err => res.send(err))
});


module.exports = router;