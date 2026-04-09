import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">소득 개요</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            시간 경과에 따른 수입을 추적하고 소득 추세를 분석하세요.
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <Plus size={15} className="text-lg" /> 소득원 추가
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
