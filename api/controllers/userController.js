import User from "../models/User.js";

//UPDATE
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

//DELETE
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User was deleted!");
    } catch (err) {
        next(err);
    }
};

//GET USER
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

//GET ALL USERS
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const getUsersStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(
        date.setFullYear(date.getFullYear() - 1) //Returns last year today
    );
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } }, //Match created at greater then last year
            {
                $project: {
                    month: { $month: "$createdAt" } //Created month variable and take the month number inside createdAt
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
};