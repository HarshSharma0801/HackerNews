const Header = () => {
  return (
    <>
      <div className="flex justify-between md:justify-around items-center  w-[100%] text-white bg-black p-4 ">
        <div>
          <h1
           
            className="text-3xl  cursor-pointer"
          >
            BidRush
          </h1>
        </div>
        <div className="flex gap-1 justify-center md:hidden">
        

          <div>
            <svg
             
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
        <div className="hidden md:flex  justify-center rounded-2xl bg-white ">
          <input
            type="text"
            className="text-black text-xl rounded-2xl w-[35vw] outline-none  font-semibold p-3"
            placeholder="search"
          />
          <div className="text-center flex justify-center items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className=" hidden md:flex gap-8 p-2 items-center text-center justify-center">
       
          

          <div>
            <button className="p-3 px-6 rounded-full  border border-white bg-black hover:text-black hover:bg-white">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
