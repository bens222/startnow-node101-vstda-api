const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

// add your code here
let initData = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.get('/', function(req, res) {
    res.status(200)
    res.send({status: "ok"});
});

app.get('/api/TodoItems', function(req, res) {
    res.status(200)
    res.send(initData);
});

app.get('/api/TodoItems/:number', function(req, res) {
    var singleToDo;
    for(let i = 0; i < initData.length; i++) {
        if(initData[i].todoItemId == req.params.number) {
            singleToDo = initData[i];
        } 
    }
    res.status(200).send(singleToDo);
});

app.post('/api/TodoItems', function(req,res) {
    for(let i = 0; i < initData.length; i++) {
        if(req.body.todoItemId === initData[i].todoItemId) {
            initData[i] = req.body;
        } else {
            initData.push(req.body);
        };
    };
    res.status(201).send(req.body);    
});

app.delete('/api/TodoItems/:number', function (req,res) {
    var deleteToDo;
    for(let i = 0; i < initData.length; i++) {
        if(initData[i].todoItemId == req.params.number) {
            deleteToDo = initData[i]
            initData.splice(i, 1)
        };
    };
    res.status(200).send(deleteToDo);
})

module.exports = app;
