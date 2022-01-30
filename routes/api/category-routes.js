const router = require('express').Router();
const { Category, Product } = require('../../models');

//GET all categories
router.get('/', (req, res) => {
    Category.findAll({
        attributes: [
            "id",
            "category_name"
        ],
        include: [
            {
                model: Product,
                attributes: [
                    "product_name",
                    "price",
                    "stock"
                ]
            }
        ]
    })
        .then(dbCatData => {
            res.json(dbCatData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET one category
router.get('/:id', (req, res) => {
    Category.findOne({
        attributes: [
            "id",
            "category_name"
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
                ]
            }
        ]
    })
        .then(dbCatData => {
            if (!dbCatData) {
                res.status(404).json({ message: "Category not found!" });
                return;
            }
            res.json(dbCatData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;