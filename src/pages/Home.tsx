import BlogCard from "src/components/custom/BlogCard";

const Home: React.FC = () => {
  return (
    <div
      className="py-28 px-10 grid 2xl:grid-cols-5 lg:grid-cols-4
         md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-20"
    >
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};

export default Home;
