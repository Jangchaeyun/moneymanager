import React, { useState } from "react";

const AddCategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });
  const categoryTypeOptions = [
    { value: "income", label: "소득" },
    { value: "expense", label: "비용" },
  ];
  return (
    <div className="p-4">
      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
      />
    </div>
  );
};

export default AddCategoryForm;
