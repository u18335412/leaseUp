import { useState } from "react";

const useSort = () => {
  const [sort, setSort] = useState({ by: "id", order: "asc" });

  const handleSort = (by: string) => {
    setSort((prev) => ({
      by,
      order: prev.by === by && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return {
    sort,
    handleSort,
  };
};

export default useSort;
