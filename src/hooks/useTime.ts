import moment from "moment";

const useTime = (createdAt: string): string => {
  const currentDate = new Date();
  const formatedDate: string = moment(createdAt).format();
  const isMoreThan7Days: number = parseInt(moment(createdAt).fromNow());

  const postDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  switch (moment(createdAt).fromNow()) {
    case "a few seconds ago":
      return "1s";
    case "a minute ago":
      return "1m";
    case "an hour ago":
      return "1h";
    case "a day ago":
      return "1d";
    case `${isMoreThan7Days > 7 && isMoreThan7Days} days ago`:
    case "a month ago":
    case `${isMoreThan7Days} months ago`:
    case "a year ago":
    case `${isMoreThan7Days} years ago`:
      return createdAt.includes(currentDate.getFullYear().toString())
        ? postDate.slice(0, -6)
        : postDate;
    default:
      return (
        moment(formatedDate).fromNow().split(" ")[0] +
        moment(formatedDate).fromNow().split(" ")[1].slice(0, 1)
      );
  }
};

export default useTime;
