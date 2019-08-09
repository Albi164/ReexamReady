const express = require('express');
const router = express.Router();

const Programs = require('../../schemas/Programs');
const authentication = require('../../authentication');

router.get('/', (req, res) =>{
    Programs.find({})
        .populate('tvchannels')
        .exec()
            .then(Programs =>res.json(Programs))
            .catch(err => res.send(err))
});



module.exports = router;