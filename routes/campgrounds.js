const express = require("express")
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js')
const campgrounds = require('../controllers/campgrounds.js')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index)) // index
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCampground)); //create campground


// new campground form
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))// show campground details
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))// edit campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));// delete campground

// edit campground form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.rendereditForm))

module.exports = router;
