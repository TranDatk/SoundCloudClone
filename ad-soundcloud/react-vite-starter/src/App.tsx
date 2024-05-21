import { useState } from "react"

function App() {
  const [toDoList, setToDoList] = useState(["1", "2"])
  const [value, setValue] = useState("")

  function handle() {
    setToDoList([...toDoList, value])
  }

  return (
    <>
      <input type="text" onChange={(event) => {
        setValue(event.target.value)
      }} />
      <button onClick={() => { handle() }}>submit</button>
      {toDoList.map((value, key) => {
        return (
          <>
            <ul>
              <li key={key}>{value}</li>
            </ul>
          </>
        )
      })}
    </>
  )
}

export default App
