const Course = require('../models/Courses');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
     index(req, res, next) {
        // try {
        //     const courses = await Course.find({});
        //     res.json(courses);
        // } catch (err) {
        //     res.status(400).json({ error: "ERROR" });
        // }

        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                });
            })
            .catch(next);

    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
