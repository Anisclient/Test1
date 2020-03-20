var rIndex;
var tbody = document.getElementById('tbody');
var itemsArray = [];

function init() {
  if (localStorage.items) {
    itemsArray = JSON.parse(localStorage.items);
    for (var i = 0; i < itemsArray.length; i++) {
      addHtmlTableRowFromLocalStorage(itemsArray[i].full_name, itemsArray[i].address, itemsArray[i].phone);
    }
    if (itemsArray.length == 0) {
      addHtmlTableRowFromJson(lpu);
    }
  } else {
    addHtmlTableRowFromJson(lpu);
  }
}

function addHtmlTableRowFromLocalStorage(full_name, address, phone) {
  var newRow = tbody.insertRow(tbody.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);

  cell1.innerHTML = full_name;
  cell2.innerHTML = address;
  cell3.innerHTML = phone;

  selectedRowToInput();
}

function addHtmlTableRowFromJson(jsonObj) {
  var kliniks = jsonObj['institutions'];
  for (var i = 0; i < kliniks.length; i++) {
    var newRow = tbody.insertRow(tbody.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    var full_name = kliniks[i].full_name;
    var address = kliniks[i].address;
    var phone = kliniks[i].phone;

    cell1.innerHTML = full_name;
    cell2.innerHTML = address;
    cell3.innerHTML = phone;

    selectedRowToInput();

    itemsArray.push(kliniks[i]);
  }
  localStorage.setItem('items', JSON.stringify(itemsArray));
}

function checkEmptyInput() {
  var isEmpty = false,
    full_name = document.getElementById('full_name').value,
    address = document.getElementById('address').value,
    phone = document.getElementById('phone').value;

  if (full_name === "") {
    newAlertForFullName();
    isEmpty = true;
  } else if (address === "") {
    newAlertForAddress();
    isEmpty = true;
  } else if (phone === "") {
    newAlertForPhone();
    isEmpty = true;
  }
  return isEmpty;
}

function addHtmlTableRowByCustomer() {
  if (!checkEmptyInput()) {
    var newRow = tbody.insertRow(tbody.length);
    let item = {};
    ['full_name', 'address', 'phone'].forEach((element, id) => {
      cell = newRow.insertCell(id);
      text = document.getElementById(element).value;
      cell.innerHTML = text;

      item[element] = text;
    });
    itemsArray.push(item);
    localStorage.setItem('items', JSON.stringify(itemsArray));

    selectedRowToInput();
    rIndex = undefined;
  }
}

function selectedRowToInput() {
  for (var i = 0; i < tbody.rows.length; i++) {
    tbody.rows[i].onclick = function() {
      rIndex = this.rowIndex - 1;
      ['full_name', 'address', 'phone'].forEach((element, id) => {
        document.getElementById(element).value = this.cells[id].innerHTML;
      });
    };
  }
}

function editSelectedRow() {
  if (!checkEmptyInput()) {
    let i = {};
    ['full_name', 'address', 'phone'].forEach((element, id) => {
      text = document.getElementById(element).value;
      tbody.rows[rIndex].cells[id].innerHTML = text;
      i[element] = text;
    });
    itemsArray.splice(rIndex, 1, i);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    rIndex = undefined;
  }
}

function removeSelectedRow() {
  if (typeof rIndex === 'undefined') {
    return;
  } else {
    tbody.deleteRow(rIndex);
    itemsArray.splice(rIndex, 1);
    localStorage.setItem('items', JSON.stringify(itemsArray));

    ['full_name', 'address', 'phone'].forEach(element => {
      document.getElementById(element).value = "";
    });
    rIndex = undefined;
  }
}

function newAlertForFullName() {
  let d = document.createElement('div');
  d.className = 'message';
  d.innerHTML = "Пожалуйста, введите наименование.";
  let full_name = document.getElementById('d1');
  full_name.append(d);

  setTimeout(() => d.remove(), 1000);
}

function newAlertForAddress() {
  let d = document.createElement('div');
  d.className = 'message';
  d.innerHTML = "Пожалуйста, введите адрес.";
  let address = document.getElementById('d2');
  address.append(d);

  setTimeout(() => d.remove(), 1000);
}

function newAlertForPhone() {
  let d = document.createElement('div');
  d.className = 'message';
  d.innerHTML = "Пожалуйста, введите номер телефона.";
  let phone = document.getElementById('d3');
  phone.append(d);

  setTimeout(() => d.remove(), 1000);
}
