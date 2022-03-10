const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send("<h1>Sorry, we can't find the page you're looking for.<h1>")
});

module.exports = router;
