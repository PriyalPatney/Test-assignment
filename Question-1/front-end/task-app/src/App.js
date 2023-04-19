import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [sourceList, setSourceList] = useState(null);
  const [targetList, setTargetList] = useState(null);
  const [task, setTask] = useState(null);
  const [newIndex, setNewIndex] = useState(null);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    getTask()
  }, []);

  const getTask = () => {
    axios.get('http://localhost:8081/lists')
    .then(response => {
      console.log("fffff",response)
      setList1(response.data.list1);
      setList2(response.data.list2);
    })
    .catch(error => {
      console.log(error);
    });
  }
  const handleDragStart = (event, listName, index) => {
    setSourceList(listName);
    setTask(listName === 'list1' ? list1[index] : list2[index]);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', index);
  };

  const handleDragEnter = (event, listName) => {
    event.preventDefault();
    setTargetList(listName);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event, listName, index) => {
    event.preventDefault();
    setNewIndex(index);

    if (sourceList === targetList) {
      const list = sourceList === 'list1' ? list1 : list2;
      const sourceIndex = event.dataTransfer.getData('text/plain');
      const task = list.splice(sourceIndex, 1)[0];
      list.splice(index, 0, task);
      setSourceList(null);
      setTargetList(null);
      axios.post('http://localhost:8081/moveTask',{
        sourceList:sourceList , 
        targetList:targetList ,
        task: task
      })
      .then(response => {
        console.log("fffff",response)
        // setList1(response.data.list1);
        // setList2(response.data.list2);
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      const source = sourceList === 'list1' ? list1 : list2;
      const target = targetList === 'list1' ? list1 : list2;
      const sourceIndex = event.dataTransfer.getData('text/plain');
      const task = source.splice(sourceIndex, 1)[0];
      target.splice(index, 0, task);
      setSourceList(null);
      setTargetList(null);
      axios.post('http://localhost:8081/moveTask',{
        sourceList:sourceList , 
        targetList:targetList ,
        task: task
      })
      .then(response => {
        console.log("fffff",response)
        // setList1(response.data.list1);
        // setList2(response.data.list2);
      })
      .catch(error => {
        console.log(error);
      });
    }
  };
  const handleOnClisk = (task,listName) => {
    axios.post('http://localhost:8081/add',{
      task: task
    }).then(response => {
      console.log("fffff",response)
      getTask();
    })
    .catch(error => {
      console.log(error);
    });
    setInputVal("");
    let inp = document.getElementById(listName);
    inp.value = "";
  }
  const renderList = (listName, list) => (
    <div
      className="list"
      onDragOver={event => handleDragOver(event)}
      onDrop={event => handleDrop(event, listName, list.length)}
    >
      <h2>{listName}</h2>
      <ul>
        {list.map((task, index) => (
          <li
            key={index}
            draggable
            onDragStart={event => handleDragStart(event, listName, index)}
            onDragEnter={event => handleDragEnter(event, listName)}
          >
            {task}
          </li>
        ))}
      </ul>
      <input id={listName} onChange={(e) => setInputVal(e.target.value)}></input>
      <button onClick={() =>handleOnClisk(inputVal,listName)}>Add task</button>
    </div>
  );

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="lists">
        {renderList('list1', list1)}
        {renderList('list2', list2)}
      </div>
    </div>
  );
}

export default App;
