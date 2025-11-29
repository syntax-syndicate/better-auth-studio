import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
import { useEffect, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
// import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { EditorState, LexicalEditor } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { Bold, Italic, Underline } from 'lucide-react';
import { Button } from './ui/button';
import { FORMAT_TEXT_COMMAND } from 'lexical';

const theme = {
  paragraph: 'text-gray-900',
  heading: {
    h1: 'text-2xl font-bold text-gray-900',
    h2: 'text-xl font-bold text-gray-900',
    h3: 'text-lg font-bold text-gray-900',
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
  },
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: 'list-decimal ml-4',
    ul: 'list-disc ml-4',
    listitem: 'my-1',
  },
  link: 'text-blue-600 underline',
};

function onError(error: Error) {
  console.error(error);
}

interface EmailWysiwygEditorProps {
  html: string;
  onChange: (html: string) => void;
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: 'bold' | 'italic' | 'underline') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-dashed border-white/10 bg-white/5">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText('bold')}
        className="h-7 w-7 p-0 rounded-none border border-dashed border-white/10 hover:bg-white/10"
      >
        <Bold className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText('italic')}
        className="h-7 w-7 p-0 rounded-none border border-dashed border-white/10 hover:bg-white/10"
      >
        <Italic className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatText('underline')}
        className="h-7 w-7 p-0 rounded-none border border-dashed border-white/10 hover:bg-white/10"
      >
        <Underline className="w-3 h-3" />
      </Button>
    </div>
  );
}

function EditorContent({ html, onChange }: EmailWysiwygEditorProps) {
  const [editor] = useLexicalComposerContext();
  const isUpdatingRef = useRef(false);
  const lastHtmlRef = useRef<string>('');

  useEffect(() => {
    if (html && html !== lastHtmlRef.current && !isUpdatingRef.current) {
      isUpdatingRef.current = true;
      lastHtmlRef.current = html;
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        
        try {
          const parser = new DOMParser();
          const dom = parser.parseFromString(html, 'text/html');
          const body = dom.body;
          const nodes = $generateNodesFromDOM(editor, body);
          if (nodes.length > 0) {
            root.append(...nodes);
          } else {
            const paragraph = $createParagraphNode();
            root.append(paragraph);
          }
        } catch (error) {
          console.error('Error parsing HTML:', error);
          const paragraph = $createParagraphNode();
          paragraph.append($createTextNode(html));
          root.append(paragraph);
        }
      }, { discrete: true });
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 200);
    }
  }, [html, editor]);

  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    if (isUpdatingRef.current) return;
    
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      onChange(htmlString);
    });
  };

  return (
    <>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="min-h-[400px] outline-none p-4 bg-white" />
        }
        placeholder={
          <div className="absolute top-12 left-4 text-gray-400 pointer-events-none">
            Start editing your email...
          </div>
        }
        ErrorBoundary={() => <div>Error</div>}
        // ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={handleChange} />
      <HistoryPlugin />
      <LinkPlugin />
      <ListPlugin />
    </>
  );
}

export default function EmailWysiwygEditor({ html, onChange }: EmailWysiwygEditorProps) {
  const initialConfig = {
    namespace: 'EmailEditor',
    theme,
    onError,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border border-dashed border-white/20 bg-white rounded-none flex-1 flex flex-col overflow-hidden">
        <EditorContent html={html} onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}

