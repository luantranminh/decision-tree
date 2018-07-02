var myData;

//setup table
jQuery("#demo-2").tabularInput({
  rows: 9,
  columns: 6,
  animate: true,
  columnHeads: [
    "Số thứ tự",
    "Tên người",
    "Độ dài tóc (cm)",
    "Cân nặng (kg)",
    "Tuổi",
    "Giới tính"
  ]
});

var data = [
  { tên: "Tuấn", tóc: 0, cânNặng: 113, tuổi: 36, giớiTính: "nam" },
  { tên: "Phương", tóc: 10, cânNặng: 68, tuổi: 34, giớiTính: "nữ" },
  { tên: "Phương", tóc: 2, cânNặng: 40, tuổi: 10, giớiTính: "nam" },
  { tên: "Phương", tóc: 6, cânNặng: 35, tuổi: 8, giớiTính: "nữ" },
  { tên: "Trâm", tóc: 4, cânNặng: 9, tuổi: 1, giớiTính: "nữ" },
  { tên: "Thanh", tóc: 1, cânNặng: 77, tuổi: 70, giớiTính: "nam" },
  { tên: "Thanh", tóc: 8, cânNặng: 72, tuổi: 41, giớiTính: "nữ" },
  { tên: "Trúc", tóc: 10, cânNặng: 81, tuổi: 38, giớiTính: "nam" },
  { tên: "Ngân", tóc: 6, cânNặng: 90, tuổi: 45, giớiTính: "nam" }
];

myData = data;
//set id for each row

function setId() {
  var tid = document.querySelector("#demo-2").querySelectorAll("tr");

  for (var i = 1; i < tid.length; i++) {
    tid[i].cells[0].getElementsByTagName("input")[0].value = i;
    tid[i].cells[0]
      .getElementsByTagName("input")[0]
      .setAttribute("disabled", "disabled");
  }
}
let count = 1;
function setMatrix() {
  var tid = document.querySelector("#demo-2").querySelectorAll("tr");
  for (let i = 1; i < tid.length; i++) {
    for (let j = 1; j < tid[i].getElementsByTagName("td").length; j++) {
      count = 1;
      Object.keys(data[i - 1]).forEach(e => {
        if (count == j) {
          tid[i].cells[j].getElementsByTagName("input")[0].value =
            myData[i - 1][e];
        }
        count++;
      });
    }
  }
}

setMatrix();
setId();

function addRow() {
  $("#demo-2").tabularInput("addRow");
  setId();
}

function setItem() {
  data = [];
  var tid = document.querySelector("#demo-2").querySelectorAll("tr");
  for (let i = 1; i < tid.length; i++) {
    let tempObj = new Object();
    for (let j = 1; j < tid[i].getElementsByTagName("td").length; j++) {
      switch (j) {
        case 1:
          tempObj.tên = tid[i].cells[j].getElementsByTagName("input")[0].value;
          break;
        case 2:
          tempObj.tóc = +tid[i].cells[j].getElementsByTagName("input")[0].value;
          break;
        case 3:
          tempObj.cânNặng = +tid[i].cells[j].getElementsByTagName("input")[0].value;
          break;
        case 4:
          tempObj.tuổi = +tid[i].cells[j].getElementsByTagName("input")[0].value;
          break;
        case 5:
          tempObj.giớiTính = tid[i].cells[j].getElementsByTagName("input")[0].value;
          break;
        default:
          break;
      }
    }
    data.push(tempObj);
  }
  var config = {
    trainingSet: data,
    categoryAttr: "giớiTính",
    ignoredAttributes: ["tên"]
  };
  var decisionTree = new dt.DecisionTree(config);
  var displayTreeDiv = document.getElementById("displayTree");
  displayTreeDiv.innerHTML = treeToHtml(decisionTree.root);
}

// Configuration
var config;
function myConfig() {
  config = {
    trainingSet: data,
    categoryAttr: "giớiTính",
    ignoredAttributes: ["tên"]
  };
}

myConfig();

// Building Decision Tree
var decisionTree = new dt.DecisionTree(config);

// Testing Decision Tree and Random Forest
// var comic = { person: "Comic guy", hairLength: 8, weight: 290, age: 38 };

// var decisionTreePrediction = decisionTree.predict(comic);

var displayTreeDiv = document.getElementById("displayTree");

displayTreeDiv.innerHTML = treeToHtml(decisionTree.root);

function treeToHtml(tree) {
  if (tree.category) {
    return [
      "<ul>",
        "<li>",
          '<a href="">',tree.category,"</a>",
        "</li>",
      "</ul>"].join("");
  }
  return [
    "<ul>",
      "<li>",
        '<a href=""><b>',tree.attribute," ",tree.predicateName," ",tree.pivot," ?</b></a>",
      "<ul>",
        "<li>",
          '<a href="">đúng</a>',
            treeToHtml(tree.match),
        "</li>",
        "<li>",
          '<a href="">sai</a>',
            treeToHtml(tree.notMatch),
        "</li>",
      "</ul>",
      "</li>",
    "</ul>"
  ].join("");
}
