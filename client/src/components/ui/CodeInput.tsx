import React, { useState, useRef } from 'react';

interface CodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

const CodeInput = ({ length = 5, onComplete }: CodeInputProps) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChangeInput = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (newCode.every(digit => digit !== '')) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('Text').slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;
    const newCode = pasteData.split('');
    for (let i = 0; i < length; i++) {
      newCode[i] = newCode[i] || '';
    }
    setCode(newCode);
    if (newCode.every(digit => digit !== '')) {
      onComplete(newCode.join(''));
    }
    e.preventDefault();
  };

  return (
    <div className="flex justify-center gap-2 my-8">
      {code.map((value, index) => (
        <input
          key={index}
          ref={el => (inputRef.current[index] = el)}
          type="text"
          value={value}
          maxLength={1}
          onChange={e => handleChangeInput(e.target.value, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-10 h-10 text-center border rounded-lg text-xl bg-neutral text-dark
          outline:border-secondary focus:border-secondary focus:ring-secondary focus:outline-none"
        />
      ))}
    </div>
  );
};

export default CodeInput;
