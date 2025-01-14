const Button = ({ onClick, btnText }) => {
    return (
      <div className="flex items-center justify-center">
        <button
          className="w-[150px] px-5 bottom-5 h-10 bg-zinc-400 absolute font-bold flex items-center justify-center  rounded-md" 
          onClick={onClick}
        >
          {btnText}
        </button>
      </div>
    );
  };
  
  export default Button;