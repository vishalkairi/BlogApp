import { Outlet } from "react-router-dom";
import Header from "../headerComponent/Header";

const layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};
export default layout;
