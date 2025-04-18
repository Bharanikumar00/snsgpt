
import { ImagePlus, FileText, BarChart2, Code, HelpCircle } from "lucide-react";

const ActionButtons = () => {
  const actions = [
    { icon: <ImagePlus className="h-4 w-4 text-purple-500" />, label: "Create image", color: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
    { icon: <FileText className="h-4 w-4 text-blue-500" />, label: "Summarize text", color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
    { icon: <BarChart2 className="h-4 w-4 text-green-500" />, label: "Analyze data", color: 'bg-green-50 hover:bg-green-100 border-green-200' },
    { icon: <Code className="h-4 w-4 text-amber-500" />, label: "Code", color: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
    { icon: <HelpCircle className="h-4 w-4 text-red-500" />, label: "Get advice", color: 'bg-red-50 hover:bg-red-100 border-red-200' },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mt-4">
      {actions.map((action) => (
        <button 
          key={action.label} 
          className={`relative flex h-[42px] items-center gap-1.5 rounded-full border px-3 py-2 text-start text-[13px] shadow-soft transition enabled:hover:shadow-md ${action.color}`}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
