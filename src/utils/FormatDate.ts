import moment from "moment";

const FormatDate = (createdAt: Date): string => {
  const formatedDate = moment(createdAt).format();
  const date = new Date(formatedDate);

  const postDate = date.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });

  const hours = date.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  return postDate + " · " + hours;
};

export default FormatDate;
