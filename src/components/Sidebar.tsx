import { Menu, Globe, ChevronDown, Key, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onApiKeyChange: (apiKey: string) => void;
  onNewChat: () => void;
  onChatSelect: (chatTitle: string) => void;
  currentChat: string;
}

const Sidebar = ({ isOpen, onToggle, onApiKeyChange, onNewChat, onChatSelect, currentChat }: SidebarProps) => {
  const [apiKey, setApiKey] = useState("");
  const timeframes = [
    { title: "Yesterday", items: ["Using Tailwind CSS Guide"] },
    { 
      title: "Previous 7 Days", 
      items: [
        "Likeable and Inception Levels",
        "Viral Figma Board Ideas",
        "RAG Status in Software Dev",
        "Image Input ChatGPT API"
      ] 
    },
    {
      title: "Previous 30 Days",
      items: [
        "Focus on Lovable Viral",
        "Create Twitter Clone",
        "Reddit Posting Guidelines",
        "Revamping Social Features",
        "US AI Voting Logo"
      ]
    }
  ];

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setApiKey(value);
    onApiKeyChange(value);
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-chatgpt-sidebar shadow-md transition-all duration-300",
      isOpen ? "w-64" : "w-0"
    )}>
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
        <div className="flex justify-between flex h-[60px] items-center">
          <button onClick={onToggle} className="h-10 rounded-lg px-2 text-gray-700 hover:bg-orange-100">
            <Menu className="h-5 w-5" />
          </button>
          <button 
            onClick={onNewChat}
            className="flex items-center gap-2 rounded-lg px-3 py-1 text-sm hover:bg-orange-100"
          >
            <Plus className="h-5 w-5 text-orange-500" />
            {isOpen && <span className="text-gray-700">New Chat</span>}
          </button>
        </div>

        <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
          {isOpen && (
            <div className="p-2 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-gray-700">API Key</span>
              </div>
              <Input
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={handleApiKeyChange}
                className="bg-white/80 border-orange-200 focus:border-orange-400 text-gray-700"
              />
            </div>
          )}

          <div className="bg-token-sidebar-surface-primary pt-0">
            <div className="flex flex-col gap-2 px-2 py-2">
              <div className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-orange-100 cursor-pointer">
                <div className="h-6 w-6 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-sm text-gray-700">SNS GPT</span>
              </div>
              <div className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-orange-100 cursor-pointer">
                <div className="h-6 w-6 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-sm text-gray-700">Explore SNS AI</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {timeframes.map((timeframe) => (
                <div key={timeframe.title}>
                  <div className="px-3 py-2 text-xs text-orange-600 font-medium">{timeframe.title}</div>
                  {timeframe.items.map((item) => (
                    <div 
                      key={item} 
                      className={cn(
                        "group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-orange-100 cursor-pointer",
                        currentChat === item ? "bg-orange-100" : ""
                      )}
                      onClick={() => onChatSelect(item)}
                    >
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col py-2 border-t border-orange-200">
            <button className="group flex gap-2 p-2.5 text-sm items-start hover:bg-orange-100 rounded-lg px-2 text-left w-full min-w-[200px]">
              <span className="flex w-full flex-row flex-wrap-reverse justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-sm bg-white">
                    <img 
                      src="/images/sns-logo.png" 
                      alt="SNS Logo" 
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-700">Upgrade plan</span>
                    <span className="line-clamp-1 text-xs text-orange-500">More access to the best models</span>
                  </div>
                </div>
              </span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
