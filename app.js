var rIndex;
var tbody = document.getElementById('tbody');
var itemsArray = [];

function init() {
  if (localStorage.items) {
    itemsArray = JSON.parse(localStorage.items);
    for (var i = 0; i < itemsArray.length; i++) {
      const params = {
        full_name: itemsArray[i].full_name,
        address: itemsArray[i].address,
        phone: itemsArray[i].phone
      };
      addHtmlTableRowFromLocalStorage(params);
    }
    if (itemsArray.length == 0) {
      addHtmlTableRowFromJson(lpu);
    }
  } else {
    addHtmlTableRowFromJson(lpu);
  }
  selectedRowToInput();
}

function addHtmlTableRowFromLocalStorage({
  full_name,
  address,
  phone
}) {
  var newRow = tbody.insertRow(tbody.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);

  cell1.innerHTML = full_name;
  cell2.innerHTML = address;
  cell3.innerHTML = phone;
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

    itemsArray.push(kliniks[i]);
  }
  localStorage.setItem('items', JSON.stringify(itemsArray));
}

function checkEmptyInput() {
  var isEmpty = false;

  const showError = {
    full_name: () => makeError("Пожалуйста, введите наименование", "d1"),
    address: () => makeError("Пожалуйста, введите адрес", "d2"),
    phone: () => makeError("Пожалуйста, введите номер телефона", "d3")
  }

  const fields = ['full_name', 'address', 'phone'];
  for (let i = 0; i < fields.length; i++) {
    if (document.getElementById(fields[i]).value == "") {
      showError[fields[i]]();
      return isEmpty = true;
    }
  }
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

    newRow.onclick = function() {
      rIndex = this.rowIndex - 1;
      ['full_name', 'address', 'phone'].forEach((element, id) => {
        document.getElementById(element).value = this.cells[id].innerHTML;
      });
    };
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

function makeError(m, el) {
  let d = document.createElement('div');
  d.className = 'message';
  d.innerHTML = m;
  let phone = document.getElementById(el);
  phone.append(d);

  setTimeout(() => d.remove(), 1000);
}
