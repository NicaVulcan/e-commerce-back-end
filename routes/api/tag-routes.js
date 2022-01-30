const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//GET all tags
router.get('/', (req, res) => {
    Tag.findAll({
        attributes: [
            "id",
            "tag_name"
        ],
        include: [
            {
                model: Product,
                attributes: [
                    "product_name",
                    "price",
                    "stock"
                ],
                through: ProductTag,
                as: "products"
            }
        ]
    })
        .then(dbTagData => {
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET one tag
router.get('/:id', (req, res) => {
    Tag.findOne({
        attributes: [
            "id",
            "tag_name"
        ],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Product,
                attributes: [
                    "product_name",
                    "price",
                    "stock"
                ],
                through: ProductTag,
                as: "products"
            }
        ]
    })
        .then(dbTagData => {
            if (!dbTagData) {
                res.status(404).json({ message: "No tag found with this id!" });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST new tag
router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT tag
router.put('/:id', (req, res) => {
    Tag.update(req.body, {
        tag_name: req.body.tag_name,
        where: {
            id: req.params.id
        }
    })
        .then(dbTagData => {
            if (!dbTagData[0]) {
                res.status(400).json({ message: "No tag found with this id" });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE tag
router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbTagData => {
            if (!dbTagData) {
                res.status(404).json({ message: "No tag found with this id" });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;