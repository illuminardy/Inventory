const stockRoutes = require('express').Router();
const Stock = require('../models/stock');
const redis = require('redis');
const redisClient = redis.createClient();
const RedisServer = require('redis-server');

// Connect to redis-server with configuration
const cacheServer = new RedisServer({
  port: 6379,
  conf: 'redis.conf'
}).open((err) => {
  if (err) {
    throw new Error('Unable to connect to the redis server. Error:', err);
  }
});

// Routes
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
  redisClient.get(req.params.stock_id, (err, reply) => {
    if (err) console.log(err);
    else if (reply) {
      // In cache
      res.json(reply);
    } else {
      // Not in cache
      Stock.findById(req.params.stock_id, (err, item) => {
        if (err) {
          res.send(err);
        } else {
          redisClient.set(req.params.stock_id, item);
          res.json(item);
        }
      })
    }
  });
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

module.exports = stockRoutes;
