const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  if (isAssistant) {
    return (
      <div className="relative flex h-8 w-8 items-center justify-center rounded-sm bg-white">
        <img 
          src="/images/sns-logo.png" 
          alt="SNS Logo" 
          className="h-8 w-8 object-contain"
        />
      </div>
    );
  }
  
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-300 bg-orange-50 text-gray-600 shadow-md">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
  );
};

export default MessageAvatar;
