import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import type { ChatBubbleProps } from "../../model/interfaces";

const wrapTextByWords = (text: string, maxLen: number): string => {
  const words = text.split(" ");
  let currentLine = "";
  const lines: string[] = [];

  for (const word of words) {
    if ((currentLine + word).length <= maxLen) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines.join("\n");
};

const wrapCodeLines = (code: string, maxLen: number): string => {
  const lines = code.split("\n");
  const wrappedLines: string[] = [];

  lines.forEach((line) => {
    if (line.length <= maxLen) {
      wrappedLines.push(line);
    } else {
      const indentMatch = line.match(/^\s*/);
      const indent = indentMatch ? indentMatch[0] : "";
      let remaining = line.trim();
      while (remaining.length > 0) {
        wrappedLines.push(indent + remaining.slice(0, maxLen));
        remaining = remaining.slice(maxLen);
      }
    }
  });

  return wrappedLines.join("\n");
};

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className={`
          relative max-w-2xl w-full p-4 rounded-3xl 
          backdrop-blur-md bg-white/10 text-white
          border border-white/20 shadow-lg text-left
        `}
      >
        <button
          onClick={() => handleCopy(content)}
          className="absolute top-2 right-2 p-1 rounded-md hover:bg-white/20 transition"
          title="Copy all"
        >
          <Copy size={16} />
        </button>

        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }: CodeProps) {
              const codeContent = String(children).replace(/\n$/, "");
              const match = /language-(\w+)/.exec(className || "");

              if (inline || !match) {
                return (
                  <code
                    className="bg-black/30 px-1 py-0.5 rounded text-sm text-blue-300 font-mono"
                    {...props}
                  >
                    {codeContent}
                  </code>
                );
              }

              const formattedCode = wrapCodeLines(codeContent, 50);

              return (
                <div className="relative group my-3">
                  <div className="overflow-x-auto rounded-lg">
                    <SyntaxHighlighter
                      language={match[1]}
                      style={oneDark}
                      PreTag="div"
                      className="min-w-max p-3 text-sm"
                      wrapLongLines={false}
                    >
                      {formattedCode}
                    </SyntaxHighlighter>
                  </div>

                  <button
                    onClick={() => handleCopy(codeContent)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md bg-white/10 hover:bg-white/20 transition"
                    title="Copy code"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              );
            },

            p({ children }) {
              const text = React.Children.toArray(children).map((child) =>
                typeof child === "string" ? wrapTextByWords(child, 50) : child
              );

              return (
                <p className="mb-2 leading-relaxed whitespace-pre-wrap text-left">
                  {text}
                </p>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>

        {copied && (
          <span className="absolute bottom-2 right-2 text-xs text-green-400">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
