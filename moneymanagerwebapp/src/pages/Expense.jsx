import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Modal from "../components/Modal.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import ExpenseList from "../components/ExpenseList.jsx";

const Expense = () => {
  useUser();
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(
        `${API_ENDPOINTS.GET_ALL_EXPENSE}`,
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("지출 내역을 가져오는 데 실패했습니다.:", error);
      toast.error("지출 내역을 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("비용"),
      );
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("비용 카테고리를 가져오는 데 실패했습니다.", error);
      toast.error("비용 카테고리를 가져오는 데 실패했습니다.");
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, categoryId, amount, date, icon } = expense; // Changed 'category' to 'categoryId'

    if (!name.trim()) {
      toast.error("이름은 필수 입력 사항입니다.");
      return;
    }

    if (!categoryId) {
      toast.error("카테고리는 필수 입력 사항입니다.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("금액은 0보다 큰 유효한 숫자여야 합니다.");
      return;
    }

    if (!date) {
      toast.error("날짜는 필수 입력 사항입니다.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("날짜는 미래의 날짜일 수 없습니다.");
      return;
    }

    try {
      await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        categoryId,
        amount: Number(amount),
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("지출이 성공적으로 추가되었습니다.");
      fetchExpenseDetails();
      fetchExpenseCategories();
    } catch (error) {
      console.error(
        "비용 추가 중 오류 발생:",
        error.response?.data?.message || error.message,
      );
      toast.error(error.response?.data?.message || "지출 추가에 실패했습니다.");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("지출 내역이 성공적으로 삭제되었습니다.");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "지출 내역 삭제 중 오류 발생:",
        error.response?.data?.message || error.message,
      );
      toast.error(
        error.response?.data?.message || "지출 내역 삭제에 실패했습니다.",
      );
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        {
          responseType: "blob",
        },
      );

      let filename = "expense_details.xlsx";

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("지출 내역이 성공적으로 다운로드되었습니다!");
    } catch (error) {
      console.error("지출 내역 다운로드 중 오류 발생:", error);
      toast.error("지출 내역 다운로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("이메일이 발송되었습니다");
      }
    } catch (e) {
      console.error("지출 내역 이메일 발송 중 오류 발생:", e);
      toast.error("지출 내역 이메일 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="비용">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={handleAddExpense}
              categories={categories}
            />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense detail?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
