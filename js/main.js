$(function () {
  let score = 0;
  let timeLeft = 30;
  let gameTimer = 0;
  let targetid = 0;
  let gameStatus = false;
  const rand = function (num) {
    return Math.round(Math.random() * num);
  };
  const moveTarget = function (targetid) {
    $(`#target${targetid}`).animate(
      {
        top: `${rand(75)}%`,
        left: `${rand(75)}%`,
      },
      2000,
      function () {
        moveTarget(targetid);
      }
    );
  };
  // 這裡是用jQ mousemove 讓圖片跟著滑鼠移動，仿cursor 效果
  $(`#screen`).on(`mousemove`, function (move) {
    let x = move.pageX;
    let y = move.pageY;
    $(`#brush`).css({ display: "block", left: move.pageX, top: move.pageY });
  });

  // game function
  $(`#btnStart`).click(function () {
    $(this).attr(`disabled`, true);
    score = 0;
    gameStatus = true;
    $(`#txtScore`).text(score);
    $(`#txTime`).text(timeLeft);

    gameTimer = setInterval(function () {
      timeLeft--;
      $(`#txtTime`).text(timeLeft);
      if (timeLeft == 0) {
        clearInterval(gameTimer);
        $(`#btnStart`).attr(`disabled`, false);
        setTimeout(function () {
          alert(`Time's Up \n Your Score: ${score}`);
        }, 100);
        $(`#screen img`).remove();
        timeLeft = 30;
      } else {
        const num = rand(10);
        if (num > 4) {
          // 用for 迴圈增加細菌數量
          for (let i = 0; i < 8; i++) {
            $(`#upperTeeth`).append(
              `<img src="./Images/germ.png" id="target${targetid}" class="teethGerm">`
            );
            $(`#target${targetid}`).css({
              top: `${rand(75)}%`,
              left: `${rand(75)}%`,
            });
            moveTarget(targetid);
            targetid++;
          }
        }
        if (num == 1 || num == 3 || num == 5 || num == 7 || num == 9) {
          $(`#innerMouth`).append(
            `<img width="100%" src="./Images/tooth_germ.png" class="animated bounceIn mouthGerm">`
          );
        } else {
          for (let i = 0; i < 8; i++) {
            $(`#lowerTeeth`).append(
              `<img src="./Images/germ.png" id="target${targetid}" class="teethGerm">`
            );
            $(`#target${targetid}`).css({
              top: `${rand(75)}%`,
              left: `${rand(75)}%`,
            });
            moveTarget(targetid);
            targetid++;
          }
        }
      }
    }, 1000);
  });

  $(`#upperTeeth`).on(`mouseover`, `img`, function () {
    if (gameStatus == true) {
      $(this).css(`transform`, `rotate(270deg)`);
      $(this).addClass(`hit`);
      $(this).css(`pointer-events`, `none`);
      score++;
      $(`#txtScore`).text(score);
      setTimeout(function () {
        $(`#upperTeeth .hit`).remove();
      }, 500);
    }
  });

  $(`#lowerTeeth`).on(`mouseover`, `img`, function () {
    if (gameStatus == true) {
      $(this).css(`transform`, `rotate(270deg)`);
      $(this).addClass(`hit`);
      $(this).css(`pointer-events`, `none`);
      score++;
      $(`#txtScore`).text(score);
      setTimeout(function () {
        $(`#lowerTeeth .hit`).remove();
      }, 500);
    }
  });

  $(`#innerMouth`).on(`mouseover`, `img`, function () {
    if (gameStatus == true) {
      console.log(this);
      $(this).css(`transform`, `rotate(270deg)`);
      $(this).addClass(`hit`);
      $(this).css(`pointer-events`, `none`);
      $(`#innerMouth .hit`).attr(`src`, `./Images/ghost.png`);
      score += 5;
      $(`#txtScore`).text(score);
      setTimeout(function () {
        $(`#innerMouth .hit`).remove();
      }, 500);
    }
  });
});

// setTimeout(function () {
// setTimeout(function () {
//     $(`#target${targetid}`).remove()
// }, 1000)
// }, 1000)
