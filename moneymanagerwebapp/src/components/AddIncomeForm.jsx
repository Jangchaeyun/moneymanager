import React, { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./input";

const AddIncome = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="소득원"
        placeholder="예: 급여, 프리랜서, 보너스"
        type="text"
      />
      <Input
        label="카테고리"
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="금액"
        placeholder="e.g., 50000"
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="날짜"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button onClick={handleAddIncome} className="add-btn add-btn-fill">
          소득원 추가
        </button>
      </div>
    </div>
  );
};

export default AddIncome;
