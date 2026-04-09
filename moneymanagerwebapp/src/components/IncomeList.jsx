import { Download, Mail } from "lucide-react";
import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">소득원</h5>
        <div className="flex items-center justify-end gap-2">
          <button className="card-btn">
            <Mail size={15} className="text-base" onClick={onEmail} />
            이메일
          </button>
          <button className="card-btn">
            <Download size={15} className="text-base" onClick={onDownload} />
            다운로드
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="소득"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
