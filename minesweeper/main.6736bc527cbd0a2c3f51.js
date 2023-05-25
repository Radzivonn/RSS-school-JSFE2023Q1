(()=>{"use strict";var e={68:(e,t,i)=>{e.exports=i.p+"assets/7946ee76396a356105ed.svg"},252:(e,t,i)=>{e.exports=i.p+"assets/652a42ca7dea7f538b8a.svg"}},t={};function i(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,i),o.exports}i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var s=t.getElementsByTagName("script");s.length&&(e=s[s.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{function e(e="div",t=""){const i=document.createElement(e);return i.classList.add(...t.split(" ")),i}const t=i(252),s=i(68),n=t=>{const i=e("section","mine-field");i.setAttribute("oncontextmenu","return false");for(let s=1;s<t.length-1;s+=1){const n=t[s],o=e("div","mine-field__row");for(let t=1;t<n.length-1;t+=1){const i=e("div","mine-field__cell"),a=n[t];i.id="".concat(s,".",t),a.isMined&&i.classList.add("mined-cell"),a.isOpened&&i.classList.add("opened-cell"),a.isMarked&&i.classList.add("marked-cell"),o.append(i)}i.append(o)}return i},o={difficulty:"easy",minesAmount:10,gameTime:0,gameState:"In progress",isFirstMoveCompleted:!1,clicksAmount:0,flagsCounter:0,fieldSize:{sizeX:10,sizeY:10,minesAmount:10}};function a(e,t){return Math.floor(Math.random()*(Math.floor(t)-Math.ceil(e)))+Math.ceil(e)}const l=e=>{const t=[];for(let i=0;i<e.fieldSize.sizeY+2;i+=1){const s=[];for(let t=0;t<e.fieldSize.sizeX+2;t+=1)s.push({y:i,x:t,isMined:!1,isOpened:!1,isMarked:!1,minedNeighbors:0});t.push(s)}return t},r=(e,t,i)=>{let s=e[t][i].isMined?-1:0;for(let n=-1;n<2;n+=1)for(let o=-1;o<2;o+=1)e[t+n][i+o].isMined&&(s+=1);return s},m=(e,t,i)=>{const s=e[t][i];if(!((e,t,i,s)=>t.isOpened||t.isMined||t.isMarked||i<1||s<1||i>e.length-2||s>e[i].length-2)(e,s,t,i)){s.isOpened=!0,document.getElementById(`${t}.${i}`).classList.add("opened-cell");for(let n=-1;n<2;n+=1)for(let o=-1;o<2;o+=1)1===Math.abs(n-o)&&0===s.minedNeighbors&&m(e,t+n,i+o)}},c=e=>{const t=parseInt(e.slice(0,e.indexOf(".")),10);return[parseInt(e.slice(e.indexOf(".")+1),10),t]},d={easy:{sizeX:10,sizeY:10,minesAmount:10},medium:{sizeX:15,sizeY:15,minesAmount:55},hard:{sizeX:25,sizeY:25,minesAmount:99}};class g{constructor(){window.addEventListener("DOMContentLoaded",(()=>{this.getGameSettings(),this.init()})),window.addEventListener("unload",(()=>this.setGameSettings())),setInterval(this.updateGameTimer.bind(this),1e3)}init(){this.getScore(),this.setPageLayout(),this.setEventListeners(),"In progress"!==this.gameSettings.gameState?this.toggleFinishModal():this.startGameTimer(),this.displayNeighborsAmount()}reloadGame(){this.updateScore(),this.setScore(),this.resetSettings(),this.resetGameTimer(),this.setGameSettings(),document.querySelector(".wrapper").remove(),this.init(),this.resetInterface()}resetSettings(){this.gameSettings=structuredClone(this.tempSettings),this.minefield=l(this.gameSettings),this.gameSettings.clicksAmount=o.clicksAmount,this.gameSettings.flagsCounter=0,this.gameSettings.gameState=o.gameState,this.gameSettings.isFirstMoveCompleted=!1}resetInterface(){this.displayClicks(),this.displayGameTime()}getGameSettings(){localStorage.getItem("gameSettings")?this.gameSettings=JSON.parse(localStorage.getItem("gameSettings")):this.gameSettings=o,this.tempSettings=structuredClone(this.gameSettings),localStorage.getItem("colorTheme")?this.colorTheme=JSON.parse(localStorage.getItem("colorTheme")):this.colorTheme="light",localStorage.getItem("minefield")?this.minefield=JSON.parse(localStorage.getItem("minefield")):this.minefield=l(this.gameSettings)}setGameSettings(){this.gameSettings&&localStorage.setItem("gameSettings",JSON.stringify(this.gameSettings)),this.minefield&&localStorage.setItem("minefield",JSON.stringify(this.minefield)),this.colorTheme&&localStorage.setItem("colorTheme",JSON.stringify(this.colorTheme))}getScore(){localStorage.getItem("score")?this.score=JSON.parse(localStorage.getItem("score")):this.score=[]}setScore(){this.score&&localStorage.setItem("score",JSON.stringify(this.score))}updateScore(){"In progress"!==this.gameSettings.gameState&&"Won"===this.gameSettings.gameState&&(this.score.length>9&&this.score.shift(),this.score.push(this.gameSettings))}setPageLayout(){const i=this.gameSettings,o=e("div",`wrapper ${this.colorTheme}`),a=e("article","game-field"),l=e("h1","game-name");var r,m;l.textContent="Minesweeper",a.insertAdjacentHTML("afterbegin",'\n<div class="finish-modal">\n\t<h2 class="finish-message"></h2>\n\t<button class="reset-button"> new game </button>\n</div>'),a.insertAdjacentHTML("afterbegin",(r=i,`\n<div class="settings-modal">\n\t<div class="theme-toggle">\n\t\t<p> theme </p>\n\t\t<img class="theme-icon ${"light"===(m=this.colorTheme)?"active":""}" id="light-theme" src=${t} alt="icon">\n\t\t<img class="theme-icon ${"dark"===m?"active":""}" id="dark-theme" src=${s} alt="icon">\n\t</div>\n\t<div class="change-mines-amount">\n\t\t<p> Mines amount </p>\n\t\t<input class="change-mines-amount__bar" type="range" min="10" max="99" step="1" value="${r.minesAmount}">\n\t\t<output class="mines-amount"> ${r.minesAmount} </output>\n\t</div>\n\t<select class="game-difficulty">\n\t\t<option class="game-difficulty__option" value="easy"> easy </option>\n\t\t<option class="game-difficulty__option" value="medium"> medium </option>\n\t\t<option class="game-difficulty__option" value="hard"> hard</option>\n\t</select>\n</div>`)),a.insertAdjacentHTML("beforeend",(e=>`\n<section class="info-section">\n\t<output class="clicks-amount"> ${e.clicksAmount} </output>\n\t<button class="reset-button"> new game </button>\n\t<time class="game-time"> ${e.gameTime} </time>\n\t<div class="settings-button"></div>\n</section>`)(i)),a.append(n(this.minefield)),a.insertAdjacentHTML("beforeend",(e=>`\n\t<section class="counters"> \n\t\t<output class="mines-counter"> Mines ${e.minesAmount} </output>\n\t\t<output class="flags-counter"> Flags ${e.flagsCounter} </output>\n\t</section>`)(i)),a.insertAdjacentHTML("beforeend",(e=>{let t="<div class='score-modal'>";return e.forEach((e=>{t+=`\n\t\t<div class="score-item">\n\t\t\t<div class="score-outcome"> ${e.gameState} </div>\n\t\t\t<div class="score-time"> ${e.gameTime} seconds </div>\n\t\t\t<div class="score-difficulty"> ${e.difficulty} </div>\n\t\t\t<div class="score-mines-amount"> ${e.minesAmount} mines </div>\n\t\t </div>`})),t+="<h2> Score </h2></div>",t})(this.score)),o.append(l,a),document.body.prepend(o)}setEventListeners(){const e=document.querySelectorAll(".game-difficulty option"),t=document.querySelector(`option[value=${this.gameSettings.difficulty}]`);e.forEach((e=>e.removeAttribute("selected"))),t.setAttribute("selected",""),document.querySelectorAll(".reset-button").forEach((e=>{e.addEventListener("click",(()=>this.reloadGame()))}));const i=document.querySelector(".settings-button"),s=document.querySelector(".settings-modal");i.addEventListener("click",(()=>s.classList.toggle("active"))),s.addEventListener("click",this.settingsHandler.bind(this)),document.querySelector(".change-mines-amount__bar").addEventListener("input",this.minesAmountHandler.bind(this)),document.querySelector(".game-difficulty").addEventListener("change",this.difficultyHandler.bind(this)),this.setFieldListener()}setFieldListener(){document.querySelector(".mine-field").addEventListener("mousedown",this.fieldClicksHandler.bind(this))}startGameTimer(){this.isTimerActive=!0}updateGameTimer(){this.isTimerActive&&this.gameSettings.isFirstMoveCompleted&&(this.gameSettings.gameTime+=1,this.displayGameTime())}resetGameTimer(){this.gameSettings.gameTime=0}stopGameTimer(){this.isTimerActive=!1}displayGameTime(){document.querySelector(".game-time").textContent=+this.gameSettings.gameTime}fieldClicksHandler(e){"In progress"===this.gameSettings.gameState&&e.target.classList.contains("mine-field__cell")&&!e.target.classList.contains("opened-cell")&&(0===e.button?(this.openCell(e.target),this.gameSettings.clicksAmount+=1,this.displayClicks()):2===e.button&&this.gameSettings.isFirstMoveCompleted&&this.setFlag(e.target),g.playSound("https://bigsoundbank.com/UPLOAD/mp3/1742.mp3"))}displayClicks(){document.querySelector(".clicks-amount").textContent=this.gameSettings.clicksAmount}displayMinesAmount(){document.querySelector(".mines-counter").textContent=`Mines ${this.gameSettings.minesAmount}`}displayFlagsAmount(){document.querySelector(".flags-counter").textContent=`Mines ${this.gameSettings.flagsCounter}`}openCell(e){const t=e.id,[i,s]=c(t);this.gameSettings.isFirstMoveCompleted||this.firstMove(t),this.minefield[s][i].isMarked||(document.getElementById(`${t}`).classList.add("opened-cell"),!0===this.minefield[s][i].isMined?(this.minefield[s][i].isOpened=!0,this.gameSettings.gameState="Lose",this.toggleFinishModal(),g.playSound("https://bigsoundbank.com/UPLOAD/mp3/1023.mp3")):(m(this.minefield,s,i),((e,t)=>{const i=(e.length-2)*(e[0].length-2),s=(e=>{let t=0;for(let i=1;i<e.length-1;i+=1)for(let s=1;s<e[0].length-1;s+=1)e[i][s].isOpened&&(t+=1);return t})(e);return i-s===t})(this.minefield,this.gameSettings.minesAmount)&&(this.gameSettings.gameState="Won",this.toggleFinishModal(),g.playSound("https://bigsoundbank.com/UPLOAD/mp3/0237.mp3"))),this.displayNeighborsAmount())}firstMove(e){this.gameSettings.isFirstMoveCompleted=!0,this.minefield=((e,t,i)=>{const s=e;for(let e=t.minesAmount;e>0;){const n=a(1,t.fieldSize.sizeY+1),o=a(1,t.fieldSize.sizeX+1);i!==`${n}.${o}`&&!1===s[n][o].isMined&&!1===s[n][o].isOpened&&(s[n][o].isMined=!0,e-=1)}return s})(this.minefield,this.gameSettings,e),document.querySelector(".mine-field").remove(),document.querySelector(".info-section").after(n(this.minefield)),this.setFieldListener(),this.minefield=(e=>{const t=this.minefield;for(let e=1;e<t.length-1;e+=1){const i=t[e];for(let s=1;s<i.length-1;s+=1)t[e][s].isMined||(t[e][s].minedNeighbors=r(t,e,s))}return t})()}openAllCells(){document.querySelectorAll(".mine-field__cell").forEach((e=>{if(!e.classList.contains("opened-cell")){const t=e.id,[i,s]=c(t);e.classList.add("opened-cell"),this.minefield[s][i].isOpened=!0}}))}setFlag(e){const[t,i]=c(e.id);this.gameSettings.flagsCounter<this.gameSettings.minesAmount?(this.gameSettings.flagsCounter+=this.minefield[i][t].isMarked?-1:1,this.minefield[i][t].isMarked=!this.minefield[i][t].isMarked,e.classList.toggle("marked-cell")):(this.minefield[i][t].isMarked&&(this.gameSettings.flagsCounter-=1),this.minefield[i][t].isMarked=!1,e.classList.remove("marked-cell")),this.displayFlagsAmount()}displayAllFlags(){for(let e=1;e<this.minefield.length-1;e+=1)for(let t=1;t<this.minefield[0].length-1;t+=1)this.minefield[e][t].isMarked&&document.getElementById(`${e}.${t}`).classList.add("marked-cell")}displayNeighborsAmount(){document.querySelectorAll(".mine-field__cell.opened-cell").forEach((e=>{const t=e.id,[i,s]=c(t),{minedNeighbors:n}=this.minefield[s][i];n>0&&(e.textContent=n,e.classList.add(`neighbors-${n}`))}))}toggleFinishModal(){this.openAllCells();const e=document.querySelector(".finish-modal");document.querySelector(".finish-message").textContent=`You ${this.gameSettings.gameState}!!!`,e.classList.add("active"),this.stopGameTimer()}settingsHandler(e){e.target.closest(".theme-toggle")&&(document.querySelectorAll(".theme-icon").forEach((e=>e.classList.remove("active"))),document.querySelector(".wrapper").classList.remove(`${this.colorTheme}`),this.colorTheme="light"===this.colorTheme?"dark":"light",document.getElementById(`${this.colorTheme}-theme`).classList.add("active"),document.querySelector(".wrapper").classList.add(`${this.colorTheme}`))}minesAmountHandler(e){this.setMinesAmount(e.target.value)}setMinesAmount(e){document.querySelector(".mines-amount").textContent=e,this.tempSettings.minesAmount=Number(e)}difficultyHandler(e){this.tempSettings.difficulty=e.target.value,this.tempSettings.fieldSize=d[this.tempSettings.difficulty],this.setMinesAmount(this.tempSettings.fieldSize.minesAmount)}static async playSound(e){const t=new Audio(e);t.volume=.5,t.play()}}new g})()})();