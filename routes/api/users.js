const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtSecret');
const authentication = require('../../authentication');
const User = require('../../schemas/User');


router.post('/authenticate', function(req, res) {
    const { userName, password } = req.body;
    console.log(req.body);
    User.findOne({ userName }, function(err, user) {
        if (err) {
            console.error(err);
            console.log(user);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect username or password'
                });
        } else {
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    const payload = { userName};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true })
                        .sendStatus(200);

                }
            });
        }
    });
});

router.get('/checkToken', authentication, function(req, res) {
    res.sendStatus(200);
});

// router.get('/favorite/:id', (req, res) => {
//     User.findOne({_id: req.params.id})
//         .populate('favorite')
//         .exec()
//             .then(favorite =>res.json(favorite))
//             .catch(err => res.send(err))
// });

// router.get('/favorite', (req, res) =>{
//     User.find({},(err, user)=>{
//         if(err){
//             res.send(err);
//         }
//         res.json({success: true, user: user});
//     });
// });
//
// router.put('/favorite/:id', (req, res) => {
//     User.findOne({ _id: req.params.id }, (err, user) => {
//         if(err) return console.error(err);
//         user.favorite.push(req.body.favorite);
//         user.save((err, user) => {
//             if(err) return console.error(err);
//             console.log(user);
//         });
//         res.json(user);
//     })
// });
//
// router.put('/favorite/delete/:id', async (req, res) => {
//
//     console.log(req.params.id);
//     console.log (req.query.favorite);
//     const  id  = req.params.id;
//     const favorite = req.query.favorite;
//     try {
//         const updatedUser = await User.findByIdAndUpdate(id,
//             { $pull: { favorite: favorite } },
//             { new: true },
//         );
//         console.log(id);
//         console.log('Id:' + id + ', Favorite: '+favorite );
//         res.send(updatedUser);
//     } catch (e) {
//         console.error(e);
//         res.status(500).send('Something went wrong');
//     }
// });



module.exports = router;