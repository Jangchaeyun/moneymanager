import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Income = () => {
  useUser();
  return <Dashboard activeMenu="소득">This is Income page</Dashboard>;
};

export default Income;
