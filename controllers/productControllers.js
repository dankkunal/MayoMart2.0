import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validations
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is required." });
      case !description:
        return res.status(500).send({ message: "Description is required." });
      case !price:
        return res.status(500).send({ message: "Price is required." });
      case !category:
        return res.status(500).send({ message: "Category is required." });
      case !quantity:
        return res.status(500).send({ message: "Quantity is required." });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ message: "Image should be less than 1mb in size." });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      product,
      message: "Product created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating product.",
    });
  }
};

// get all products Controller
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      count: products.length,
      products,
      message: "Products fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting products.",
    });
  }
};

// get single product Controller
export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found.",
      });
    }
    res.status(200).send({
      success: true,
      product,
      message: "Product fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting product.",
    });
  }
};

// get product photo Controller
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.productId)
      .select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting product's photo.",
    });
  }
};

// update product Controller
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validations
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is required." });
      case !description:
        return res.status(500).send({ message: "Description is required." });
      case !price:
        return res.status(500).send({ message: "Price is required." });
      case !category:
        return res.status(500).send({ message: "Category is required." });
      case !quantity:
        return res.status(500).send({ message: "Quantity is required." });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ message: "Image should be less than 1mb in size." });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      product,
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product.",
    });
  }
};

// delete product Controller
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.productId)
      .select("-photo");
    res.status(200).send({
      success: true,
      product,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting product.",
    });
  }
};

// product filter Controller
export const ProductsFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      count: products.length,
      products,
      message: "Products filtered successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while filtering products.",
    });
  }
};

// product count Controller
export const productsCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
      message: "Products count fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting products count.",
    });
  }
};

// product list Controller
export const productsListController = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      count: products.length,
      products,
      message: "Products fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting products list.",
    });
  }
};

// search product controller
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while searching products.",
    });
  }
};

// related products controller
export const relatedProductsController = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const products = await productModel
      .find({
        category: categoryId,
        _id: { $ne: productId },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      count: products.length,
      products,
      message: "Related products fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting related products.",
    });
  }
};

// category Products Controller
export const categoryProductsController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel
      .find({ category })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      count: products.length,
      category,
      products,
      message: "Category products fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting category products.",
    });
  }
};
