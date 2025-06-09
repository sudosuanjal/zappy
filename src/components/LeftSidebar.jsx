import { Bell, Calendar, Diamond, Mail, Trash2, User } from "lucide-react";

const LeftSidebar = () => {
  return (
    <div
      className="w-18 bg-gray-900 rounded-xl p-4 flex flex-col"
      style={{ backgroundColor: "#02001A" }}
    >
      <div className="flex items-center space-x-2 mb-8">
        <Diamond className="text-orange-500" size={24} />
      </div>
      <div className="flex flex-col space-y-6 flex-1">
        <Mail
          className="text-white hover:text-orange-500 cursor-pointer transition-colors"
          size={24}
        />
        <Calendar
          className="text-white hover:text-orange-500 cursor-pointer transition-colors"
          size={24}
        />
        <Bell
          className="text-white hover:text-orange-500 cursor-pointer transition-colors"
          size={24}
        />
        <Trash2
          className="text-white hover:text-orange-500 cursor-pointer transition-colors"
          size={24}
        />
      </div>
      <User
        className="text-white hover:text-orange-500 cursor-pointer transition-colors mt-auto"
        size={24}
      />
    </div>
  );
};

export default LeftSidebar;
