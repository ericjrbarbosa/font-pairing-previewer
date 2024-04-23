import React, { useState } from "react";

type TextOnlyInputProps = {
  defaultText: string;
};

const TextOnlyInput: React.FC<TextOnlyInputProps> = ({
  defaultText,
}: TextOnlyInputProps) => {
  const [text, setText] = useState<string>(defaultText);

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const plainText = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, plainText);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>): void => {
    let currentTarget = e.currentTarget as HTMLDivElement;
    const newText = currentTarget.innerText
      .replace(/[\r\n]+/gm, " ") // Replace newlines with space
      .replace(/[^\w\s]|_/g, "") // Remove all non-word characters
      .replace(/\s+/g, " "); // Replace multiple spaces with a single space

    if (newText !== text) {
      setText(newText);
      currentTarget.innerText = newText;
    }
  };

  return (
    <div
      className="outline-none"
      contentEditable={true}
      spellCheck={false}
      onPaste={handlePaste}
      onInput={handleInput}
      suppressContentEditableWarning={true}>
      {text}
    </div>
  );
};

export default TextOnlyInput;
