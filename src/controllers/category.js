import slugify from "slugify";
import Category from "../models/category.js";
import Product from "../models/product.js";


export const getAllCategory = async (req, res, next) => {
  try {
    const data = await Category.find();
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "lay category thanh cong",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Category.findById(id).populate("products");
    if (data) {
        return res.status(200).json({
            success: true,
            data,
            message: "tim danh muc thanh cong"
        })
    }
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const slug = slugify(req.body.title, {
      replacement: "-",
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });
    console.log(slug);
    const data = await Category.create({ ...req.body, slug });
    if (data) {
      return res.status(201).json({
        success: true,
        data,
        message: "tap danh muc ok",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Category.findByIdAndUpdate(id, body, { new: true });

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "update danh muc ok",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id
        if(id === "66a25faec8b7ac46724a5509"){
            return res.status(400).json({
                message: "khong xoa duoc danh muc mac dinh",
                success: false
            })
        }


		// Chuyển toàn bộ sản phẩm thuộc danh mục bị xoá về danh mục mặc định
		const productToUpdate = await Product.find({ category: req.params.id });
		await Promise.all(
			productToUpdate.map(async (product) => {
				product.category = "66a25faec8b7ac46724a5509";
				await product.save();
			})
		);
        const data = await Category.findByIdAndDelete(req.params.id);

		if (data) {
			return res.status(200).json({
				success: true,
				data,
				message: "Remove danh muc thanh cong!",
			});
		}
    } catch (error) {
        
    }
}