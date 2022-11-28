import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");
function App() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  const counters = [
    {
      name: "counter1",
      id: 111,
      value: counter1,
      setCounter: setCounter1,
    },
    {
      name: "counter2",
      id: 222,
      value: counter2,
      setCounter: setCounter2,
    },
    {
      name: "counter3",
      id: 333,
      value: counter3,
      setCounter: setCounter3,
    },
  ];

  const incrementCounter = () => {
    socket.emit("increment-counter", { counter: counters });
  };

  useEffect(() => {
    socket.on("recieved-increment-counter", (data) => {
      counters.forEach((counter, index) => {
        counter.setCounter(data.counter[index].value);
      });
    });
  }, [counters]);

  return (
    <div>
      <h1>project 2</h1>
      <div>
        {counters.map((counter) => {
          return (
            <div key={counter.id}>
              <p>{counter.name}</p>
              <p>
                value: <b>{counter.value}</b>
              </p>
              <button
                onClick={() => {
                  counter.setCounter(counter.value + 1);
                  counter.value = counter.value + 1;
                  incrementCounter();
                }}
              >
                {counter.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
