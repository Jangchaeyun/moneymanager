import { Download, LoaderCircle, Mail } from "lucide-react";
import React, { useState } from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);
  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">소득원</h5>
        <div className="flex items-center justify-end gap-2">
          <button disabled={loading} className="card-btn" onClick={handleEmail}>
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                이메일 보내는 중...
              </>
            ) : (
              <>
                <Mail size={15} className="text-base" />
                이메일 보내기
              </>
            )}
          </button>
          <button
            disabled={loading}
            className="card-btn"
            onClick={handleDownload}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                다운로드 중...
              </>
            ) : (
              <>
                <Download size={15} className="text-base" />
                다운로드
              </>
            )}
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
