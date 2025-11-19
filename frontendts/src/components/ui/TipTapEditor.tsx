import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
} from 'lucide-react';
import React, { useEffect } from 'react';

interface TiptapEditorProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (event: { target: { name: string; value: string } }) => void;
  placeholder?: string;
  height?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const TipTapEditor: React.FC<TiptapEditorProps> = ({
  label = '',
  name = 'content',
  value = '',
  onChange,
  placeholder = 'Nhập nội dung...',
  height = '200px',
  required = false,
  error = '',
  disabled = false,
  className = '',
}) => {

  // Khởi tạo editor với các extension từ starter-kit
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      if (onChange) {
        onChange({
          target: {
            name,
            value: html,
          },
        });
      }
    },
    editorProps: {
      attributes: {
        class: `prose max-w-none focus:outline-none ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`,
        placeholder: placeholder,
      },
    },
  });

  // Cập nhật content khi value prop thay đổi từ bên ngoài
  useEffect(() => {
    if (editor && value !== undefined && value !== null) {
      const currentContent = editor.getHTML();
      if (currentContent !== value) {
        editor.commands.setContent(value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  // Toolbar button component
  const ToolbarButton = ({
    icon,
    onClick,
    isActive = false,
  }: {
    icon: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-md transition-colors ${
        isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon}
    </button>
  );

  return (
    <div className={`mb-6 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Editor Container */}
      <div
        className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden`}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-300">
          <ToolbarButton
            icon={<Bold size={18} />}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            isActive={editor?.isActive('bold') || false}
          />
          <ToolbarButton
            icon={<Italic size={18} />}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            isActive={editor?.isActive('italic') || false}
          />
          <div className="w-px h-6 mx-1 bg-gray-300"></div>

          <ToolbarButton
            icon={<Heading1 size={18} />}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor?.isActive('heading', { level: 1 }) || false}
          />
          <ToolbarButton
            icon={<Heading2 size={18} />}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor?.isActive('heading', { level: 2 }) || false}
          />
          <ToolbarButton
            icon={<Heading3 size={18} />}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor?.isActive('heading', { level: 3 }) || false}
          />
          <div className="w-px h-6 mx-1 bg-gray-300"></div>

          <ToolbarButton
            icon={<List size={18} />}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            isActive={editor?.isActive('bulletList') || false}
          />
          <ToolbarButton
            icon={<ListOrdered size={18} />}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            isActive={editor?.isActive('orderedList') || false}
          />
          <div className="w-px h-6 mx-1 bg-gray-300"></div>

          <ToolbarButton
            icon={<Quote size={18} />}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            isActive={editor?.isActive('blockquote') || false}
          />
          <ToolbarButton
            icon={<Code size={18} />}
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            isActive={editor?.isActive('codeBlock') || false}
          />
          <div className="ml-auto flex gap-1">
            <ToolbarButton
              icon={<Undo size={18} />}
              onClick={() => editor?.chain().focus().undo().run()}
            />
            <ToolbarButton
              icon={<Redo size={18} />}
              onClick={() => editor?.chain().focus().redo().run()}
            />
          </div>
        </div>

        {/* Editor Content */}
        <div className="bg-white" style={{ minHeight: height }}>
          <EditorContent
            editor={editor}
            className={`h-full p-4 prose max-w-none focus:outline-none ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        </div>

        {/* Placeholder styling via CSS */}
        <style>{`
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
          .ProseMirror:focus {
            outline: none;
          }
        `}</style>
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 text-xs font-medium mt-2">{error}</div>}
    </div>
  );
};

export default TipTapEditor;
