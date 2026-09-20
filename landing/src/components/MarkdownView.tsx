import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface MarkdownViewProps {
  content: string;
  className?: string;
}

const renderInline = (text: string): React.ReactNode => {
  // Regex matches `code`, **bold**, *italic*
  const tokens: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      tokens.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700/60 font-mono text-[11px]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(
        <strong key={match.index} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      tokens.push(
        <em key={match.index} className="text-slate-200 italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens.length > 0 ? tokens : text;
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl border border-white/10 bg-[#06070a] overflow-hidden text-xs font-mono">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80 border-b border-white/[0.06] text-[11px] text-slate-400">
        <span className="text-sky-400 uppercase font-semibold text-[10px]">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-slate-200 leading-relaxed m-0 whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content, className = '' }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block boundaries
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeBlockContent.join('\n')}
            language={codeBlockLang}
          />
        );
        inCodeBlock = false;
        codeBlockLang = '';
        codeBlockContent = [];
      } else {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-sm font-bold text-sky-300 mt-3.5 mb-1.5 tracking-tight flex items-center gap-2">
          <span className="w-1 h-3.5 rounded-full bg-sky-400 inline-block shrink-0" />
          {renderInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-base font-bold text-white mt-4 mb-2 tracking-tight">
          {renderInline(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-lg font-extrabold text-white mt-4 mb-2 tracking-tight">
          {renderInline(line.slice(2))}
        </h1>
      );
      continue;
    }

    // Unordered list item
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const listContent = line.trim().slice(2);
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-2.5 my-1 text-xs text-slate-300 leading-relaxed">
          <span className="text-sky-400 mt-1 shrink-0 text-xs leading-none">•</span>
          <span className="flex-1">{renderInline(listContent)}</span>
        </div>
      );
      continue;
    }

    // Numbered list item
    const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const listContent = numberedMatch[2];
      elements.push(
        <div key={`nli-${i}`} className="flex items-start gap-2.5 my-1 text-xs text-slate-300 leading-relaxed">
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-sky-400 font-mono text-[10px] font-bold mt-0.5 shrink-0 border border-slate-700/60">
            {num}
          </span>
          <span className="flex-1">{renderInline(listContent)}</span>
        </div>
      );
      continue;
    }

    // Empty line
    if (!line.trim()) {
      elements.push(<div key={`sp-${i}`} className="h-1.5" />);
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="my-1 text-xs text-slate-300 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  }

  // If code block wasn't closed
  if (inCodeBlock && codeBlockContent.length > 0) {
    elements.push(
      <CodeBlock
        key="code-unfinished"
        code={codeBlockContent.join('\n')}
        language={codeBlockLang}
      />
    );
  }

  return <div className={`space-y-0.5 ${className}`}>{elements}</div>;
};
