import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleUpdateQuestion(id, updatedData) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === id) {
            return { ...question, ...data };
          }
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  return (
    <div>
      <h2>Quiz Questions</h2>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      ))}
    </div>
  );
}

export default QuestionList;
