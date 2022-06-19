# Date-Structuring

Organizing large amount of semi-structured data with respect to dates is not an easy task. This library helps to organize JSON data with the order of dates specified.

### Installing

Install the package

```
npm install date-structuring
```

Import the function

```
const { datesToJsonStructure } = require("date-structuring");
```

Example usage

```
//input data
const sampleData = [
  {
    month: "december",
    year: "2001",
    day: "12",
    data: { sentence: "s1" },
  },
  {
    month: "april",
    year: "2021",
    day: "02",
    data: 12,
  },
  {
    month: "may",
    year: "2022",
    day: "02",
    data: "abcd4",
  },
  {
    month: "april",
    year: "2022",
    day: "02",
    data: ["abcd4", "abc"],
  },
];
// async function
const sampleFunction = async () => {
  var res = await datesToJsonStructure(notesSample);
  console.log("res", res);
  return res;
};

// function call
sampleFunction();
```

Sample Output

```
{
  "2001": {
    "december": {
      "12": [
        {
          "month": "december",
          "year": "2001",
          "day": "12",
          "data": {
            "sentence": "s1"
          }
        }
      ]
    }
  },
  "2021": {
    "april": {
      "02": [
        {
          "month": "april",
          "year": "2021",
          "day": "02",
          "data": 12
        }
      ]
    }
  },
  "2022": {
    "may": {
      "02": [
        {
          "month": "may",
          "year": "2022",
          "day": "02",
          "data": "abcd4"
        }
      ]
    },
    "april": {
      "02": [
        {
          "month": "april",
          "year": "2022",
          "day": "02",
          "data": [
            "abcd4",
            "abc"
          ]
        }
      ]
    }
  }
}
```

Parameters

```
// (keyType = "monthYear") for month based structure
 var res = await datesToJsonStructure(notesSample,(keyType = "monthYear"));

 output:

 {
  "april,2022": {
    "02,april": [
      {
        "month": "april",
        "year": "2022",
        "day": "02",
        "data": [
          "abcd4",
          "abc"
        ]
      }
    ]
  },
  "may,2022": {
    "02,may": [
      {
        "month": "may",
        "year": "2022",
        "day": "02",
        "data": "abcd4"
      }
    ]
  },
  "april,2021": {
    "02,april": [
      {
        "month": "april",
        "year": "2021",
        "day": "02",
        "data": 12
      }
    ]
  },
  "december,2001": {
    "12,december": [
      {
        "month": "december",
        "year": "2001",
        "day": "12",
        "data": {
          "sentence": "s1"
        }
      }
    ]
  }
}

```

## Running the tests

npm run test

## Authors

- **Harikrishnan Midhun** - [github](https://github.com/HarikrishnanMidhun77)

## License

This project is licensed under the MIT License
