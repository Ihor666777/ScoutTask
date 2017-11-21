class Tournaments {
  constructor(ipp) {
    this.ipp = ipp
  }
  
  makeUrl(page){
    return `https://ws.fanteam.com/match_collections?sport=football&tab=admin_created&statuses[]=waiting&page=${page}&per_page=${this.ipp}&bearer[white_label]=fanteam`
  }
  
  getTournaments(page){
    return fetch(this.makeUrl(page))
      .then(res => res.json())
      .then(data => {
        if(data && data.tournaments && data.matchCollections) {
          return data.tournaments.map(trnmInfo => {
            let matchColections = data.matchCollections.filter((colection)=>(colection.id === trnmInfo.matchCollectionId))
            return Object.assign(trnmInfo, { matchColections })  
          })
        }
        return []
    })
  }
  
  draw(data){
    return data.map( tournament => {
      return `<div class="trnm">
                <li>Gameweek: <b>${tournament.matchColections[0].gameweeks}</b> </li>
                <li>GW length: <b>${tournament.matchColections[0].gameweeks.length}</b> </li>
                <li>Gamet type: <b>${tournament.gameType}</b> </li>
                <li>Date: <b>${moment(tournament.matchColections[0].startTime).format("LLL")}</b> </li>
                <span id="buyIn"> Buy In: <button><b>${tournament.buyIn}</b></button><span id="buyIn">
              </div>`
    })
  }
  
  render(page, input){
    return this.getTournaments(page)
      .then(data => {
         return data.filter(info => {
         const regex = new RegExp(input, "gi")
           return info.buyIn.match(regex);
      })
      
    })
      .then(tournaments => {
         return this.draw(tournaments)
    })
      .then(data => data.join().replace(/<\/div>,/g , "<\/div>"))
      .then(html => {
         document.getElementById("render").innerHTML = html;
      })
    
  }
}


const tournaments = new Tournaments(10)

tournaments.render(0, val())

document.querySelector("#filter").addEventListener("keyup", val);

function val() {
  var x = document.querySelector("#filter").value
  return x;
}


function findMatches(word, trnm_list) {
  return trnm_list.filter(info => {
    const regex = new RegExp(word, "gi")
    return info.gameType.match(regex) || info.buyIn.match(regex);
  })
}
















/*let count = 0;
const url = "https://ws.fanteam.com/match_collections?sport=football&tab=admin_created&statuses[]=waiting&page=" + count + "&per_page=3&bearer[white_label]=fanteam";
const trnm_list = [];



function getData() {
fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let trnm = data.tournaments;
    let matches = data.matchCollections;
    let output = "";
    for(let i=0;i<trnm.length;i++){ 
      for(let j=0;j<matches.length;j++){ 
        if (trnm[i].matchCollectionId === matches[j].id) {
          let newTrnm = Object.assign({}, trnm[i] ,matches[j]) 
          trnm_list.push(newTrnm)
          output += `
            <div class="trnm">
              <li><span>Gameweek: <b>${newTrnm.gameweeks}</b></span></li>
              <li><span>GW length: <b>${newTrnm.gameweeks.length}</b></span></li>
              <li><span>Gamet type: <b>${newTrnm.gameType}</b></span></li>
              <li><span>Date: <b id="date_time">${moment(newTrnm.startTime).format("LLL")}</b></span></li>
              <span id="buyIn"><b>Buy In: <button class="buyIn">${newTrnm.buyIn} $</b></button></span></div>
           </div>`
         document.getElementById("render").innerHTML = output;   
        }
      } 
    }   
  })
}

// Filter array by game type and buyIn //

function findMatches(word, trnm_list) {
  return trnm_list.filter(info => {
    const regex = new RegExp(word, "gi")
    return info.gameType.match(regex) || info.buyIn.match(regex);
  })
}

// Render filter result on the page //

function displVal () {
  const ourArr = findMatches(this.value, trnm_list);
  const display = ourArr.map(newTrnm => {
    const newRegex = new RegExp(this.value, "gi");
    const tournament = newTrnm.buyIn.replace(newRegex, `<span class="light">${this.value}</span>`);
    const gameType = newTrnm.gameType.replace(newRegex, `<span class="light">${this.value}</span>`);
    return `
      <div class="trnm">
        <li><span>Gameweek: <b>${newTrnm.gameweeks}</b></span></li>
        <li><span>GW length: <b>${newTrnm.gameweeks.length}</b></span></li>
        <li><span>Gamet type: <b>${gameType}</b></span></li>
        <li><span>Date: <b id="date_time">${moment(newTrnm.startTime).format("LLL")}</b></span></li>
        <span id="buyIn"><b>Buy In: <button>${tournament} $</b></button></span></div>
      </div>`;
  }).join("")
   document.getElementById("render").innerHTML = display;  
}

document.querySelector("#filter").addEventListener("keyup", displVal);



function sportType() {
    sportVal = document.getElementById("sportType").value;
    console.log(sportVal);
    return sportVal;
}

function pageForward() {
   count++
   console.log(count)
   getData()
}

document.getElementById("forward").addEventListener("click", pageForward)
document.querySelector("#sportType").addEventListener("change", getData);
document.querySelector("#sportType").addEventListener("change", sportType);
*/