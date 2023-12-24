const express = require("express")
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const {validateReview , isLoggedIn , isReviewAuthor} = require('../middleware.js');
const reviews = require('../controllers/reviews.js')

// create new review
router.post('/', isLoggedIn , validateReview, catchAsync(reviews.createReview));
// delete review
router.delete('/:reviewId', isLoggedIn ,isReviewAuthor , catchAsync(reviews.deleteReview));

module.exports = router;