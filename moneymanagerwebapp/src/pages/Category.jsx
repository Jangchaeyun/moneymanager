import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("카테고리 이름은 필수 입력 사항입니다.");
      return;
    }

    const isDuplicate = categoryData.some((category) => {
      category.name.toLowerCase() === name.trim().toLowerCase();
    });

    if (isDuplicate) {
      toast.error("카테고리 이름이 이미 존재합니다.");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status === 201) {
        toast.success("카테고리가 성공적으로 추가되었습니다.");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("카테고리 추가 중 오류 발생: ", error);
      toast.error(
        error.response?.data?.message || "카테고리를 추가하는 데 실패했습니다.",
      );
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory;
    if (!name.trim()) {
      toast.error("카테고리 이름은 필수 입력 사항입니다.");
      return;
    }

    if (!id) {
      toast.error("업데이트에 필요한 카테고리 ID가 누락되었습니다.");
      return;
    }

    try {
      const response = await axiosConfig.put(
        API_ENDPOINTS.UPDATE_CATEOGRY(id),
        { name, type, icon },
      );
      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
      toast.success("카테고리가 성공적으로 업데이트되었습니다.");
      fetchCategoryDetails();
    } catch (error) {
      console.error(
        "카테고리 업데이트 오류:",
        error.response?.data?.message || error.message,
      );
      toast.error(
        error.response?.data?.message || "카테고리 업데이트에 실패했습니다.",
      );
    }
  };

  return (
    <Dashboard activeMenu="카테고리">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">모든 카테고리</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="add-btn flex items-center gap-1"
          >
            <Plus size={15} />
            카테고리 추가
          </button>
        </div>
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />

        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="카테고리 추가"
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => {
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          title="카테고리 업데이트"
        >
          <AddCategoryForm
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
