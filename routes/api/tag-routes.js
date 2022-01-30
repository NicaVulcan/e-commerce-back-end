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
                res.status(404).json({ message: "Tag not found!" });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;