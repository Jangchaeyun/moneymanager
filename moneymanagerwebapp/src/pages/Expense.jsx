import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Expense = () => {
  useUser();
  return <Dashboard activeMenu="비용">This is Expense page</Dashboard>;
};

export default Expense;
