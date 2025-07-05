import React from "react";
import Loading from "../../components/Loading";
import ResultTable from "../../components/ResultTable";

function StudentResult() {
  return (
    <div className="w-screen h-full text-color-text-1 text-[80px] font-bold bg-color-background px-10 py-6">
          <h3 className="max-w-2xl mb-8 text-4xl font-extrabold tracking-tight">
            Quiz History
          </h3>
          <ResultTable/>
    </div>
  );
}

export default StudentResult;
