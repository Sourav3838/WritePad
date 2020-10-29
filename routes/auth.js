const express = require("express");
const passport = require("passport");
const router = express.Router();
const toast = require("powertoast");
//@description:- Authenticate with google
//@rooute :-  /auth/google
//@method :- GET

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@description:- google auth callback
//@rooute :-  /auth/google/callback
//@method :- GET

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    toast({
      appID: "com.squirrel.GitHubDesktop.GitHubDesktop",
      title: "WritePad",
      message: "Log In Successfull",
      icon: "D:\\Desktop\\25231.png",
      attribution: "Via Web",
    }).catch((err) => console.error(err));
    res.redirect("/dashboard");
  }
);
//so if the authentication is successfull then it will take us to the dashboard, if not it will redirect to the main page

// @desc    Logout user
// @route   GET /auth/logout
router.get("/logout", (req, res) => {
  toast({
    appID: "com.squirrel.GitHubDesktop.GitHubDesktop",
    title: "WritePad",
    message: "Log Out Successfull",
    icon: "D:\\Desktop\\25231.png",
    attribution: "Via Web",
  }).catch((err) => console.error(err));
  req.logOut();
  res.redirect("/");
});
module.exports = router;
