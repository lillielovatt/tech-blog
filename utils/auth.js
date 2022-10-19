//  normal request callback function, checking for the existence of a session property and using res.redirect() if it's not there

const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = withAuth;
