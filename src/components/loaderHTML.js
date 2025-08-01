export const loaderHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
      
    body {
background: #ED7EC6;
background: linear-gradient(55deg, rgba(237, 126, 198, 1) 54%, rgba(166, 106, 206, 1) 100%);
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100vh;
        }
    
   .section-center {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 10;
    transform: translateY(-50%);
    width: 100%;
    margin: 0 auto;
    text-align: center;
    -webkit-transition: all 500ms linear;
    transition: all 500ms linear;
  }

  .section-path {
    position: relative;
    width: 238px;
    height: 76px;
    border-radius: 35px;
    margin: 0 auto;
    text-align: center;
    background-color: #e6e6e6;
    box-shadow: inset -2px 20px 10px 0 rgba(0,0,0,.06),
  		inset -2px 30px 10px 0 rgba(0,0,0,.04);
    border: 3px groove rgba(225,225,225,0.07);
    overflow: hidden;
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }

  .globe {
    position: relative;
    width: 66px;
    height: 66px;
    overflow: hidden;
    margin-top: 2px;
    margin-left: 2px;
    border-radius: 50%;
    box-shadow: 0 10px 40px rgba(0,0,0,0.65);
    animation: rotateBall 4s ease infinite;
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }

  @keyframes rotateBall {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(162px);
    }

    100% {
      transform: translateX(0);
    }
  }

  .globe:after {
    position: absolute;
    width: 5px;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    content: '';
    left: 40px;
    top: 15px;
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 0 14px 7px rgba(255, 255, 255, 0.1);
  }

  .globe:before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    left: 0;
    top: 0;
    border-radius: 50%;
    z-index: 1;
    box-shadow: inset 0 0 15px #1a252f;
    opacity: 0.4;
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }

  .globe .wrapper {
    position: absolute;
    width: 528px;
    height: 528px;
    top: 0;
    left: -462px;
    animation: moveBall 4s ease infinite;
  }

  @keyframes moveBall {
    0% {
      left: -462px;
    }

    50% {
      left: 0;
    }

    100% {
      left: -462px;
    }
  }

  .globe .wrapper span {
    position: absolute;
    width: 33px;
    height: 528px;
    top: 0;
    left: 0;
    background-color: #5c477d;
    box-shadow: inset 0 0 25px #5c487c;
  }

  .globe .wrapper span:nth-child(2) {
    left: 33px;
    background-color: #503e6d;
  }

  .globe .wrapper span:nth-child(3) {
    left: 66px;
  }

  .globe .wrapper span:nth-child(4) {
    left: 99px;
    background-color: #503e6d;
  }

  .globe .wrapper span:nth-child(5) {
    left: 132px;
  }

  .globe .wrapper span:nth-child(6) {
    left: 165px;
    background-color: #503e6d;
  }

  .globe .wrapper span:nth-child(7) {
    left: 198px;
  }

  .globe .wrapper span:nth-child(8) {
    left: 231px;
    background-color: #503e6d;
  }

  .globe .wrapper span:nth-child(9) {
    left: 264px;
  }

  .globe .wrapper span:nth-child(10) {
    left: 297px;
    background-color: #503e6d;
  }

  .globe .wrapper span:nth-child(11) {
    left: 330px;
  }

  .globe .wrapper span:nth-child(12) {
    left: 363px;
    background-color: #503e6d;
  }

  .globe .wrapper span:nth-child(13) {
    left: 396px;
  }

  .globe .wrapper span:nth-child(14) {
    left: 429px;
    background-color: #503e6d;
  }

  .globe .wrapper span:nth-child(15) {
    left: 462px;
  }

  .globe .wrapper span:nth-child(16) {
    left: 495px;
    background-color: #503e6d;
  }

  #switch,
  #circle {
    cursor: pointer;
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }

  #switch {
    width: 70px;
    height: 8px;
    margin: 0 auto;
    text-align: center;
    border: 2px solid #8167a9;
    border-radius: 27px;
    background: #000;
    position: relative;
    display: inline-block;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  #circle {
    position: absolute;
    top: -11px;
    left: 5px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 0 1px rgba(26,53,71,0.07);
    background: #000;
  }

  .switched {
    border-color: #000 !important;
    background: #8167a9 !important;
  }

  .switched #circle {
    left: 35px;
    background: #fff;
  }

  .section-center p span {
    position: relative;
    padding: 4px 10px;
    margin: 0 5px;
  }

  .section-center p span:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #8167a9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25);
    left: 0;
    top: 0;
    z-index: -1;
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }

  .section-center p span:after {
    position: absolute;
    content: '';
    width: calc(100% - 10px);
    height: 2px;
    border-radius: 4px;
    background-color: #fff;
    left: 5px;
    top: 50%;
    z-index: 1;
    -webkit-transition: all 300ms linear;
    transition: all 300ms linear;
  }

  .section-center p span:nth-child(2):after {
    opacity: 0;
  }
      </style>
    </head>
    <body>
      <div class="section-center">
        <div class="section-path">
          <div class="globe">
            <div class="wrapper">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
