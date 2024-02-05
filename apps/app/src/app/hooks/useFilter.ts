const useFilter = (data: any[], filter: string) => {
  return data.filter((item) => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  });
};

export default useFilter;
