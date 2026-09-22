import React, { useState, useEffect } from 'react';

export interface TypingTextProps {
  texts?: string[];
  text?: string;
  delay?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
  prefix?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({
  texts,
  text = '',
  delay = 45,
  pauseDuration = 2200,
  className = '',
  cursorClassName = 'text-sky-400 font-bold',
  prefix = '',
}) => {
  const words = texts && texts.length > 0 ? texts : [text];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = words[currentWordIndex] || '';

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Digitando
          if (currentText.length < fullText.length) {
            setCurrentText(fullText.slice(0, currentText.length + 1));
          } else {
            // Pausar na palavra completa antes de apagar se houver mais de uma
            if (words.length > 1) {
              setTimeout(() => setIsDeleting(true), pauseDuration);
            }
          }
        } else {
          // Apagando
          if (currentText.length > 0) {
            setCurrentText(fullText.slice(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? delay / 2 : delay
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay, pauseDuration]);

  return (
    <span className={`inline-flex items-center font-mono ${className}`}>
      {prefix && <span className="mr-1 select-none">{prefix}</span>}
      <span>{currentText}</span>
      <span className={`ml-0.5 animate-pulse select-none ${cursorClassName}`}>
        ▋
      </span>
    </span>
  );
};
