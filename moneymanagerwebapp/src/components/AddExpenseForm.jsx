import { useState, useEffect } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";

// Add 'categories' prop
const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name,
    categoryId: "",
    amount: "",
    date: "",
    icon: "",
  });

  useEffect(() => {
    if (categories && categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, expense.categoryId]);

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: `${cat.name}`,
  }));

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="비용 출처"
        placeholder="예: 전기, 와이파이"
        type="text"
      />

      <Input
        label="카테고리"
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="비용"
        placeholder="예: 50000"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="날짜"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          비용 추가
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
