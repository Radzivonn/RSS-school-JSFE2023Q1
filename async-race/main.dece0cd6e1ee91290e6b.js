(()=>{"use strict";const t=t=>{const e=document.createElement(t.tag);return t.classNames&&e.classList.add(...t.classNames),e.id=t.id?t.id:"",e.textContent=t.text?t.text:"",t.attrs&&t.attrs.forEach((t=>{e.setAttribute(t.attrName,t.attrValue)})),e},e=()=>[t({tag:"button",classNames:["button","previous-button"],text:"prev"}),t({tag:"button",classNames:["button","next-button"],text:"next"})],s=e=>{const s=t({tag:"div",classNames:["car"]});return s.style.fill=e,s.insertAdjacentHTML("afterbegin",'\n<svg class=\'carim\' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n\t width="120px" height="120px" viewBox="0 0 324.018 324.017"\n\t xml:space="preserve">\n<g>\n\t<g>\n\t\t<path d="M317.833,197.111c3.346-11.148,2.455-20.541-2.65-27.945c-9.715-14.064-31.308-15.864-35.43-16.076l-8.077-4.352\n\t\t\tl-0.528-0.217c-8.969-2.561-42.745-3.591-47.805-3.733c-7.979-3.936-14.607-7.62-20.475-10.879\n\t\t\tc-20.536-11.413-34.107-18.958-72.959-18.958c-47.049,0-85.447,20.395-90.597,23.25c-2.812,0.212-5.297,0.404-7.646,0.59\n\t\t\tl-6.455-8.733l7.34,0.774c2.91,0.306,4.267-1.243,3.031-3.459c-1.24-2.216-4.603-4.262-7.519-4.57l-23.951-2.524\n\t\t\tc-2.91-0.305-4.267,1.243-3.026,3.459c1.24,2.216,4.603,4.262,7.519,4.57l3.679,0.386l8.166,11.05\n\t\t\tc-13.823,1.315-13.823,2.139-13.823,4.371c0,18.331-2.343,22.556-2.832,23.369L0,164.443v19.019l2.248,2.89\n\t\t\tc-0.088,2.775,0.823,5.323,2.674,7.431c5.981,6.804,19.713,7.001,21.256,7.001c4.634,0,14.211-2.366,20.78-4.153\n\t\t\tc-0.456-0.781-0.927-1.553-1.3-2.392c-0.36-0.809-0.603-1.668-0.885-2.517c-0.811-2.485-1.362-5.096-1.362-7.845\n\t\t\tc0-14.074,11.449-25.516,25.515-25.516s25.52,11.446,25.52,25.521c0,6.068-2.221,11.578-5.773,15.964\n\t\t\tc-0.753,0.927-1.527,1.828-2.397,2.641c-1.022,0.958-2.089,1.859-3.254,2.641c29.332,0.109,112.164,0.514,168.708,1.771\n\t\t\tc-0.828-0.823-1.533-1.771-2.237-2.703c-0.652-0.854-1.222-1.75-1.761-2.688c-2.164-3.744-3.5-8.025-3.5-12.655\n\t\t\tc0-14.069,11.454-25.513,25.518-25.513c14.064,0,25.518,11.449,25.518,25.513c0,5.126-1.553,9.875-4.152,13.878\n\t\t\tc-0.605,0.922-1.326,1.755-2.04,2.594c-0.782,0.922-1.616,1.781-2.527,2.584c5.209,0.155,9.699,0.232,13.546,0.232\n\t\t\tc19.563,0,23.385-1.688,23.861-5.018C324.114,202.108,324.472,199.602,317.833,197.111z"/>\n\t\t<path d="M52.17,195.175c3.638,5.379,9.794,8.922,16.756,8.922c0.228,0,0.44-0.062,0.663-0.073c2.576-0.083,5.043-0.61,7.291-1.574\n\t\t\tc1.574-0.678,2.996-1.6,4.332-2.636c4.782-3.702,7.927-9.429,7.927-15.933c0-11.144-9.066-20.216-20.212-20.216\n\t\t\ts-20.213,9.072-20.213,20.216c0,2.263,0.461,4.411,1.149,6.446c0.288,0.85,0.616,1.673,1.015,2.471\n\t\t\tC51.279,193.606,51.667,194.434,52.17,195.175z"/>\n\t\t<path d="M269.755,209.068c2.656,0,5.173-0.549,7.503-1.481c1.589-0.642,3.06-1.491,4.422-2.495\n\t\t\tc1.035-0.767,1.988-1.616,2.863-2.559c3.34-3.604,5.432-8.389,5.432-13.681c0-11.144-9.071-20.21-20.215-20.21\n\t\t\ts-20.216,9.066-20.216,20.21c0,4.878,1.812,9.3,4.702,12.801c0.818,0.989,1.719,1.89,2.708,2.713\n\t\t\tc1.311,1.088,2.729,2.024,4.293,2.755C263.836,208.333,266.704,209.068,269.755,209.068z"/>\n\t</g>\n</g>\n</svg>'),s};function a(t,e){return Math.floor(Math.random()*(Math.floor(e)-Math.ceil(t)))+Math.ceil(t)}const n=(...t)=>{t.forEach((t=>{for(const e of t.children)e.setAttribute("disabled","")}))},r=(...t)=>{t.forEach((t=>{for(const e of t.children)e.removeAttribute("disabled")}))},i=(t,e)=>{t.style.transform=`translate(${e*(document.documentElement.clientWidth-151)}px)`},o=(t,e,s=i)=>{const a=performance.now(),n=setInterval((()=>{const r=(performance.now()-a)/e;r<1?s(t,r):clearInterval(n)}),10);return n},c="http://127.0.0.1:3000";var u;!function(t){t.CARSDATAPATH="garage",t.WINNERSDATAPATH="winners",t.ENGINEDATAPATH="engine"}(u||(u={}));const l=["Tesla","Ford","BMW","Mersedes-Benz","Porshe","Lada","lamborghini","Chevrolet","Nissan","Mitsubishi","Audi"],d=["Model X","Mustang","X5","Maybach","Carrera","Priora","Gallardo","Camaro","GTR","Lancer Evolution X","R8"],h=["#000000","#FF0000","#FFEA00","#03FCA1","#0398FC","#FFFFFF","#8800FF","#FF9900","#FFD000","#0026FF","#00FF26","#FF009D","#3D3D3D"];var g=function(t,e,s,a){return new(s||(s=Promise))((function(n,r){function i(t){try{c(a.next(t))}catch(t){r(t)}}function o(t){try{c(a.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,o)}c((a=a.apply(t,e||[])).next())}))};class m{constructor(t){this.requestData=(t,e="GET",s={},a=null)=>g(this,void 0,void 0,(function*(){return yield fetch(t,{method:e,headers:s,body:a})})),this.getListOfCarsData=(t,e)=>g(this,void 0,void 0,(function*(){let s=`${this.baseUrl}/${u.CARSDATAPATH}?`;t&&(s+=`_page=${t}`),e&&(s+=`&_limit=${e}`);const a=yield this.requestData(s);return{data:a.json(),totalCount:a.headers.get("X-Total-Count")}})),this.getListOfWinnersData=(t,e)=>g(this,void 0,void 0,(function*(){let s=`${this.baseUrl}/${u.WINNERSDATAPATH}?`;t&&(s+=`_page${t}`),e&&(s+=`&_limit=${e}`);const a=yield this.requestData(s);return{data:a.json(),totalCount:a.headers.get("X-Total-Count")}})),this.getCarDataByID=t=>g(this,void 0,void 0,(function*(){return(yield this.requestData(`${this.baseUrl}/${u.CARSDATAPATH}/${t}`)).json()})),this.getWinnerDataByID=t=>g(this,void 0,void 0,(function*(){return(yield this.requestData(`${this.baseUrl}/${u.WINNERSDATAPATH}/${t}`)).json()})),this.requestCarCreation=t=>this.requestData(`${this.baseUrl}/${u.CARSDATAPATH}`,"POST",{"Content-Type":"application/json"},JSON.stringify(t)),this.createCarOnServer=t=>g(this,void 0,void 0,(function*(){return(yield this.requestCarCreation(t)).json()})),this.updateCarOnServer=(t,e)=>g(this,void 0,void 0,(function*(){return(yield this.requestData(`${this.baseUrl}/${u.CARSDATAPATH}/${t}`,"PUT",{"Content-Type":"application/json"},JSON.stringify(e))).json()})),this.deleteCarOnServer=t=>g(this,void 0,void 0,(function*(){yield this.requestData(`${this.baseUrl}/${u.CARSDATAPATH}/${t}`,"DELETE")})),this.deleteWinnerOnServer=t=>g(this,void 0,void 0,(function*(){yield this.requestData(`${this.baseUrl}/${u.WINNERSDATAPATH}/${t}`,"DELETE")})),this.toggleEngineOnServer=(t,e)=>g(this,void 0,void 0,(function*(){return(yield this.requestData(`${this.baseUrl}/${u.ENGINEDATAPATH}?id=${t}&status=${e}`,"PATCH")).json()})),this.switchDriveModeOnServer=t=>g(this,void 0,void 0,(function*(){return yield this.requestData(`${this.baseUrl}/${u.ENGINEDATAPATH}?id=${t}&status=drive`,"PATCH")})),this.baseUrl=t}}var p=function(t,e,s,a){return new(s||(s=Promise))((function(n,r){function i(t){try{c(a.next(t))}catch(t){r(t)}}function o(t){try{c(a.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,o)}c((a=a.apply(t,e||[])).next())}))};class v{constructor(){this.selectedCarID=null,this._pageNumber=1,this._pagesAmount=0,this._carsAmount=0,this.TRACKSPERPAGE=7,this.DISTANCE=5e5,this.RANDOMCARSAMOUT=100,this.API=new m(c),this.createRandomCarData=()=>({name:`${l[a(0,l.length)]} ${d[a(0,d.length)]}`,color:h[a(0,h.length)]})}createCar(t){return p(this,void 0,void 0,(function*(){return yield this.API.createCarOnServer(t)}))}getDisplayedCarsData(){return p(this,void 0,void 0,(function*(){const t=yield this.API.getListOfCarsData(this.pageNumber,this.TRACKSPERPAGE);t.totalCount&&(this._carsAmount=Number(t.totalCount));const e=yield t.data;return this.updatePagesAmount(),e}))}getCarData(t){return p(this,void 0,void 0,(function*(){return yield this.API.getCarDataByID(t)}))}generateRandomCars(){return p(this,void 0,void 0,(function*(){for(let t=0;t<this.RANDOMCARSAMOUT;t++)this.createCar(this.createRandomCarData());this.updatePagesAmount()}))}updateCarData(t,e){return p(this,void 0,void 0,(function*(){return yield this.API.updateCarOnServer(t,e)}))}deleteCar(t){return p(this,void 0,void 0,(function*(){yield this.API.deleteCarOnServer(t),yield this.API.deleteWinnerOnServer(t)}))}toggleEngine(t,e){return p(this,void 0,void 0,(function*(){return this.API.toggleEngineOnServer(t,e)}))}switchEngineToDriveMode(t){return p(this,void 0,void 0,(function*(){return this.API.switchDriveModeOnServer(t)}))}updatePagesAmount(){this._pagesAmount=Math.ceil(this.carsAmount/this.TRACKSPERPAGE)}switchToNextPage(){return this._pageNumber<this.pagesAmount&&(this._pageNumber+=1,!0)}switchToPrevPage(){return this._pageNumber>1&&(this._pageNumber-=1,!0)}get pageNumber(){return this._pageNumber}get pagesAmount(){return this._pagesAmount}get carsAmount(){return this._carsAmount}}class b{constructor(){this.creatingBlock=t({tag:"div",classNames:["create-block"]}),this.updatingBlock=t({tag:"div",classNames:["update-block"]}),this.controlButtonsBlock=t({tag:"div",classNames:["control-buttons"]}),this.carsAmount=t({tag:"output",classNames:["cars-number"]}),this.pageNumber=t({tag:"output",classNames:["page-number"]}),this.tracksBlock=t({tag:"div",classNames:["tracks-block"]}),this.gameControllers={inputs:{createCarInput:t({tag:"input",classNames:["text-input","create-block__input"],attrs:[{attrName:"type",attrValue:"text"}]}),updateCarInput:t({tag:"input",classNames:["text-input","update-block__input"],attrs:[{attrName:"type",attrValue:"text"}]})},colorPalettes:{createCarPalette:t({tag:"input",classNames:["color-palette","create-block__colorPalette"],attrs:[{attrName:"type",attrValue:"color"}]}),updateCarPalette:t({tag:"input",classNames:["color-palette","update-block__colorPalette"],attrs:[{attrName:"type",attrValue:"color"}]})},buttons:{createCarButton:t({tag:"button",classNames:["button","create-block__button"],text:"create"}),updateCarButton:t({tag:"button",classNames:["button","update-block__button"],text:"update"}),raceButton:t({tag:"button",classNames:["button","race-button"],text:"race"}),resetButton:t({tag:"button",classNames:["button","reset-button"],text:"reset"}),generateCarsButton:t({tag:"button",classNames:["button","generate-cars-button"],text:"generate cars"})}},this.switchButtonsBlock=t({tag:"div",classNames:["switch-buttons"]}),this.setCarVelocityAttr=(t,e)=>{var s;const a=null===(s=document.getElementById(t))||void 0===s?void 0:s.querySelector(".car");a&&(a.dataset.velocity=String(e))},this.switchButtonsBlock.append(...e())}createView(){const e=t({tag:"div",classNames:["garage"]});return e.append(this.createCarsCreatorBlock(),this.createRaceBlock(),this.switchButtonsBlock),e}createCarsCreatorBlock(){const e=t({tag:"div",classNames:["cars-creator"]});return this.creatingBlock.append(this.gameControllers.inputs.createCarInput,this.gameControllers.colorPalettes.createCarPalette,this.gameControllers.buttons.createCarButton),this.updatingBlock.append(this.gameControllers.inputs.updateCarInput,this.gameControllers.colorPalettes.updateCarPalette,this.gameControllers.buttons.updateCarButton),this.controlButtonsBlock.append(this.gameControllers.buttons.raceButton,this.gameControllers.buttons.resetButton,this.gameControllers.buttons.generateCarsButton),e.append(this.creatingBlock,this.updatingBlock,this.controlButtonsBlock),e}createRaceBlock(){const e=t({tag:"div",classNames:["race-block"]}),s=t({tag:"h2",classNames:["garage-header"],text:"Garage"}),a=t({tag:"h3",classNames:["track-block-header"],text:"Page #"});return s.append(this.carsAmount),a.append(this.pageNumber),e.append(s,a,this.tracksBlock),e}createTracksForPage(t){return t.map((t=>this.createTrack(t)))}createTrack(e){const a=t({tag:"div",classNames:["track"],id:String(e.id)}),n=t({tag:"div",classNames:["car-buttons"]}),r=t({tag:"div",classNames:["car-control-buttons"]}),i=t({tag:"div",classNames:["highway"]});return n.append(t({tag:"button",classNames:["button","select-button"],id:"select",text:"select"}),t({tag:"button",classNames:["button","remove-button"],id:"remove",text:"remove"}),t({tag:"p",classNames:["car-name"],text:e.name})),r.append(t({tag:"button",classNames:["button","start-button"],id:"start",text:"start"}),t({tag:"button",classNames:["button","stop-button"],id:"stop",attrs:[{attrName:"disabled",attrValue:""}],text:"stop"})),i.append(t({tag:"div",classNames:["finish"]})),a.append(n,r,s(e.color),i),a}updateView(t,e,s){this.updatePageHeaders(e,t),this.updateTracksBlock(s)}updatePageHeaders(t,e){this.carsAmount.textContent=` ${t}`,this.pageNumber.textContent=`${e}`}updateTracksBlock(t){this.tracksBlock.replaceChildren(...this.createTracksForPage(t))}updateTrack(t){const e=document.getElementById(String(t.id));if(e){const s=e.querySelector(".car");e.querySelector(".car-name").textContent=t.name,s.style.fill=t.color,this.setUpdateBlockValues("","#000000")}}setCreateBlockValues(t,e){this.gameControllers.inputs.createCarInput.value=t,this.gameControllers.colorPalettes.createCarPalette.value=e}setUpdateBlockValues(t,e){this.gameControllers.inputs.updateCarInput.value=t,this.gameControllers.colorPalettes.updateCarPalette.value=e}setCarControlsDuringMove(t){var e,s;const a=document.getElementById(t),r=a.querySelector(".car-buttons");null===(e=a.querySelector(".start-button"))||void 0===e||e.setAttribute("disabled",""),null===(s=a.querySelector(".stop-button"))||void 0===s||s.removeAttribute("disabled"),n(r),this.gameControllers.buttons.raceButton.setAttribute("disabled",""),this.gameControllers.buttons.resetButton.removeAttribute("disabled")}setCarControlsDuringStandStill(t){var e,s;const a=document.getElementById(t),n=a.querySelector(".car-buttons");null===(e=a.querySelector(".start-button"))||void 0===e||e.removeAttribute("disabled"),null===(s=a.querySelector(".stop-button"))||void 0===s||s.setAttribute("disabled",""),r(n)}putCarBack(t){t.style.transform="translateX(0px)"}resetRaceButtons(){this.gameControllers.buttons.raceButton.removeAttribute("disabled"),this.gameControllers.buttons.resetButton.setAttribute("disabled","")}}var C=function(t,e,s,a){return new(s||(s=Promise))((function(n,r){function i(t){try{c(a.next(t))}catch(t){r(t)}}function o(t){try{c(a.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,o)}c((a=a.apply(t,e||[])).next())}))};class w{constructor(){this.carsAnimationIDs={},this.model=new v,this.view=new b}init(){return C(this,void 0,void 0,(function*(){this.bindListeners()}))}renderView(){return C(this,void 0,void 0,(function*(){const t=yield this.model.getDisplayedCarsData();this.view.updateView(this.model.pageNumber,this.model.carsAmount,t)}))}getView(){const t=this.view.createView();return this.renderView(),this.view.setUpdateBlockValues("","#000000"),n(this.view.updatingBlock),t}bindListeners(){this.view.gameControllers.buttons.createCarButton.addEventListener("click",(()=>this.createCarButtonHandler())),this.view.gameControllers.buttons.updateCarButton.addEventListener("click",(()=>this.updateCarButtonHandler())),this.view.gameControllers.buttons.raceButton.addEventListener("click",(()=>this.raceButtonHandler())),this.view.gameControllers.buttons.resetButton.addEventListener("click",(()=>this.resetButtonHandler())),this.view.gameControllers.buttons.generateCarsButton.addEventListener("click",(()=>this.generateCarsButtonHandler())),this.view.tracksBlock.addEventListener("click",(t=>this.carControlButtonsHandler(t))),this.view.switchButtonsBlock.addEventListener("click",(t=>this.paginationButtonsHandler(t)))}createCarButtonHandler(){return C(this,void 0,void 0,(function*(){yield this.model.createCar({name:this.view.gameControllers.inputs.createCarInput.value,color:this.view.gameControllers.colorPalettes.createCarPalette.value}),this.view.setCreateBlockValues("","#000000"),this.renderView()}))}generateCarsButtonHandler(){return C(this,void 0,void 0,(function*(){yield this.model.generateRandomCars(),this.renderView()}))}paginationButtonsHandler(t){const e=t.target;e&&e.classList.contains("next-button")?this.model.switchToNextPage()&&(this.renderView(),this.view.resetRaceButtons()):e&&e.classList.contains("previous-button")&&this.model.switchToPrevPage()&&(this.renderView(),this.view.resetRaceButtons())}updateCarButtonHandler(){return C(this,void 0,void 0,(function*(){const t=this.model.selectedCarID;if(t){const e=yield this.model.updateCarData(t,{name:this.view.gameControllers.inputs.updateCarInput.value,color:this.view.gameControllers.colorPalettes.updateCarPalette.value});this.view.updateTrack(e),this.model.selectedCarID=null,n(this.view.updatingBlock)}}))}raceButtonHandler(){this.view.gameControllers.buttons.raceButton.setAttribute("disabled",""),this.view.gameControllers.buttons.resetButton.removeAttribute("disabled"),this.view.tracksBlock.querySelectorAll(".track").forEach((t=>{const e=t.querySelector(".car");this.carsAnimationIDs[t.id]||this.startCar(e,t.id)}))}resetButtonHandler(){return C(this,void 0,void 0,(function*(){this.view.gameControllers.buttons.resetButton.setAttribute("disabled","");const t=this.view.tracksBlock.querySelectorAll(".track");for(const e of t){const t=e.querySelector(".car");this.view.setCarControlsDuringMove(e.id),yield this.stopCar(t,e.id)}this.view.gameControllers.buttons.raceButton.removeAttribute("disabled")}))}carControlButtonsHandler(t){const e=t.target;if(e)switch(e.id){case"select":this.selectButtonHandler(e);break;case"remove":this.removeButtonHandler(e);break;case"start":this.startButtonHandler(e);break;case"stop":this.stopButtonHandler(e)}}selectButtonHandler(t){return C(this,void 0,void 0,(function*(){const e=t.closest(".track"),s=yield this.model.getCarData(e.id);if(Object.keys(s).length>0){const t=this.view.updatingBlock;r(t),this.view.setUpdateBlockValues(s.name,s.color),this.model.selectedCarID=e.id}}))}removeButtonHandler(t){return C(this,void 0,void 0,(function*(){const e=t.closest(".track");this.model.deleteCar(e.id),this.view.setUpdateBlockValues("","#000000"),n(this.view.updatingBlock),this.renderView()}))}startButtonHandler(t){const e=t.closest(".track"),s=e.querySelector(".car");this.startCar(s,e.id)}startCar(t,e){return C(this,void 0,void 0,(function*(){this.view.setCarControlsDuringMove(e);const s=(yield this.model.toggleEngine(String(e),"started")).velocity,a=o(t,this.model.DISTANCE/s);this.carsAnimationIDs[e]=a,this.view.setCarVelocityAttr(e,s),this.model.switchEngineToDriveMode(e).then((()=>{clearInterval(a),delete this.carsAnimationIDs[e]}))}))}stopButtonHandler(t){const e=t.closest(".track"),s=e.querySelector(".car");this.stopCar(s,e.id)}stopCar(t,e){return C(this,void 0,void 0,(function*(){yield this.model.toggleEngine(e,"stopped"),this.view.setCarControlsDuringStandStill(e),clearInterval(this.carsAnimationIDs[e]),delete this.carsAnimationIDs[e],this.view.putCarBack(t)}))}}var A=function(t,e,s,a){return new(s||(s=Promise))((function(n,r){function i(t){try{c(a.next(t))}catch(t){r(t)}}function o(t){try{c(a.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,o)}c((a=a.apply(t,e||[])).next())}))};class N{constructor(){this._pageNumber=1,this._pagesAmount=0,this._winnersAmount=0,this._carsAmount=0,this.WINNERSPERPAGE=10,this.API=new m(c)}getDisplayedWinnersData(){return A(this,void 0,void 0,(function*(){const t=yield this.API.getListOfWinnersData(this.pageNumber,this.WINNERSPERPAGE);return t.totalCount&&(this._winnersAmount=Number(t.totalCount)),this.updatePagesAmount(),t.data}))}getDisplayedCarsData(){return A(this,void 0,void 0,(function*(){const t=yield this.API.getListOfCarsData(this.pageNumber,this.WINNERSPERPAGE);return t.totalCount&&(this._carsAmount=Number(t.totalCount)),t.data}))}updatePagesAmount(){this._pagesAmount=Math.ceil(this.winnersAmount/this.WINNERSPERPAGE)}switchToNextPage(){return this._pageNumber<this.pagesAmount&&(this._pageNumber+=1,!0)}switchToPrevPage(){return this._pageNumber>1&&(this._pageNumber-=1,!0)}get pageNumber(){return this._pageNumber}get pagesAmount(){return this._pagesAmount}get winnersAmount(){return this._winnersAmount}get carsAmount(){return this._carsAmount}}class B{constructor(){this.winnersAmount=t({tag:"output",classNames:["cars-number"]}),this.pageNumber=t({tag:"output",classNames:["page-number"]}),this.winnersTableColumns={carNumber:t({tag:"div",classNames:["winners-table__number-column"]}),carImg:t({tag:"div",classNames:["winners-table__car-column"]}),carName:t({tag:"div",classNames:["winners-table__name-column"]}),carWins:t({tag:"div",classNames:["winners-table__wins-column"]}),carBestTime:t({tag:"div",classNames:["winners-table__best-time-column"]})},this.switchButtonsBlock=t({tag:"div",classNames:["switch-buttons"]}),this.switchButtonsBlock.append(...e())}createView(){const e=t({tag:"div",classNames:["winners-page"]}),s=t({tag:"h2",classNames:["winners-header"],text:"Garage"}),a=t({tag:"h3",classNames:["winners-page-header"],text:"Page #"});return s.append(this.winnersAmount),a.append(this.pageNumber),e.append(s,a,this.createWinnersTable(),this.switchButtonsBlock),e}createWinnersTable(){const e=t({tag:"div",classNames:["winners-table"]});return e.append(this.winnersTableColumns.carNumber,this.winnersTableColumns.carImg,this.winnersTableColumns.carName,this.winnersTableColumns.carWins,this.winnersTableColumns.carBestTime),e}updateView(t,e,s,a){this.updatePageHeaders(e,t),this.updateWinnersTableView(s,a)}updatePageHeaders(t,e){this.winnersAmount.textContent=` ${t}`,this.pageNumber.textContent=`${e}`}updateWinnersTableView(e,a){const n=[t({tag:"p",text:"Number"})],r=[t({tag:"p",text:"car"})],i=[t({tag:"p",text:"name"})],o=[t({tag:"p",text:"wins"})],c=[t({tag:"p",text:"Best time (seconds)"})];e.forEach(((e,u)=>{const l=a.find((t=>t.id===e.id));if(l){const{name:a,color:d}=l;n.push(t({tag:"p",text:String(u+1)})),r.push(s(d)),i.push(t({tag:"p",text:a})),o.push(t({tag:"p",text:String(e.wins)})),c.push(t({tag:"p",text:String(e.time)}))}})),this.winnersTableColumns.carNumber.replaceChildren(...n),this.winnersTableColumns.carImg.replaceChildren(...r),this.winnersTableColumns.carName.replaceChildren(...i),this.winnersTableColumns.carWins.replaceChildren(...o),this.winnersTableColumns.carBestTime.replaceChildren(...c)}}var f=function(t,e,s,a){return new(s||(s=Promise))((function(n,r){function i(t){try{c(a.next(t))}catch(t){r(t)}}function o(t){try{c(a.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,o)}c((a=a.apply(t,e||[])).next())}))};class P{constructor(){this.model=new N,this.view=new B}init(){return f(this,void 0,void 0,(function*(){this.bindListeners()}))}getView(){const t=this.view.createView();return this.renderView(),t}renderView(){return f(this,void 0,void 0,(function*(){const t=yield this.model.getDisplayedWinnersData(),e=yield this.model.getDisplayedCarsData();this.view.updateView(this.model.pageNumber,this.model.winnersAmount,t,e)}))}bindListeners(){this.view.switchButtonsBlock.addEventListener("click",(t=>this.paginationButtonsHandler(t)))}paginationButtonsHandler(t){const e=t.target;(e&&e.classList.contains("next-button")&&this.model.switchToNextPage()||e&&e.classList.contains("previous-button")&&this.model.switchToPrevPage())&&this.renderView()}}var y=function(t,e,s,a){return new(s||(s=Promise))((function(n,r){function i(t){try{c(a.next(t))}catch(t){r(t)}}function o(t){try{c(a.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,o)}c((a=a.apply(t,e||[])).next())}))};(new class{constructor(){this.garagePage=new w,this.winnersPage=new P,this.rootNode=t({tag:"div",classNames:["app"]}),this.routingButtons=t({tag:"nav",classNames:["nav-buttons"]})}init(){return y(this,void 0,void 0,(function*(){yield this.garagePage.init(),yield this.winnersPage.init(),this.switchPage(this.garagePage.getView()),this.routingButtons.append(...this.createNavigationButtons()),document.body.append(this.routingButtons,this.rootNode),this.bindListeners()}))}bindListeners(){this.routingButtons.addEventListener("click",(t=>this.routingButtonsHandler(t)))}routingButtonsHandler(t){var e;return y(this,void 0,void 0,(function*(){const s=null===(e=t.target)||void 0===e?void 0:e.closest(".nav-button");s&&"toGarage"===s.id?this.switchPage(this.garagePage.getView()):s&&"toWinners"===s.id&&this.switchPage(this.winnersPage.getView())}))}switchPage(t){this.rootNode.replaceChildren(t)}createNavigationButtons(){return[t({tag:"button",classNames:["button","nav-button"],id:"toGarage",text:"to garage"}),t({tag:"button",classNames:["button","nav-button"],id:"toWinners",text:"to winners"})]}}).init()})();