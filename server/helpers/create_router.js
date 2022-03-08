const express = require('express');
const ObjectID = require('mongodb').ObjectID

const createRouter = function (collection) {

  const router = express.Router();

  //access all items
  router.get('/', (req, res) => {
    collection.find().toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500)
        res.json({
          status: 500,
          error: err
        })
      })
  });

  //access one item
  router.get('/:id', (req, res) => {
    const id = req.params.id
    collection
      .findOne({
        _id: ObjectID(id)
      })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500)
        res.json({
          status: 500,
          error: err
        })
      })
  });

  //create an entry
  router.post('/', (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then((result) => {
        res.json(result.ops[0])
      })
      .catch((err) => {
        console.error(err);
        res.status(500)
        res.json({
          status: 500,
          error: err
        })
      })
  })

  //delete an entry
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    collection
      .deleteOne({
        _id: ObjectID(id)
      })
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        console.error(err);
        res.status(500)
        res.json({
          status: 500,
          error: err
        })
      })
  });


  //update an entry
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const updateData = req.body;
    collection
      .updateOne({
        _id: ObjectID(id)
      }, {
        $set: updateData
      })
      .then((result) => {
        res.json(result)
          .catch((err) => {
            console.error(err);
            res.status(500)
            res.json({
              status: 500,
              error: err
            })
          })
      })
  });

  return router;

};

module.exports = createRouter;