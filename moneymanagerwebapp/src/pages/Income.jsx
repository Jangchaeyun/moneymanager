import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncome from "../components/AddIncomeForm";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        console.log("Income list", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("소득 내역을 가져오는 데 실패했습니다:", error);
      toast.error(
        error.response?.data?.message ||
          "소득 내역을 가져오는 데 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("소득"),
      );
      if (response.status === 200) {
        console.log("income categories", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("소득 범주를 가져오는 데 실패했습니다:", error);
      toast.error(
        error.data?.message ||
          "해당 카테고리에 대한 소득 카테고리를 가져오는 데 실패했습니다.",
      );
    }
  };

  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    if (!name.trim()) {
      toast.error("이름을 입력해 주세요");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("유효한 금액을 입력해 주세요");
      return;
    }
    if (!date) {
      toast.error("날짜를 선택해 주세요");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (date > today) {
      toast.error("날짜는 미래일 수 없습니다.");
      return;
    }

    if (!categoryId) {
      toast.error("카테고리를 선택해 주세요");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("수입이 성공적으로 추가되었습니다.");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.log("소득 추가 오류", error);
      toast.error(error.response?.data?.message || "소득 추가에 실패했습니다");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="소득">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <button
              className="add-btn"
              onClick={() => setOpenAddIncomeModal(true)}
            >
              <Plus size={15} className="text-lg" /> 소득원 추가
            </button>
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => console.log("deleting the income", id)}
          />

          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="소득원 추가"
          >
            <AddIncome
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
