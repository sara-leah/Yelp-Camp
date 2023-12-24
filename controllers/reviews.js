const Campground = require('../models/campground');
const Review = require('../models/review.js');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully post new review!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    // remove the review from the campground
    await Campground.findByIdAndUpdate(id, { $pull: { reviews : reviewId } });
    // delete the review from the reviews collection 
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`)
}