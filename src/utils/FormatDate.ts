const FormatDate = (createdAt: number): string => {
  const date = new Date(createdAt);

  const postDate = date.toLocaleDateString([], {
    dateStyle: "medium",
  });

  const hours = date.toLocaleTimeString([], {
    timeStyle: "short",
  });

  return postDate + " · " + hours;
};

export default FormatDate;
