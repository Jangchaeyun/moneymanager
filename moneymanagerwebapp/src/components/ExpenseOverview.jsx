import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import CustomLineChart from "./CustomLineChart";
import { prepareIncomeLineChartData } from "../util/util";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">비용 개요</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            시간 경과에 따른 지출 추세를 추적하고 돈이 어디에 쓰이는지
            파악하세요.
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          <Plus size={15} className="text-lg" />
          비용 추가
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
