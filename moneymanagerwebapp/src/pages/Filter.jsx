import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Filter = () => {
  useUser();
  return <Dashboard activeMenu="필터">This is Filter page</Dashboard>;
};

export default Filter;
