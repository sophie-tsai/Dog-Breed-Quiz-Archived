import React from "react";

function AnswerChoice(props) {
  return (
    <div>
      <h1 className="multipleChoice">{props.correctAnswer}</h1>
    </div>
  );
}

export default AnswerChoice;
