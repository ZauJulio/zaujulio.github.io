import React from 'react';
import ReactMarkdown from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

/**
 * Shared Markdown renderer with:
 * - GitHub Flavored Markdown (tables, strikethrough, task lists, etc.)
 * - Raw HTML support (enables iframes for CodeSandbox, StackBlitz, YouTube, etc.)
 * - Syntax highlighting for code blocks
 * - Dark theme styled prose
 */
export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className='prose prose-invert prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-brand-400 max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Headings
          h1: ({ children }) => <h1 className='text-3xl font-bold text-white mt-10 mb-4 px-4 pb-4'>{children}</h1>,
          h2: ({ children }) => (
            <h2 className='text-2xl font-bold text-white mt-10 mb-4 px-4 border-b border-gray-800 pb-4'>{children}</h2>
          ),
          h3: ({ children }) => <h3 className='text-xl font-semibold text-white mt-8 mb-3 px-4 pb-4'>{children}</h3>,
          h4: ({ children }) => <h4 className='text-lg font-semibold text-gray-200 mt-6 mb-2 px-4 pb-4'>{children}</h4>,

          // Paragraphs
          p: ({ children }) => <p className='text-gray-300 leading-relaxed'>{children}</p>,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className='text-brand-300 hover:text-brand-500 transition-colors underline decoration-brand-500/30 underline-offset-2'
            >
              {children}
            </a>
          ),

          // Images
          img: ({ src, alt }) => (
            <figure className='my-6'>
              <img src={src} alt={alt || ''} className='rounded-xl border border-gray-800 w-full' loading='lazy' />
              {alt && <figcaption className='text-center text-gray-500 text-sm mt-2'>{alt}</figcaption>}
            </figure>
          ),

          // Code blocks
          pre: ({ children }) => (
            <pre className='bg-gray-900/80 border border-gray-800 rounded-xl p-4 overflow-x-auto my-4 text-sm'>
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className='bg-gray-800 text-brand-300 px-1.5 py-0.5 rounded text-sm font-mono' {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={`${className} font-mono`} {...props}>
                {children}
              </code>
            );
          },

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className='border-l-4 border-brand-500/50 bg-gray-900/50 px-6 py-4 my-6 mx-4 rounded-r-lg text-gray-400 italic'>
              {children}
            </blockquote>
          ),

          // Lists - use inline style to override prose reset
          ul: ({ children }) => (
            <ul style={{ listStyleType: 'disc', paddingLeft: '2.5rem' }} className='space-y-3 text-gray-300 my-8 mx-4 marker:text-brand-400'>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }} className='space-y-3 text-gray-300 my-8 mx-4 marker:text-brand-400'>{children}</ol>
          ),
          li: ({ children, ...props }) => {
            // Check if this li has nested ul/ol
            const hasNestedList = React.Children.toArray(children).some(
              (child) => React.isValidElement(child) && (child.type === 'ul' || child.type === 'ol')
            );
            return <li className={hasNestedList ? 'text-gray-300 leading-relaxed' : 'text-gray-300 leading-relaxed list-item'} {...props}>{children}</li>;
          },

          // Tables
          table: ({ children }) => (
            <div className='overflow-x-auto my-6'>
              <table className='w-full text-sm border-collapse border border-gray-800 rounded-lg'>{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className='bg-gray-900'>{children}</thead>,
          th: ({ children }) => (
            <th className='text-left px-4 py-2 text-gray-300 font-semibold border border-gray-800'>{children}</th>
          ),
          td: ({ children }) => <td className='px-4 py-2 text-gray-400 border border-gray-800'>{children}</td>,

          // Horizontal rule
          hr: () => <hr className='border-gray-800 my-8' />,

          // Strong / emphasis
          strong: ({ children }) => <strong className='text-white font-semibold'>{children}</strong>,
          em: ({ children }) => <em className='text-gray-300 italic'>{children}</em>,

          // Iframes (for code embeds — CodeSandbox, StackBlitz, YouTube, etc.)
          // Allowed through rehype-raw. Style them with a responsive wrapper.
          iframe: (props) => (
            <div className='my-6 rounded-xl overflow-hidden border border-gray-800'>
              <iframe
                {...props}
                className='w-full'
                style={{
                  minHeight: '400px',
                  ...((props.style as React.CSSProperties) || {}),
                }}
                loading='lazy'
                sandbox='allow-scripts allow-same-origin allow-forms allow-popups allow-presentation'
              />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
