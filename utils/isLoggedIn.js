const isLogggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user.id)
        return next();
    }
    res.redirect("/");
}

export { isLogggedIn };