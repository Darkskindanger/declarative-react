import { useState } from "react";

export default function Form() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <h1>Thats right!</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <main className="border-2 p-2 w-1/4 mx-auto">
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit} className="border-2 p-2">
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
          className="w-full border-2"
        />
        <br />
        <button
          className="border-2 p-1"
          disabled={answer.length === 0 || status === "submitting"}
        >
          Submit
        </button>
        {error !== null && (
          <p className="Error border-2 border-red-500 p-2">{error.message}</p>
        )}
      </form>
    </main>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
