const passport = require("passport");
const Cart = require("../models/cart");
const nodemailer = require("nodemailer");
const Users = require("../models/user");
var bcrypt = require("bcryptjs");
var randomstring = require("randomstring");


exports.getLoginAdmin = (req, res, next) => {
    var cartProduct;
    if (!req.session.cart) {
        cartProduct = null;
    } else {
        var cart = new Cart(req.session.cart);
        cartProduct = cart.generateArray();
    }
    const message = req.flash("error")[0];
    if (!req.isAuthenticated()) {
        res.render("login_ad", {
            title: "Đăng nhập",
            message: `${message}`,
            user: req.user,
            cartProduct: cartProduct
        });
    } else {
        res.redirect("/");
    }
}

exports.getLogin = (req, res, next) => {
    var cartProduct;
    if (!req.session.cart) {
        cartProduct = null;
    } else {
        var cart = new Cart(req.session.cart);
        cartProduct = cart.generateArray();
    }
    const message = req.flash("error")[0];
    if (!req.isAuthenticated()) {
        res.render("login", {
            title: "Đăng nhập",
            message: `${message}`,
            user: req.user,
            cartProduct: cartProduct
        });
    } else {
        res.redirect("/");
    }
};

exports.postLogin = (req, res, next) => {
    passport.authenticate("local-signin", {
        successReturnToOrRedirect: "/merge-cart",
        failureRedirect: "/admin",
        failureFlash: true
    })(req, res, next);
};

exports.getLogout = (req, res, next) => {
    if (req.session.cart) {
        req.session.cart = null;
    }
    req.logout();
    res.redirect("/");
};

exports.getSignUp = (req, res, next) => {
    const message = req.flash("error")[0];
    var cartProduct;
    if (!req.session.cart) {
        cartProduct = null;
    } else {
        var cart = new Cart(req.session.cart);
        cartProduct = cart.generateArray();
    }
    if (!req.isAuthenticated()) {
        res.render("create-account", {
            title: "Đăng ký",
            message: `${message}`,
            user: req.user,
            cartProduct: cartProduct
        });
    } else {
        res.redirect("/");
    }
};

exports.postSignUp = (req, res, next) => {
    passport.authenticate("local-signup", {
        successReturnToOrRedirect: "/",
        failureRedirect: "/create-account",
        failureFlash: true
    })(req, res, next);
};


exports.getForgotPass = (req, res, next) => {
    const message = req.flash("error")[0];
    var cartProduct;
    if (!req.session.cart) {
        cartProduct = null;
    } else {
        var cart = new Cart(req.session.cart);
        cartProduct = cart.generateArray();
    }
    res.render("forgot-password", {
        title: "Quên mật khẩu",
        message: `${message}`,
        user: req.user,
        cartProduct: cartProduct
    });
};

exports.postForgotPass = (req, res, next) => {
    const email = req.body.email;
    Users.findOne({ email: email }, (err, user) => {
        if (!user) {
            req.flash("error", "Email không hợp lệ");
            return res.redirect("/forgot-password");
        } else {
            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "nocodenolife2527@gmail.com",
                    pass: "password2527@"
                }
            });
            var tpass = randomstring.generate({
                length: 6
            });
            var mainOptions = {
                from: "Crepp so gud",
                to: email,
                subject: "Test",
                text: "text ne",
                html: "<p>Mật khẩu mới của bạn là:</p>" + tpass
            };
            transporter.sendMail(mainOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Sent:" + info.response);
                }
            });
            bcrypt.hash(tpass, 12).then(hashPassword => {
                user.password = hashPassword;
                user.save();
            });

            res.redirect("/login");
        }
    });
};

exports.getChangePassword = (req, res, next) => {
    const message = req.flash("error")[0];
    var cartProduct;
    if (!req.session.cart) {
        cartProduct = null;
    } else {
        var cart = new Cart(req.session.cart);
        cartProduct = cart.generateArray();
    }
    res.render("change-password", {
        title: "Đổi mật khẩu",
        message: `${message}`,
        user: req.user,
        cartProduct: cartProduct
    });
};

exports.postChangePassword = (req, res, next) => {
    bcrypt.compare(req.body.oldpass, req.user.password, function(err, result) {
        console.log("alo?");
        if (!result) {
            req.flash("error", "Mật khẩu cũ không đúng!");
            return res.redirect("back");
        } else if (req.body.newpass != req.body.newpass2) {
            console.log(req.body.newpass);
            console.log(req.body.newpass2);
            req.flash("error", "Nhập lại mật khẩu không khớp!");
            return res.redirect("back");
        } else {
            bcrypt.hash(req.body.newpass, 12).then(hashPassword => {
                req.user.password = hashPassword;
                req.user.save();
            });
            req.flash("success", "Đổi mật khẩu thành công!");
            res.redirect("/account");
        }
    });
};