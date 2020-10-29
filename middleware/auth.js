/*this will provide secure routing so if the user is on 
dashboard then they can not go back to login until or unliess user logout */
module.exports = {
  /*if user is authenticated then go for next step 
	if not then remain on the login */
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  /*this midddleware is for guests */
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
