const mongoose = require("mongoose");
const Product = require("../models/product");
const urlConnect = `mongodb://localhost:27017/amthucTeady
`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("Connect successfully!!");
  
  var product = new Product({
    name: "Kẹo ngô",
    description: "Hàng ngon bổ rẻ đến mua ngay đi nào",
    stock: 123,
    price: 444,
    tags:["#ngon","#ngot","#mem"],
    size: ["S","M"],
    productType: { main: "Bánh kẹo", sub: "Ngon miệng"},
    color: ["Nâu"],
    pattern: "Giòn",
    images: [
      "product-10.jpg",
      "product-10-01.jpg",
      "product-10-02.jpg"
    ],
    label: "Trung Quốc",
    materials: [""]
  });

  product.save(function(err) {
    if (err) throw err;
    console.log("Product successfully saved.");
  });
});
