import React, { useState } from "react";
import "./style.css";

const initialGoals = [
  {
    id: 1,
    title: "Learn React basics",
    completed: false,
  },
  {
    id: 2,
    title: "Build a goal tracker app",
    completed: false,
  },
  {
    id: 3,
    title: "Practice JavaScript daily",
    completed: false,
  },
  {
    id: 4,
    title: "Read a programming book",
    completed: false,
  },
  {
    id: 5,
    title: "Exercise for 30 minutes",
    completed: false,
  },
];

function App() {
  const [goals, setGoals] = useState(initialGoals);
  const [goalTitle, setGoalTitle] = useState("");

  const totlaGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.completed).length;

  function onAddGoal(goal) {
    setGoals((goals) => [...goals, goal]);
    setGoalTitle((val) => "");
  }

  function handleToggle(id, isCompleted) {
    const newGoals = goals.map((gl) =>
      gl.id === id ? { ...gl, completed: isCompleted } : gl
    );
    setGoals((gl) => newGoals);
  }

  function hanndleDelete(id) {
    const newGoals = goals.filter((goal) => goal.id !== id);
    setGoals(newGoals);
  }
  return (
    <div className="app">
      <Title />
      <AddGoal
        onAddGoal={onAddGoal}
        goalTitle={goalTitle}
        setGoalTitle={setGoalTitle}
      />
      <ListGoal
        goals={goals}
        onHandleToggle={handleToggle}
        onHandleDelete={hanndleDelete}
      />
      <Stats totlaGoals={totlaGoals} completedGoals={completedGoals} />
    </div>
  );
}

function Title() {
  return <h1 className="title">Goal Tracker</h1>;
}

function AddGoal({ goalTitle, setGoalTitle, onAddGoal }) {
  function handleSubmit(e) {
    e.preventDefault();
    onAddGoal({ id: new Date().getTime(), title: goalTitle, completed: false });
  }
  return (
    <form className="add-goal" onSubmit={handleSubmit}>
      <label>Add Your Goal</label>
      <input
        type="text"
        value={goalTitle}
        onChange={(e) => setGoalTitle((tl) => e.target.value)}
      />
      <button className="btn">Add</button>
    </form>
  );
}

function ListGoal({ goals, onHandleToggle, onHandleDelete }) {
  return (
    <ul className="list-goal">
      {goals.map((goal) => (
        <Goal
          goal={goal}
          key={goal.id}
          onHandleToggle={onHandleToggle}
          onHandleDelete={onHandleDelete}
        />
      ))}
    </ul>
  );
}

function Goal({ goal, onHandleToggle, onHandleDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={goal.completed}
        onChange={(e) => onHandleToggle(goal.id, e.target.checked)}
      />

      <span className={goal.completed ? "completed" : ""}>{goal.title}</span>
      <button className="btn" onClick={() => onHandleDelete(goal.id)}>
        ❌
      </button>
    </li>
  );
}
function Stats({ totlaGoals, completedGoals }) {
  return (
    <div className="stats">
      <h2>Stats</h2>
      <h3>Total Goals: {totlaGoals}</h3>
      <h3>Completed Goals: {completedGoals}</h3>
    </div>
  );
}
export default App;
