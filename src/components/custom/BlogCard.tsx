import { MoveRight } from "lucide-react";

const BlogCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 sm:max-w-64 w-full">
      <div className="rounded-lg ">
        <img
          src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
          alt="image-1"
          className=" rounded-3xl h-[260px]  w-full bg-cover"
        />
      </div>
      <div className="flex items-center justify-center bg-red-50 rounded-md w-fit p-2">
        <p className="text-red-600 text-xs font-bold">category</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className=" text-gray-700 text-xl font-bold">
          How To Choose Best Bike For Spring In Australia?
        </h2>
        <p className="flex gap-1 items-end text-gray-500">
          How To Choose Best Bike For Spring In Australia shop how to choose
          <MoveRight size={16} />
        </p>
      </div>
      <div className="flex gap-1.5 items-center">
          <div>
            <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2163"  
             alt="image-2" className="w-7 h-7 rounded-md" />
          </div>
          <div className="flex flex-col ">
           <p className="font-bold text-xs">
            By: Saurabh
           </p>
           <p className="font-medium text-gray-400 text-[10px]">
            posted: 12/10/22
           </p>
          </div>
      </div>
    </div>
  );
};

export default BlogCard;
