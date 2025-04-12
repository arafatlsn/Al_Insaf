const NotFoundData = () => {
  return (
    <div className="py-[4rem] flex items-center justify-center gap-[6px] bg-foreground rounded-[10px] text-failed cShadow">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-slash-icon lucide-circle-slash"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="9" x2="15" y1="15" y2="9" />
        </svg>
      </span>
      <h5 className="text-[14px]">No Data</h5>
    </div>
  );
};

export default NotFoundData;
