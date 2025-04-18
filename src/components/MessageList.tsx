import { useEffect, useRef } from 'react';
import Message from './Message';

interface MessageListProps {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  isStreaming?: boolean;
}

const MessageList = ({ messages, isStreaming = false }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto py-4 px-4">
      <div className="mx-auto max-w-3xl space-y-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            role={message.role}
            content={message.content}
            isLast={index === messages.length - 1}
            isStreaming={isStreaming && index === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;