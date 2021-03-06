var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const productController = require("../controllers/product");
/* GET home page. */

// router.post("/:id", productController.postEditSP);
router.get("/admin_kh", productController.getKH);

router.get("/editSP/:id", productController.getAdminEditSP);

router.get("/delete/:id", productController.deleteSP);

router.get("/admin_dssp", productController.getAdminDSSP);

router.get("/admin_dh", productController.getAdminDH);

router.get("/", productController.getIndexProducts);

router.get("/product/:productId", productController.getProduct);


router.get("/create-sp", productController.getCreateSP);

router.post("/createSP", productController.postCreateSP);

router.get(
    "/products/:productType?/:productChild?",
    productController.getProducts
);

router.post("/products/:productType*?", productController.postNumItems);

router.post("/product/:productId", productController.postComment);

router.get("/search", productController.getSearch);

router.get("/shopping_cart", productController.getCart);

router.get("/add-to-cart/:productId", productController.addToCart);

router.get("/modify-cart", productController.modifyCart);

router.get("/add-order", productController.addOrder);

router.post("/add-order", productController.postAddOrder);

router.get("/delete-cart", productController.getDeleteCart);

router.get("/delete-item/:productId", productController.getDeleteItem);

router.get("/merge-cart", productController.mergeCart);

module.exports = router;