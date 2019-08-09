const express = require('express');
const router = express.Router();
const Favorite = require('../../schemas/Favorite');

router.get('/Programs', (req, res) =>{
    Favorite.find({})
        .populate('Programs')
        .exec()
        .then(Programs =>res.json(Programs))
        .catch(err => res.send(err))
});

router.post('/add', (req, res) => {
    const newFavorite = req.body;
    console.log(req.body);
    console.log(newFavorite);
    const favorite = new Favorite ({
        program: newFavorite.program
    });
    favorite.save();
    console.log(favorite);
    res.json({favorite: favorite})
});

router.delete('/delete', (req,res)=> {
    Favorite.deleteOne({'_id':req.body._id}, function() {console.log("done")})
})

module.exports = router;