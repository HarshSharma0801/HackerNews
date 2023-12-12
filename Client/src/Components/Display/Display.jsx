import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Display = () => {
  const [data, setdata] = useState([]);




    const MakeYear = (date)=>{
        const data = new Date(date);
        const currentDate = new Date();
                 return currentDate.getFullYear() - data.getFullYear();
    }
   
  
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
      <div className="p-2  md:p-5 flex flex-col gap-2">
        {data &&
          data.map((main) => {
            return (
              <>
                <div>
                  <div className="flex flex-col bg-gray-300 shadow-lg rounded-xl p-2 md:p-4 cursor-pointer gap-1">
                    <div className="flex gap-1 text-lg">
                      <div>
                        <h1 className=" cursor-pointer hover:underline flex-1">{main.title}</h1>
                      </div>
                      <div>
                        <h1 className=" text-gray-500">
                          (<a href={main.url} target="_blank" >{main.url}</a>)
                        </h1>
                      </div>
                    </div>
                    <div className="flex gap-1">
                    <div>
                        <h1 className="text-sm text-gray-600">{main.points} points |</h1>
                    </div>
                    <div>
                        <h1 className="text-sm text-gray-600"> {main.author}  |</h1>
                    </div>
                    <div>
                        <h1 className="text-sm text-gray-600"> {MakeYear(main.created_at)} years ago  |</h1>
                    </div>
                    <div>
                        <h1 className="text-sm text-gray-600"> {main.num_comments} comments </h1>
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
            pageLinkClassName="p-[5px]   md:p-2 border-[1.9px] border-back rounded-xl hover:text-white hover:bg-back"
            containerClassName="flex justify-center gap-2 md:text-lg text-sm"
            previousLinkClassName="p-[4px] md:p-2 border-back border-[1.9px] rounded-xl hover:bg-back hover:text-white"
            nextLinkClassName="p-[4px] md:p-2 border-back border-[1.9px] rounded-xl hover:bg-back hover:text-white"
            activeClassName="text-back "
          />
        </div>
    </>
  );
};

export default Display;
