import { Volume2, ThumbsUp, ThumbsDown, Copy, RotateCcw, MoreHorizontal, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface MessageActionsProps {
  content: string;
}

const MessageActions = ({ content }: MessageActionsProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Message content has been copied to your clipboard",
      });
      
      // Reset the copy icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the message to clipboard",
        variant: "destructive"
      });
    }
  };

  const speakText = async () => {
    try {
      setIsPlaying(true);
      const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Default voice ID
      const API_KEY = "sk_afe79e7bb28a23cabcbd2e0c242d1634e8d00a9c6df353db";

      const response = await axios({
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        headers: {
          accept: 'audio/mpeg',
          'content-type': 'application/json',
          'xi-api-key': API_KEY,
        },
        data: {
          text: content,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        },
        responseType: 'arraybuffer'
      });

      // Convert the audio data to a blob
      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      // Create and play audio
      const audio = new Audio(url);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url); // Clean up the URL
      };
      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        toast({
          title: "Error",
          description: "Failed to play audio",
          variant: "destructive"
        });
      };
      await audio.play();

    } catch (error: any) {
      setIsPlaying(false);
      toast({
        title: "Text-to-speech failed",
        description: error.message || "Could not convert text to speech",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center gap-2 text-orange-400">
      <button 
        className={`p-1 transition-colors ${isPlaying ? 'text-orange-600' : 'hover:text-orange-600'}`}
        onClick={speakText}
        disabled={isPlaying}
      >
        <Volume2 className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
      </button>
      <button className="p-1 hover:text-orange-600 transition-colors">
        <ThumbsUp className="h-4 w-4" />
      </button>
      <button className="p-1 hover:text-orange-600 transition-colors">
        <ThumbsDown className="h-4 w-4" />
      </button>
      <button 
        className="p-1 hover:text-orange-600 transition-colors"
        onClick={handleCopy}
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <button className="p-1 hover:text-orange-600 transition-colors">
        <RotateCcw className="h-4 w-4" />
      </button>
      <button className="p-1 hover:text-orange-600 transition-colors">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MessageActions;
