// jsversion: 6

/* –––––––––––––––––––––––––– GET HTML ELEMENTS –––––––––––––––––––––––––– */
let formStraff = document.querySelector('#formStraff');
let btnStraff = document.querySelector('#btnStraff');

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

btnReset.addEventListener('click', resetData);
formStraff.addEventListener('submit', addStraff);
formStraff.addEventListener('change', getRoomData);
