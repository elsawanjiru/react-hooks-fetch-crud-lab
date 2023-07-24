import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt: prompt,
      answers: answers,
      correctIndex: correctIndex,
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => onAddQuestion(data));

    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question Prompt:</label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Answers:</label>
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
            required
          />
        ))}
      </div>
      <div>
        <label>Correct Answer:</label>
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
        >
          {answers.map((_, index) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
