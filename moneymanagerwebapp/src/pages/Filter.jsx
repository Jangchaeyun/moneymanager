import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Filter = () => {
  useUser();
  return (
    <Dashboard activeMenu="필터">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">거래 필터링</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold ">필터를 선택하세요</h5>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
