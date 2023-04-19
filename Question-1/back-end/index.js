const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({origin: ['http://localhost:3000', 'http://127.0.0.1:3000']})
  );
let list1 = ['Task 1', 'Task 2', 'Task 3'];
let list2 = ['Task 4', 'Task 5', 'Task 6'];

app.get('/lists', (req, res) => {
  res.json({
    list1: list1,
    list2: list2,
  });
});

app.post('/moveTask', (req, res) => {
  const { sourceList, targetList, task } = req.body;

  if (sourceList === targetList) {
    const list = sourceList === 'list1' ? list1 : list2;
    const index = list.indexOf(task);
    list.splice(index, 1);
    list.splice(req.body.newIndex, 0, task);
  } else {
    const source = sourceList === 'list1' ? list1 : list2;
    const target = targetList === 'list1' ? list1 : list2;
    const index = source.indexOf(task);
    source.splice(index, 1);
    target.splice(req.body.newIndex, 0, task);
  }

  res.json({
    success: true,
  });
});

app.post('/add', (req,res) => {
    const {task} = req.body;

    list1.push(task);
    list2.push(task);

    res.json({
        success: true,
      });
})

app.listen(8081, () => {
  console.log('Server started on port 8081');
});
