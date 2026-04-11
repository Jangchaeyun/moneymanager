import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

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
    console.log("넘어온 데이터", income);
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

  const deleteIncome = async (id) => {
    setLoading(true);
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELTE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("소득원이 성공적으로 삭제되었습니다.");
      fetchIncomeDetails();
    } catch (error) {
      console.log("소득원 삭제에 실패했습니다.", error);
      toast.error(
        error.response?.data?.message || "소득원 삭제에 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        { responseType: "blob" },
      );
      let filename = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("소득 내역이 Excel 파일로 다운로드되었습니다.");
    } catch (error) {
      console.error("소득 내역 다운로드에 실패했습니다.", error);
      toast.error(
        error.response?.data?.message || "소득 내역 다운로드에 실패했습니다.",
      );
    }
  };

  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if (response.status === 200) {
        toast.success("소득 내역이 이메일로 전송되었습니다.");
      }
    } catch (error) {
      console.error("수입 내역 이메일 전송 중 오류가 발생했습니다:", error);
      toast.error(
        error.response?.data?.message ||
          "소득 내역 이메일 전송에 실패했습니다.",
      );
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
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          />

          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="소득원 추가"
          >
            <AddIncomeForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="소득원 삭제"
          >
            <DeleteAlert
              content="정말로 이 소득원을 삭제하시겠습니까?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
