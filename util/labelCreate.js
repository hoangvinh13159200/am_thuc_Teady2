const mongoose = require("mongoose");
const label = require("../models/label");
const urlConnect = `mongodb://localhost:27017/amthucTeady
`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var abc = new label({
    list: [
      "Tứ Xuyên",
      "Quảng Đông",
      "Trung Quốc",
      "Nhật Bản",
      "Oshi",
      "Vinamilk",
      "Orio",
      "Bao Bao"
    ]
  });

  abc.save(function(err) {
    if (err) throw err;
    console.log("Category successfully saved.");
  });
});
