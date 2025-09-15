import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxHighlighterProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeHighlighter({ code, language = 'typescript', className = '' }: SyntaxHighlighterProps) {
  return (
    <div className={`${className}`}>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          background: 'transparent',
          padding: '0',
          margin: '0',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-geist-mono)',
          lineHeight: '1.5',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'var(--font-geist-mono)',
            color: 'rgba(255, 255, 255, 0.9)',
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
