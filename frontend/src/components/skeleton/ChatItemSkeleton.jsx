const ChatItemSkeleton = () => {
  return (
    <div className="flex items-center p-4 rounded-xl mx-2 mb-2">
      <div className="relative">
        {/* Avatar skeleton */}
        <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse" />
        {/* Online indicator skeleton */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-700 animate-pulse" />
      </div>

      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between">
          {/* Name skeleton */}
          <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
          {/* Time skeleton */}
          <div className="h-3 w-12 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="flex items-center justify-between mt-2">
          {/* Message skeleton */}
          <div className="h-3 w-32 bg-zinc-800 rounded animate-pulse" />
          {/* Unread badge skeleton */}
          <div className="h-5 w-5 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ChatItemSkeleton;
