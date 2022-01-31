var edit_index = 0;
var check_edit = null;
function validation() {
  var fname = document.getElementById("firstName").value;
  var sname = document.getElementById("secondName").value;
  var ag = document.getElementById("age").value;

  let isError = false;
  if (fname.length === 0) {
    document.getElementById("firstNameSpan").innerHTML =
      "Fill the First Name";
    isError = true;
  } else if (fname.length < 2 || fname.length > 20) {
    document.getElementById("firstNameSpan").innerHTML =
      "length must be in between 2-20 ";
    isError = true;
  } else if (!isNaN(fname)) {
    document.getElementById("firstNameSpan").innerHTML =
      "Only characters are allowed ";
    isError = true;
  } else {
    document.getElementById("firstNameSpan").innerHTML = "";
  }

  if (sname.length == 0) {
    document.getElementById("secondNameSpan").innerHTML =
      "Fill the Second Name";
    isError = true;
  } else if (sname.length < 2 || sname.length > 20) {
    document.getElementById("secondNameSpan").innerHTML =
      "length must be in between 2-20 ";
    isError = true;
  } else if (!isNaN(sname)) {
    document.getElementById("secondNameSpan").innerHTML =
      "Only characters are allowed ";
    isError = true;
  } else {
    document.getElementById("secondNameSpan").innerHTML = "";
  }

  if (!isError) {
    AddRow();
    return false;
  } else return false;
}
// calling the local storage
function editRow(index) {
  var ed = localStorage.users;
  var ed_row = JSON.parse(ed);
  var data_edit = ed_row[index];

  document.getElementById("firstName").value = data_edit.firstname;
  document.getElementById("secondName").value = data_edit.secondname;
  document.getElementById("age").value = data_edit.age;
  edit_index = 1;
  check_edit = index;
}
// Adding and editing the data to local Storage
function AddRow() {
  var x = 0;
  var list1 = [];
  var list2 = [];
  var list3 = [];

  list1[x] = document.getElementById("firstName").value;
  list2[x] = document.getElementById("secondName").value;
  list3[x] = document.getElementById("age").value;

  let records = new Array();
  records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  records.push({
    firstname: list1,
    secondname: list2,
    age: list3,
  });

  if (edit_index) {
    var ed = localStorage.users;
    var ed_row = JSON.parse(ed);

    ed_row[check_edit] = records[records.length - 1];

    localStorage.users = JSON.stringify(ed_row);
  } else {
    edit_index = null;
    localStorage.setItem("users", JSON.stringify(records));
  }

  showData();
  onClear();
}

// Send data to the table
function showData() {
  document.getElementById("table_body").innerHTML = "";
  var user_data = localStorage.users;
  if (user_data) {
    var user_array = JSON.parse(user_data);
    var n = 1;

    for (let i = 0; i < user_array.length; i++) {
      var x = 0;
      var details = [
        i,
        user_array[i].firstname,
        user_array[i].secondname,
        user_array[i].age,
      ];

      prepareTableCell(
        i,
        user_array[i].firstname,
        user_array[i].secondname,
        user_array[i].age
      );
    }

    //  Making the table and adding data
    function prepareTableCell(index, firstname, secondname, age) {
      var AddRown = document.getElementById("table_body");
      var NewRow = AddRown.insertRow();

      var cel1 = NewRow.insertCell(0);
      var cel2 = NewRow.insertCell(1);
      var cel3 = NewRow.insertCell(2);
      var cel4 = NewRow.insertCell(3);
      var cel5 = NewRow.insertCell(4);

      cel1.innerHTML = details[x];
      x++;
      cel2.innerHTML = details[x];
      x++;
      cel3.innerHTML = details[x];
      x++;
      cel4.innerHTML =
        "<input type='button' value='Delete' onclick='deleteTableRow(" +
        index +
        ")' class='btn-danger'>";
      cel5.innerHTML =
        "<input type='button' value='Edit' onclick='editRow(" +
        index +
        ")' class='btn-danger'>";
    }
  }
}
//   It removes all the details filled by users on the sign up form
function onClear() {
  document.getElementById("firstName").value = "";
  document.getElementById("secondName").value = "";
  document.getElementById("age").value = "";

  edit_index = null;
}
// It deletes the data from the local storage
function deleteTableRow(index) {
  var del = localStorage.users;
  var del_row = JSON.parse(del);
  del_row.splice(index, 1);
  localStorage.users = JSON.stringify(del_row);

  showData();
}

function search(input) {
  items = user_data.filter((row) =>
    row["activity"].toLowerCase().includes(input.toLowerCase())
  );
  // items = rows.filter((row)=>row["activity"].toLowerCase().startWith(input.toLowerCase()));
  var finalText = "";
  if (users_data.length == 0) {
    finalText = "No results found";
  } else {
    finalText += "Results:";
    items.map((item) => (finalText += "<br>" + item["activity"]));
  }
  document.getElementById("firstName").innerHTML = finalText;
}


  function searchActivity(index) {
      index.preventDefault()

  var activity = document.forms["searchResults"]["search"].value;
  document.forms["searchResults"]["search"].value = "";

  search(activity);
}

