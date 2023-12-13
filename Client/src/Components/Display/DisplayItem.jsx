import Header from "../Header";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
const ParentItem = () => {
  const id = useParams();

  const [data, setdata] = useState();
  const [children, setchildren] = useState([]);

  const getItem = async () => {
    const link = "https://hn.algolia.com/api/v1/items/" + id.id;
    try {
      await axios.get(link).then((res) => {
        if (res) {
          console.log(res.data.children);
          setchildren(res.data.children);
          setdata(res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItem();
  }, []);



  return (
    <>
    <div className="h-screen overflow-x-hidden bg-black">
         <Header />
         <div className="px-2">
         <RecursiveItem data={data} children={children}/>

         </div>
        </div>
   
      
    </>
  );
};


const RecursiveItem = ({data , children})=>{

    if (children && children.length > 0) {
        return (
          <div className="h-screen bg-black">
            {/* Render the current object */}
            <StarterItem data={data} children={children} />
            {/* Recursively map each child object */}
            <div className="p-5">
            <h1 className="text-white">Comments : </h1>

            </div>
            <div className="flex flex-col gap-6">
            {data.children.map((child , smallchild ) => (
              <ChildrenItem data={child} children={smallchild} />
            ))}
            </div>
           
          </div>
        );
      } else {
        // If no "children" field, just render the current object
        return <StarterItem data={data} children={children} />;
      }
    
}



const ChildrenItem = ({data , children})=>{
   
    const MakeYear = (date) => {
        const data = new Date(date);
        const currentDate = new Date();
        const monthNumber = data.getMonth();
        let month ;
        switch (monthNumber) {
            case 1:
                month = 'Jan';
              break;
            case 2:
                month = 'Feb';
              break;
            case 3:
                month = 'Mar';
              break;
            case 4:
                month = 'Apr';
              break;
            case 5:
                month = 'May';
              break;
            case 6:
                month = 'Jun';
              break;
            case 7:
                month = 'Jul';
              break;
            case 8:
                month = 'Aug';
              break;
            case 9:
                month = 'Sep';
              break;
            case 10:
                month = 'Oct';
              break;
            case 11:
                month = 'Nov';
              break;
            case 12:
                month = 'Dec';
              break;
            default:
                month = ('Invalid month number');
              break;
          }
        const year = data.getFullYear();
        const day = data.getDay();
        return month+' '+day+', '+year;
      };

    return <>
    
    <div>
        <div className="flex  flex-col  bg-gray-300 border border-gray-200 shadow-lg rounded-xl p-2 md:px-6 cursor-pointer gap-1">
          <div className="flex md:flex-row flex-col gap-1 text-lg">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                />
              </svg>

              <h1 className=" cursor-pointer text-sm text-gray-500 hover:underline flex-1">
             <h1>{}</h1> {data && data.author} on  {MakeYear(data && data.created_at)} 
              </h1>
            </div>
            
          </div>
          <div className="flex text-lg text-black gap-1 md:gap-5">
           
            <div>
              {data && data.text}
            </div>

           
            
          
          </div>
          {children  && data.children.map(child=>{
            return <>
            <ChildrenItem data={child} children={data.children} />
            </>
          })}
        </div>
      </div>
    </>
}




const StarterItem = ({data , children})=>{

    const MakeYear = (date) => {
        const data = new Date(date);
        const currentDate = new Date();
        return currentDate.getFullYear() - data.getFullYear();
      };

    return <>
    
    <div>
        <div className="flex flex-col bg-gray-300 shadow-lg rounded-xl p-2 md:p-4 cursor-pointer gap-1">
          <div className="flex md:flex-row flex-col gap-1 text-lg">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-7 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                />
              </svg>

              <h1 className=" cursor-pointer hover:underline flex-1">
                {data && data.title}
              </h1>
            </div>
            <div>
              <h1 className=" text-sm md:text-lg text-gray-500">
                (
                <a href={data && data.url} target="_blank">
                  {data && data.url}
                </a>
                )
              </h1>
            </div>
          </div>
          <div className="flex gap-1 md:gap-5">
            <div>
              <h1 className="text-sm text-gray-600">
                {data && data.points} points    |
              </h1>
            </div>
            <div>
              <h1 className="text-sm text-gray-600">
                {" "}
                {data && data.author}    |
              </h1>
            </div>
            <div>
              <h1 className="text-sm text-gray-600">
                {" "}
                {MakeYear(data && data.created_at)} years ago |
              </h1>
            </div>
            <div>
              <h1 className="text-sm text-gray-600">
                {" "}
                {children && children.length} comments{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
}
export default ParentItem;
