import User from "../models/user.js";

// Update User CartData   /api/cart/update

export const UpdateCart = async (req, res) => {
  try {
    console.log("BODY:::", req.body);
    const { cartItems } = req.body;
    const userId = req.user.userId;
    await User.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "cart updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
