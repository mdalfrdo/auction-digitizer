const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 32L8 20L16 16L16 28L8 32Z"
          fill="#10B981"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M16 28L16 16L24 12L24 24L16 28Z"
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M24 24L24 12L32 8L32 20L24 24Z"
          fill="#6366F1"
          stroke="#6366F1"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-bold text-lg text-black">PT Citra Waspphutowa</span>
    </div>
  );
};

export default Logo;
