import { BarChart2, Feather, Plus, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import styles from "../../styles/Navbar.module.css";
import { useState } from "react";
const Navbar: React.FC = () => {
  const signedIn = false;

  // adding the states
  const [isActive, setIsActive] = useState(false);
  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  };
  return (
    <>
      <nav className="w-full bg-white shadow-md px-5 py-2 flex justify-between sm:gap-5 gap-10 items-center h-[70px] fixed top-0 z-50">
        <a
          className="flex gap-2 justify-center text-indigo-700 items-center"
          href="/"
        >
          <Feather className="w-5 h-5" />
          <h2 className="text-center font-bold text-xl">BlogApp</h2>
        </a>

        <div className="flex md:gap-10 gap-5 items-center">
          <label className="flex items-center gap-2 border-2 py-0.5 px-5 rounded-lg focus-within:border-primary group input-wrapper">
            <Search className="h-5 w-5 searchicon" />
            <Input
              type="text"
              placeholder="Serach Blogs by title"
              className="grow border-none focus-visible:ring-white text-gray-500
               outline-none focus:outline-none placeholder:text-gray-300"
            />
          </label>
          {signedIn ? (
            <div>user</div>
          ) : (
            <button
              className="border rounded-md px-5 py-1 text-indigo-600
             border-indigo-600 hover:bg-indigo-700 hover:text-white hidden sm:block"
            >
              Signin
            </button>
          )}
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
          <div className={`${styles.navMenu} ${isActive ? styles.active : ""} `}>
            <p>hjwhdw</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
