import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Mock data for chat history
const CHAT_HISTORY = {
  "Using Tailwind CSS Guide": [
    { role: 'user', content: 'How do I use Tailwind CSS?' },
    { role: 'assistant', content: 'Tailwind CSS is a utility-first CSS framework. To get started:\n\n1. Install via npm:\n```bash\nnpm install tailwindcss\n```\n\n2. Create config file:\n```bash\nnpx tailwindcss init\n```\n\n3. Add paths to your template files in tailwind.config.js\n\n4. Add Tailwind directives to your CSS:\n```css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n```\n\nNow you can use utility classes like:\n```html\n<div class="p-4 bg-blue-500 text-white rounded-lg">\n  Hello Tailwind!\n</div>\n```' }
  ],
  "Likeable and Inception Levels": [
    { role: 'user', content: 'Explain the concept of inception levels in social media' },
    { role: 'assistant', content: 'Inception levels in social media refer to the depth of engagement and viral potential of content. Here are the key levels:\n\n1. Surface Level: Basic likes and views\n2. Engagement Level: Comments and shares\n3. Community Level: User-generated content and discussions\n4. Viral Level: Content spreads beyond original network\n5. Cultural Impact: Becomes a lasting trend or meme\n\nThe goal is to create content that reaches deeper inception levels for maximum impact.' }
  ],
  "Viral Figma Board Ideas": [
    { role: 'user', content: 'Give me some viral Figma board ideas' },
    { role: 'assistant', content: 'Here are some viral-worthy Figma board concepts:\n\n1. Social Media Kit Template\n- Story templates\n- Post layouts\n- Engagement trackers\n\n2. Design System Showcase\n- Component library\n- Color theory examples\n- Typography hierarchy\n\n3. UX Flow Animations\n- Micro-interactions\n- Transition states\n- Loading animations\n\n4. Mobile App Prototype\n- Gesture interactions\n- Dark/light mode toggles\n- Onboarding flow\n\nThese templates often go viral in design communities!' }
  ],
  "RAG Status in Software Dev": [
    { role: 'user', content: 'What is RAG in software development?' },
    { role: 'assistant', content: 'RAG (Retrieval-Augmented Generation) in software development is a powerful approach that combines:\n\n1. Retrieval: Finding relevant information from a knowledge base\n2. Augmentation: Enhancing the context with retrieved information\n3. Generation: Creating responses based on the enhanced context\n\nKey benefits:\n- More accurate responses\n- Up-to-date information\n- Reduced hallucinations\n- Better context awareness\n\nCommon uses:\n- Documentation systems\n- Customer support\n- Code assistance\n- Knowledge management' }
  ],
  "Image Input ChatGPT API": [
    { role: 'user', content: 'How can I handle image inputs with ChatGPT API?' },
    { role: 'assistant', content: 'To handle image inputs with ChatGPT API (GPT-4 Vision), you can:\n\n1. Use base64 encoding:\n```javascript\nasync function analyzeImage(imageBase64) {\n  const response = await fetch("https://api.openai.com/v1/chat/completions", {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "Authorization": `Bearer ${OPENAI_API_KEY}`\n    },\n    body: JSON.stringify({\n      model: "gpt-4-vision-preview",\n      messages: [\n        {\n          role: "user",\n          content: [\n            { type: "text", text: "What\'s in this image?" },\n            { type: "image_url", url: `data:image/jpeg;base64,${imageBase64}` }\n          ]\n        }\n      ]\n    })\n  });\n  return await response.json();\n}\n```' }
  ]
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState<string>("");
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const { toast } = useToast();

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChat("");
  };

  const handleChatSelect = (chatTitle: string) => {
    if (CHAT_HISTORY[chatTitle]) {
      setMessages(CHAT_HISTORY[chatTitle]);
      setCurrentChat(chatTitle);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setResponseTime(null);
    const startTime = Date.now();

    try {
      const newMessages = [
        ...messages,
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      // Call the Groq API with streaming enabled
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: `You are a professional business analyst and consultant who creates comprehensive McKinsey-style research reports. When given a company name, you will generate a detailed research report following this structure:

1. Executive Summary
- Company overview
- Market position
- Key differentiators
- Strategic outlook

2. Introduction & Background
- Company history
- Founders' vision
- Key milestones
- Core problem addressed

3. Industry & Market Analysis
- Industry landscape
- Market size
- Growth trends
- Competitive dynamics
- Regulatory challenges

4. Business Model & Strategy
- Operational model
- Revenue streams
- Unit economics
- Differentiation strategy

5. Technology & Operations
- Technological innovations
- Operational efficiencies
- Supply chain/logistics
- AI/ML implementation

6. Financial Analysis
- Financial health
- Funding rounds
- Revenue breakdowns
- Profitability projections

7. Competitive Benchmarking & SWOT
- Competitor comparison
- Comprehensive SWOT analysis

8. Challenges & Risks
- Operational risks
- Market risks
- Regulatory risks
- Scalability hurdles

9. Future Outlook & Growth
- Expansion plans
- Long-term vision
- Upcoming innovations

10. Key Takeaways & Recommendations
- Critical insights
- Actionable recommendations

Use current data and cite sources when possible. Include relevant metrics, charts, and expert opinions. Focus on providing actionable insights and strategic recommendations.
And Atlast after giving the complete research report to the user, ask to user if he need the complete year by year chronological events of the company, and if he said proceed, give him the complete year by year chronological events of the company in a detailed manner without missing anything or any year.
``
            },
            ...newMessages
          ],
          max_tokens: 4096,
          temperature: 0.7,
          stream: true, // Enable streaming
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error calling Groq API');
      }

      // Create a new message for streaming response
      const streamingMessage: Message = {
        role: 'assistant',
        content: ''
      };
      setMessages([...newMessages, streamingMessage]);

      // Set up the stream reader
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            const endTime = Date.now();
            const timeTaken = (endTime - startTime) / 1000; // Convert to seconds
            setResponseTime(timeTaken);
            break;
          }

          // Decode the stream chunk
          const chunk = decoder.decode(value);
          const lines = chunk
            .split('\n')
            .filter(line => line.trim() !== '');

          for (const line of lines) {
            const message = line.replace(/^data: /, '');
            if (message === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(message);
              const content = parsed.choices[0].delta?.content || '';
              
              // Update the streaming message content
              setMessages(prevMessages => {
                const updatedMessages = [...prevMessages];
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                lastMessage.content += content;
                return updatedMessages;
              });
            } catch (error) {
              console.error('Could not parse stream message', message, error);
            }
          }
        }
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get response",
        variant: "destructive"
      });
      console.error("API call error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onApiKeyChange={() => {}}
        onNewChat={handleNewChat}
        onChatSelect={handleChatSelect}
        currentChat={currentChat}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} title={currentChat || "SNS GPT"} />
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center text-gray-800 animate-pulse-slow">Enter a Company Name for a Detailed Research Report</h1>
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <ActionButtons />
            </div>
          ) : (
            <>
              <MessageList messages={messages} isStreaming={isLoading} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              {responseTime !== null && !isLoading && (
                <div className="text-xs text-center text-gray-500 py-2">
                  Completed Response in: {responseTime.toFixed(2)}s
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
