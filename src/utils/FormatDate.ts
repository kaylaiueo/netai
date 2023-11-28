const FormatDate = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const postDate = date.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });

  const hours = date.toLocaleTimeString([], {
    timeStyle: "short",
    hour12: true,
  });

  return postDate + " · " + hours;
};

export default FormatDate;
