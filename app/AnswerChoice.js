import React from "react";

function AnswerChoices(props) {
  return (
    <div className="text-center">
      <button className="multipleChoice">{props.multiChoiceAnswer}</button>
    </div>
  );
}

export default AnswerChoices;
