const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const removeAccent = require("../util/removeAccent");

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {type: String, slug: 'name', unique: true },
  description: {
    type: String,
    required: false,
    default: "Sản phẩm ngon, bổ rẻ, đến mua ngay đi"
  },
  stock: {
    type: Number,
    required: true,
    default: 10
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: [String],
    required: true,
    default: ["Nhỏ","Vừa", "Lớn", "Rất lớn"]
  },
  productType: {
    main: {
      type: [String],
      default: "Chế biến sẵn"
    },
    sub: {
      type: [String],
      default: "Chế biến sẵn"
    }
  },
  color: {
    type: [String],
    required: false,
    default: [" "]
  },
  pattern: {
    type: [String],
    required: false,
    default: ["Cay"]
  },
  tags: {
    type: [String],
    required: false
  },
  images: {
    type: [String],
    required: true
  },
  dateAdded: {
    type: Date,
    required: false,
    default: Date.now
  },
  isSale: {
    status: {
      type: Boolean,
      default: false
    },
    percent: {
      type: Number,
      default: 0
    },
    end: {
      type: Date
    }
  },
  ofSellers: {
    userId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User"
    },
    name: String
  },
  labels: {
    type: String,
    required: false,
    default: "Trung Quốc"
  },
  materials: {
    type: [String],
    required: true
  },
  buyCounts: {
    type: Number,
    required: false,
    default: 0
  },
  viewCounts: {
    type: Number,
    required: false,
    default: 0
  },
  rating: {
    byUser: String,
    content: String,
    star: Number
  },
  index: {
    type: Number,
    required: false,
    default: 0
  },
  comment: {
    total: {
      type: Number,
      require: false,
      default: 0
    },
    items: [
      {
        title: {
          type: String
        },
        content: {
          type: String
        },
        name: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        },
        star: {
          type: Number
        },
      }
    ]
  }
});
mongoose.plugin(slug)
const index = {
  name: "text",
  description: "text",
  labels: "text",
  "productType.main": "text",
  tags: "text",
  ofSellers: "text"
};
productSchema.index(index);

productSchema.methods.getNonAccentType = function() {
  return removeAccent(this.productType.main);
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
