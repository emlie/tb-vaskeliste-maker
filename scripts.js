// jsversion: 6

/* –––––––––––––––––––––––––– GET HTML ELEMENTS –––––––––––––––––––––––––– */
let allSideLinks = document.querySelectorAll('.side-a');
let linkMake = document.querySelector('#a-make');
let elContent = document.querySelector('.content');
let allSubcontent = document.querySelectorAll('.subcontent');
let formStraff = document.querySelector('#formStraff');
let btnStraff = document.querySelector('#btnStraff');
let tbody = document.querySelector('tbody');

let db = firebase.database();
let floorsNum = [2, 3, 4, 5, 6];
let floorsDb = [
  db.ref('floor2'),
  db.ref('floor3'),
  db.ref('floor4'),
  db.ref('floor5'),
  db.ref('floor6')
];

function resetData(event) {
  event.preventDefault();
  console.log('resetData');

  let floorDbIndex = 0;

  floorsNum.forEach((floorNum) => {
    let i = floorNum * 100 + 1;
    let upperBound;

    switch (floorNum) {
      case 2:
        upperBound = 211;
        break;
      case 3:
        upperBound = 327;
        break;
      case 4:
        upperBound = 427;
        break;
      case 5:
        upperBound = 523;
        break;
      case 6:
        upperBound = 616;
        break;
    }

    // primary key is room number
    // reset overskudd & straff
    for (i; i <= upperBound; i++) {
      // delete old data
      floorsDb[floorDbIndex].child(i).remove();

      // add new data
      floorsDb[floorDbIndex].child(i).set({
        overskudd: 0,
        straff: 0
      });
    }

    floorDbIndex++;

  });

}

function getRoomData(snapshot) {
  console.log('getRoomData');

  let roomNum = Number(formStraff.querySelector('input').value);
  let floor = Number(formStraff.querySelector('input').value[0]);
  let room;
  let roomData = snapshot.val();

  floorsNum.forEach((floorNum) => {
    if (floor == floorNum) {
      let floorDb = floorsDb[floorsNum.indexOf(floor)];

      room = floorDb.child(roomNum);
      // let roomData = snapshot.val();

      console.log(`floorDb: ${floorDb}`);
      console.log(`roomData: ${roomData}`);
    }
  });

  console.log(`addStraff to ${room} at floor ${floor}`);
}

function addStraff(event) {
  event.preventDefault();

  console.log('addStraff');
}

function toggleContent() {
  let thisLink = this.id;
  let thisName = thisLink.substr(2, thisLink.length - 1);
  let thisId = `#el-${thisName}`;
  let correspondingElement = document.querySelector(`${thisId}`);
  let hideClass = 'hide';

  allSubcontent.forEach((subcontent) => {
    if (subcontent.id !== thisId) {
      subcontent.classList.add(hideClass);
    }
  });


  correspondingElement.classList.toggle(hideClass);

  console.log(`toggle: ${thisLink} with ${thisId}`);
}

function makeVaskeliste() {
  let numWeeks = 3;
  let allDays = [
    'mandag',
    'tirsdag',
    'onsdag',
    'torsdag',
    'fredag',
    'lørdag',
    'søndag'
  ];

  // console.log(allTableRows);

  // fill table
  // tbody.innerHTML += `d`;
  for (let i = 0; i < numWeeks; i++) {
    allDays.forEach((day) => {
      tbody.innerHTML += `
      <tr>
        <td>${day}</td>
        <td>12.09.2020</td>
        <td>201</td>
        <td><!-- empty --></td>
        <td><!-- empty --></td>
        <td><!-- empty --></td>
      </tr>
      <tr>
        <td class="border-top-bottom"><!-- empty --></td>
        <td class="border-top-bottom"><!-- empty --></td>
        <td class="border-top-bottom">202</td>
        <td class="border-top-bottom"><!-- empty --></td>
        <td class="border-top-bottom"><!-- empty --></td>
        <td class="border-top-bottom"><!-- empty --></td>
      </tr>
      `;
    });
  }

  let allTableRows = document.querySelectorAll('tr');

  // every other row is dark gray
  for (let i = 0; i < allTableRows.length; i++) {
    if (i % 2 == 0) {
      allTableRows[i].classList.add('gray-back');
    }

    if (allTableRows[i].firstElementChild.innerHTML == 'søndag') {
      allTableRows[i].classList.add('yellow-back');
      allTableRows[i].classList.add('bold-border-bottom');
    }
  }

  // style thead
  allTableRows[0].classList.add('pink-back');

  console.log('make vaskeliste');
}

allSideLinks.forEach((a) => {
  a.addEventListener('click', toggleContent);
});

btnReset.addEventListener('click', resetData);
linkMake.addEventListener('click', makeVaskeliste);
// formStraff.addEventListener('submit', addStraff);
// formStraff.addEventListener('change', getRoomData);
