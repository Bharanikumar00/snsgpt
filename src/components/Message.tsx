import { memo } from 'react';
import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  isLast?: boolean;
  isStreaming?: boolean;
}

const Message = memo(({ role, content, isLast, isStreaming }: MessageProps) => {
  // Function to format text with bold styling while preserving line breaks
  const formatContent = (text: string) => {
    // Split text into lines
    return text.split('\n').map((line, index) => {
      // Replace **text** with bold styling
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, (match, text) => (
        `<strong class="font-semibold">${text}</strong>`
      ));

      // Add line break after each line except the last one
      return (
        <span key={index}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {index < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className={`group relative flex gap-3 ${role === 'assistant' ? 'bg-orange-50/50' : ''} px-4 py-4 rounded-lg`}>
      <MessageAvatar role={role} />
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
          {role === 'assistant' ? formatContent(content) : content}
          {isStreaming && isLast && (
            <span className="inline-flex ml-1">
              <span className="animate-pulse">▪</span>
              <span className="animate-pulse delay-100">▪</span>
              <span className="animate-pulse delay-200">▪</span>
            </span>
          )}
        </div>
        {role === 'assistant' && <MessageActions content={content} />}
      </div>
    </div>
  );
});

Message.displayName = 'Message';

export default Message;
