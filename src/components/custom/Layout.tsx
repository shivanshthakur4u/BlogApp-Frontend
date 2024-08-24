import Home from "src/pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./Auth/Auth";
import Navbar from "./Navbar";


const Layout:React.FC =()=>{
    const location = useLocation();
    const isAuthPage = location.pathname.includes("auth");
    return (
        <div>
        {!isAuthPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signin" element={<Auth signin={true} />} />
          <Route path="/auth/signup" element={<Auth signin={false} />} />
          {/* <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </div>
    )
}

export default Layout;