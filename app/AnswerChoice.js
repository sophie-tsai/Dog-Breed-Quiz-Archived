import React from "react";

function AnswerChoices(props) {
  const borderColor = {
    borderColor: props.borderColor
  };

  return (
    <div className="text-center">
      <button
        className="multipleChoice"
        onClick={event => props.handleChoice(event, props.text)}
        style={borderColor}
      >
        {props.text}
      </button>
    </div>
  );
}

export default AnswerChoices;
