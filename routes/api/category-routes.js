const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    // include Products association
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    // include Products association
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(400).json({ message: "category not found" });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Category.update(req.body, {
    category_name: req.body.category_name,
    where: {
      id: req.params.id,
    },
  })
    .then((dbCatData) => {
      if (!dbCatData[0]) {
        res
          .status(404)
          .json({ messsage: "Category was not found with your request" });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCatData) => {
      if (!dbCatData) {
        res
          .status(404)
          .json({ message: "Category was not found with your request" });
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
