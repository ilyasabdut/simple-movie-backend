let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Simple MovieDB',
    });
});
var movieController = require('./movie.controller');

router.route('/movies')
    .get(movieController.index)
    .post(movieController.new);
router.route('/movies/top10')
    .get(movieController.topten);
router.route('/movies/:movie_id')
    .get(movieController.view)
    .patch(movieController.update)
    .put(movieController.update)
    .delete(movieController.delete);
module.exports = router;
