const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("got perms")
        return next();
    }
    console.log("no perms");
    res.redirect("../");
}

export { isLoggedIn };