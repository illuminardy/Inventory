const stockRoutes = require('express').Router();
const Stock = require('../models/stock');

stockRoutes.route('/')
  .post((req, res) => {
    const stock = new Stock({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      dateAvailable: req.body.dateAvailable,
      taxable: req.body.taxable
    });
    // save the stock and check for errors
    stock.save((err) => {
      if (err) {
        console.log("Error");
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: 'stock item created!' });
      }
    });
  })
  .get((req, res) => {
    Stock.find((err, items) => {
      if (err) {
        res.send(err);
      } else {
        res.json(items);
      }
    });
  });

stockRoutes.route('/:stock_id')
.get((req, res) => {
  Stock.findById(req.params.stock_id, (err, item) => {
    if (err) {
      res.send(err);
    } else {
      res.json(item);
    }
  })
})
.put((req, res) => {
  Stock.findById(req.params.stock_id, (err, item) => {
    if (err) {
      res.send(err);
    } else {
      item.name = req.body.name;  // update the stocks info
      // save the stock
      item.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: 'stock item updated!' });
        }
      });
    }
  });
})
.delete((req, res) => {
  Stock.remove({ _id: req.params.stock_id }, (err, item) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'stock item deleted!' });
    }
  });
});

module.exports =  stockRoutes;
