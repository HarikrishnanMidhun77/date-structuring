const dateSort = require("./index");
const notesSample = [
  {
    month: "december",
    year: "2001",
    day: "12",
    sentence: ["abcd"],
  },
  {
    month: "december",
    year: "1999",
    day: "12",
    sentence: ["abcd2"],
  },
  {
    month: "april",
    year: "2021",
    day: "02",
    sentence: ["abcd3"],
  },
  {
    month: "may",
    year: "2022",
    day: "02",
    sentence: ["abcd4"],
  },
  {
    month: "april",
    year: "2022",
    day: "02",
    sentence: ["abcd4"],
  },
  0,
];
test(
  "should first",
  dateSort.datesToJsonStructure(notesSample, (keyType = "yearMonth"))
);
