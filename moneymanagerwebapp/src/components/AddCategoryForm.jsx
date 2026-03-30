import React, { useEffect, useState } from "react";
import Input from "./input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "소득",
    icon: "",
  });
  const categoryTypeOptions = [
    { value: "소득", label: "소득" },
    { value: "비용", label: "비용" },
  ];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "소득", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="카테고리 이름"
        placeholder="예: 프리랜서, 급여, 식료품"
        type="text"
      />

      <Input
        label="카테고리 타입"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="add-btn add-btn-fill"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "업데이트 중..." : "추가 중..."}
            </>
          ) : (
            <>{isEditing ? "카테고리 업데이트" : "카테고리 추가"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
