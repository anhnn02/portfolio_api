import Project from "../models/project";

export const list = async (req, res) => {
    try {
        const products = await Project.find().populate('category').sort({ 'createdAt': -1 });
        res.json(products);
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Can't found Project!"
        })
    }
}
export const create = async (req, res) => {
    console.log(req.body)
    try {
        const product = await new Project(req.body).save();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Can't add Project!"

        })
    }
}
export const get = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id }).populate('category').exec();
        res.json(project);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Can't found Project!"

        })
    }
}
export const remove = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({_id: req.params.id});
        res.json(project);
    } catch (err) {
        res.status(400).json({
            msg: "Can't remove Project!"

        })
    }
}
export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body;
    try {
        const project = await Project.findOneAndUpdate(condition, update).exec();
        res.json(project);
    } catch (err) {
        res.status(400).json({
            msg: "Can't update project!"

        })
    }
}

export const search = async (req, res) => {
    try {
        const searchField = req.query.name;
        const product = await Project.find({ name: { $regex: searchField, $options: '$i' } }).sort({ 'createdAt': -1 })
        if (searchField == "") {
            res.json("")
        } else {
            res.json(product)
        }
    } catch (error) {
        res.status(400).json(
            { msg: "Khong tim thay san pham" }
        )
    }
}

export const page = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = limit * (page - 1)
        const sort = req.query.sort || {'createdAt': -1}
        const product = await Project.find().limit(limit).skip(skip).sort(sort)
        res.json(product)
    } catch (error) {
        res.status(400).json(
            { error: "Khong tim thay san pham" }
        )
    }
}