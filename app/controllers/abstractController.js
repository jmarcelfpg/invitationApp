"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    // Get all
    getAll(req, res) {
        this.model.find({})
            .then(res.json)
            .catch(console.error);
    }
    // Count all
    count(req, res) {
        this.model.count({})
            .then(res.json)
            .catch(console.error);
    }
    // Insert
    insert(req, res) {
        const obj = new this.model(req.body);
        obj.save()
            .then(res.status(200).json)
            .catch(console.error);
    }
    // Get by id
    get(req, res) {
        this.model.findOne({ _id: req.params.id })
            .then(res.status(200).json)
            .catch(console.error);
    }
    // Update by id
    update(req, res) {
        this.model.findByIdAndUpdate(req.params, req.body)
            .then(res.status(200).json)
            .catch(console.error);
    }
    // Delete by id
    delete(req, res) {
        this.model.findOneAndRemove({ _id: req.params.id })
            .then(ok => res.sendStatus(200))
            .catch(console.error);
    }
}
exports.default = Controller;
//# sourceMappingURL=abstractController.js.map