const FormatNumber = (value: number) => {
  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });

  return value > 999 ? formatter.format(value) : value;
};

export default FormatNumber;
