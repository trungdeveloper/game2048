let bigArr = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

const transfromArr = arr => {
  //đảo mảng chiều ngang sang mảng chiều dọc
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let newA = [];
    for (let j = 0; j < arr.length; j++) {
      newA.push(arr[j][i]);
    }
    newArr.push(newA);
  }
  return newArr;
};

const addRamdom = arr => {
  let emptyArr = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] == 0) {
        emptyArr.push([i, j]);
      }
    }
  }

  let rand = emptyArr[Math.floor(Math.random() * emptyArr.length)];
  let numbersAdd = [2, 2, 2, 4];
  let randomNumber = numbersAdd[Math.floor(Math.random() * 3)];

  arr[rand[0]][rand[1]] = randomNumber;

  return arr;
};

const compareArr = (array1, array2) => {
  return array1.every((e, i) => {
    return e.every((value, index) => {
      return value == array2[i][index];
    });
  });
};

// =================================================================KEY DOWN===================================================================

const pushLeft = arr => {
  let pushedArr = arr.map(e => {
    let newArr = e.filter(ele => ele !== 0); //loại bỏ nhưng vị trí trống (vị trí số 0) => các vị trí có số sẽ dồn lại qua bên trái
    //cộng điểm sau khi dồn lại
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] == newArr[i + 1]) {
        newArr[i] *= 2;
        newArr.splice(i + 1, 1);
      }
      win(newArr[i]);
    } //

    //thêm những vị trí trống sau khi dồn (số 0 tương đương vị trí trống)
    while (newArr.length < 4) {
      newArr.push(0);
    } //
    return newArr;
  });
  if (compareArr(pushedArr, arr)) {
    return arr;
  } else {
    // lose(addRamdom(pushedArr));
    return (bigArr = addRamdom(pushedArr));
  }
};

const pushRight = arr => {
  //đảo ngược mảng lại xong dồn trái rồi đảo ngược lại 1 lần nữa thì nó sẽ thành dồn sang phải :v tài năng thì có hạn mà thủ đoạn vô biên :D
  let reverseArr = arr.map(e => e.reverse());
  return (bigArr = pushLeft(reverseArr).map(e => e.reverse()));
};

const pushUp = arr => {
  //đảo mảng chiều dọc thành chiều ngang sau đó dồn sang trái
  let upDownArr = transfromArr(arr);
  return (bigArr = transfromArr(pushLeft(upDownArr)));
};

const pushDown = arr => {
  //đảo mảng chiều dọc thành chiều ngang sau đó dồn sang phải
  let upDownArr = transfromArr(arr);
  return (bigArr = transfromArr(pushRight(upDownArr)));
};

const drawBoard = () => {
  const board = document.querySelector("#main-container");
  board.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let button = document.createElement("button");
      button.className = "board";
      if (bigArr[i][j] != 0) button.innerText = bigArr[i][j];
      board.appendChild(button);
    }
  }
};
// =================================================================END KEY DOWN===================================================================

// =================================================================CONTROL GAME===================================================================

const win = number => {
  if (number == 2048) {
    stopGame("WIN");
  }
  return true;
};

const lose = arr => {
  
};

const reset = () => {
  document.querySelector("#result").innerHTML = "";
  bigArr = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  startGame();
};

const stopGame = status => {
  const result = document.querySelector("#result");
  const p = document.createElement("p");
  const button = document.createElement("button");
  p.innerHTML = status;
  button.innerHTML = "RESET";
  button.addEventListener("click", () => {
    reset();
  });
  result.appendChild(p);
  result.appendChild(button);
  document.onkeydown = e => {
    if (
      e.keyCode == 37 ||
      e.keyCode == 38 ||
      e.keyCode == 39 ||
      e.keyCode == 40
    ) {
    }
  };
  return false;
};

const startGame = () => {
  addRamdom(bigArr);
  addRamdom(bigArr);
  drawBoard();
  document.onkeydown = e => {
    switch (e.keyCode) {
      case 37:
        pushLeft(bigArr);
        drawBoard();
        break;
      case 38:
        pushUp(bigArr);
        drawBoard();
        break;
      case 39:
        pushRight(bigArr);
        drawBoard();
        break;
      case 40:
        pushDown(bigArr);
        drawBoard();
        break;
    }
  };
};

startGame();

// =================================================================END CONTROL GAME===================================================================
