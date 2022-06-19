var ny = "2012";
var nm = "december";
var nd = "12";
var yearObj = {};
var monthObj = {};
var dayObj = {};
const datesToJsonStructure = async (
  dateObj,
  keyType = "year",
  order = "desc"
) => {
  //keytype can be year/monthYear

  let notes = dateObj;
  const n = notes;
  if (n && n.length > 0) {
    return new Promise(async (resolve, reject) => {
      ny = notes[0].year;
      nd = notes[0].day;
      //console.log("ny nd notes", ny, nd, notes);
      n.push(0);
      var res = await yearSort2(n, keyType);
      // console.log("final res", res);
      return resolve(res);

      // yearSort2(n, keyType)
      //   .then((res) => {
      //     return res;
      //   })
      //   .catch((err) => console.log("err", err));
      //return yearSort2(n, keyType);
      //return res;
      // console.log("resolve");
      // return new Promise(function (resolve) {
      //   resolve(yearSort2(n, keyType));
      // });
    });
  }
};
const yearSort2 = async (n, keyType) => {
  //console.log("n", n);
  var yearArr = [];
  for (var i = 0; i < n.length; i++) {
    //console.log("n[i].year", n[i].year);
    //console.log("ny", ny);
    if (n[i].year === ny) {
      yearArr.push(n[i]);
      //console.log("yearArr " + i, yearArr);
    } else {
      yearObj[ny] = yearArr;
      //console.log("yearObj", yearObj);
      ny = n[i].year;
      if (n[i] === 0) {
        //(n.length <= 1)
        // console.log("yearObj2", yearObj);
        var res = await arrangeYM(yearObj, keyType);
        // console.log("res ys2", res);
        return res;

        // const ab = new Promise(function (resolve) {
        //   resolve(arrangeYM(yearObj, keyType));
        //   console.log("yearObj3", yearObj);
        // });
        // console.log("ab", ab);
        // return ab;
      } else {
        return yearSort2(n.slice(i, n.length), keyType);
      }
    }
  }
};
const monthSort2 = async (n) => {
  //console.log("n monthSort2", n);
  var monthArr = [];
  var daySorted = [];
  for (var i = 0; i < n.length; i++) {
    //console.log("n[i].month", n[i].month);
    //console.log("ny", ny);
    if (n[i].month === ny) {
      monthArr.push(n[i]);
      //console.log("monthArr " + i, monthArr);
    } else {
      monthObj[ny] = monthArr;
      //console.log("monthObj", monthObj);
      ny = n[i].month;
      if (n[i] === 0) {
        //(n.length <= 1)
        //console.log("monthObj return", monthObj);
        // daySorted=await daySort2(monthObj)
        // dayObj={}
        return monthObj;
      } else {
        return monthSort2(n.slice(i, n.length));
      }
    }
  }
};
const daySort2 = async (n) => {
  //console.log("n daySort2", n);
  var dateArr = [];
  for (var i = 0; i < n.length; i++) {
    //console.log("n[i].date", n[i].day);
    //console.log("nd", nd);
    if (n[i].day === nd) {
      dateArr.push(n[i]);
      //console.log("dateArr " + i, dateArr);
    } else {
      dayObj[nd] = dateArr;
      //console.log("dayObj", dayObj);
      nd = n[i].day;
      if (n[i] === 0) {
        //(n.length <= 1)
        //console.log("dayObj return", dayObj);

        return dayObj;
      } else {
        return daySort2(n.slice(i, n.length));
      }
    }
  }
};
const arrangeDM = async (monthObj) => {
  //console.log("monthObj", monthObj);
  var months = Object.keys(monthObj);
  var dmObj = {};
  var t = [];
  var dRet = {};
  var keys = [];
  for (var i = 0; i < months.length; i++) {
    //console.log("monthObj[months[i]]", monthObj[months[i]]);
    t = monthObj[months[i]];
    t.push(0);
    dRet = await daySort2(t);
    //console.log("dRet", dRet, Object.keys(dRet));

    keys = Object.keys(dRet);
    //console.log("dRet", dRet, keys);
    for (var j = 0; j < keys.length; j++) {
      if (keys[j] === "undefined") {
        delete dRet[keys[j]];
      }
    }
    dmObj[months[i]] = dRet;
    dayObj = {}; //clear obj after each day
  }
  //console.log("dmObj", dmObj);
  return dmObj;
};

const arrangeYM = async (yearObj, keyType) => {
  //console.log("yearObj", yearObj);
  var years = Object.keys(yearObj);
  var ymObj = {};
  var t = [];
  var mRet = {};
  var dRet = {};
  var keys = [];
  for (var i = 0; i < years.length; i++) {
    //console.log("yearObj[years[i]]", yearObj[years[i]]);
    t = yearObj[years[i]];
    t.push(0);
    mRet = await monthSort2(t);
    //console.log("mRet", mRet, Object.keys(mRet));

    keys = Object.keys(mRet);
    //console.log("mRet", mRet, keys);
    for (var j = 0; j < keys.length; j++) {
      if (keys[j] === "undefined") {
        delete mRet[keys[j]];
      }
    }
    dRet = await arrangeDM(mRet);
    ymObj[years[i]] = dRet;
    monthObj = {}; //clear obj after each month
  }
  //console.log("ymObj", ymObj);
  //console.log("keyType", keyType);
  if (keyType !== "monthYear") {
    // console.log("ymObj", ymObj);
    // var bd = new Promise(function (resolve) {
    //   resolve(ymObj);
    // });
    // console.log("bd", bd);
    // return bd;
    return ymObj;
  } else {
    return myPairing(ymObj);
  }
};

const myPairing = (ymObj) => {
  //console.log("ymObj at mypairing", ymObj);
  var years = Object.keys(ymObj);
  //console.log("years", years);
  var months = [];
  var days = [];
  var myObj = {};
  var dmObj = {};
  //for (var i = 0; i < years.length; i++) {
  for (var i = years.length - 1; i >= 0; i--) {
    //console.log("ymObj[years[i]]", ymObj[years[i]]);
    months = Object.keys(ymObj[years[i]]);
    //console.log("months", months);
    // for (var j = 0; j < months.length; j++) {
    for (var j = months.length - 1; j >= 0; j--) {
      days = Object.keys(ymObj[years[i]][months[j]]);
      // for (var k = 0; k < days.length; k++) {
      for (var k = days.length - 1; k >= 0; k--) {
        dmObj[days[k] + "," + months[j]] = ymObj[years[i]][months[j]][days[k]];
      }
      myObj[months[j] + "," + years[i]] = dmObj;
      dmObj = {}; //ymObj[years[i]][months[j]];
    }
  }
  //console.log("myObj", myObj);
  return myObj;
  //console.log("dmObj", dmObj);
};

exports.datesToJsonStructure = datesToJsonStructure;
