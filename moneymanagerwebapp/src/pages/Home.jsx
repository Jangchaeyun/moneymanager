import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Home = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu="대시보드">This is home page</Dashboard>
    </div>
  );
};

export default Home;
