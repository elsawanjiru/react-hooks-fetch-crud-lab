import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  function handleDeleteClick() {
    onDeleteQuestion(question.id);
  }

  function handleDropdownChange(e) {
    const updatedData = { correctIndex: parseInt(e.target.value) };
    onUpdateQuestion(question.id, updatedData);
  }

  return (
    <div>
      <h3>{question.prompt}</h3>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>
            {index + 1}. {answer}
          </li>
        ))}
      </ul>
      <div>
        <label>Correct Answer:</label>
        <select
          value={question.correctIndex}
          onChange={handleDropdownChange}
        >
          {question.answers.map((_, index) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default QuestionItem;
