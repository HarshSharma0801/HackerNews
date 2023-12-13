import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
const Display = () => {
  const [data, setdata] = useState([]);

  const MakeYear = (date) => {
    const data = new Date(date);
    const currentDate = new Date();
    return currentDate.getFullYear() - data.getFullYear();
  };

  const [PageCount, SetPageCount] = useState(0);
  const [ActivePage, SetActivePage] = useState(0);

  const Getdata = async () => {
    try {
      await axios
        .get("http://hn.algolia.com/api/v1/search", {
          params: {
            query: "sex",
            page: ActivePage,
          },
        })
        .then((res) => {
          console.log(res.data);
          SetPageCount(res.data.nbPages);
          setdata(res.data.hits);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getdata();
  }, [ActivePage]);

  const PageChanged = ({ selected }) => {
    SetActivePage(parseInt(selected) + 1);
  };

  return (
    <>
      <div className="flex justify-around md:justify-around items-center  w-[100%] text-white bg-back p-4 ">
        <div>
          <h1 className="text-xl md:text-3xl  cursor-pointer">HackerNews</h1>
        </div>
        <div className="flex gap-1 px-1 w-[50%] text-sm justify-center md:hidden">
          <div className="md:hidden flex  justify-center rounded-2xl bg-white ">
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
                className="w-7 h-7 text-back"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="hidden md:flex  justify-center rounded-2xl bg-white ">
          <input
            type="text"
            className="text-black text-xl rounded-2xl w-[65vw] outline-none  font-semibold p-3"
            placeholder="search"
          />
          <div className="text-center flex justify-center items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-back"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className=" hidden md:flex gap-8 p-2 items-center text-center justify-center"></div>
      </div>
      <div className="p-2  md:p-5 flex flex-col gap-2">
        {data &&
          data.map((main) => {
            return (
              <>
                <div key={main.objectID}>
                  <div className="flex flex-col bg-gray-300 shadow-lg rounded-xl p-2 md:p-4 cursor-pointer gap-1">
                    <div className="flex md:flex-row flex-col gap-1 text-lg">
                      <Link to={`/item/${main.objectID}`}>
                        <h1 className=" cursor-pointer hover:underline flex-1">
                          {main.title}
                        </h1>
                      </Link>
                      <div>
                        <h1 className=" text-sm md:text-lg text-gray-500">
                          (
                          <a href={main.url} target="_blank">
                            {main.url}
                          </a>
                          )
                        </h1>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div>
                        <h1 className="text-sm text-gray-600">
                          {main.points} points |
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-sm text-gray-600">
                          {" "}
                          {main.author} |
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-sm text-gray-600">
                          {" "}
                          {MakeYear(main.created_at)} years ago |
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-sm text-gray-600">
                          {" "}
                          {main.num_comments} comments{" "}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div className="pb-5">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={PageCount}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={PageChanged}
          pageLinkClassName="p-[5px]   md:p-2 border-[1.9px] border-back rounded-xl text-white hover:text-white hover:bg-back"
          containerClassName="flex justify-center gap-2 md:text-lg text-white text-sm"
          previousLinkClassName="p-[4px] md:p-2 border-back border-[1.9px] rounded-xl text-white hover:bg-back hover:text-white"
          nextLinkClassName="p-[4px] md:p-2 border-back border-[1.9px] rounded-xl text-white hover:bg-back hover:text-white"
          activeClassName="text-back "
        />
      </div>
    </>
  );
};

export default Display;
