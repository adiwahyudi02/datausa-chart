export const Spinner = () => (
  <div
    className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-white opacity-75 rounded-xl"
    role="status"
  >
    <svg
      className="w-12 h-12 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      fill="none"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="gray"
        strokeWidth="5"
        strokeLinecap="round"
        className="opacity-25"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="gray"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="31.4159 31.4159"
        strokeDashoffset="6.28319"
        className="opacity-75"
      />
    </svg>
  </div>
);
