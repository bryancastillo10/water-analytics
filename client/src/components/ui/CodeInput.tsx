import { useState, useRef, type KeyboardEvent } from "react";
interface CodeInputProps{
    length?: number;
    onComplete: (code: string) => void;
}

const CodeInput = ({ length = 5, onComplete}: CodeInputProps) => {
    const [code, setCode] = useState<string[]>(Array(length).fill(""));
    const inputRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChangeInput = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }

        if (newCode.every((digit) => digit !== "")) {
            onComplete(newCode.join(""));
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

  return (
    <div className="flex gap-2">
      {code.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRef.current[index] = el)}
          type="text"
          value={value}
          maxLength={1}
          onChange={(e) => handleChangeInput(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="size-10 text-center border rounded-lg text-xl bg-neutral text-dark
          outline:border-secondary focus:border-secondary focus:ring-secondary focus:outline-none"
        />
      ))}
    </div>
  );
}

export default CodeInput;
