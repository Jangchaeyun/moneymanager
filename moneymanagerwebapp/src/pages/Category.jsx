import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "./CategoryList";

const Category = () => {
  useUser();
  return (
    <Dashboard activeMenu="카테고리">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">모든 카테고리</h2>
          <button className="add-btn flex items-center gap-1">
            <Plus size={15} />
            카테고리 추가
          </button>
        </div>
        <CategoryList />
      </div>
    </Dashboard>
  );
};

export default Category;
