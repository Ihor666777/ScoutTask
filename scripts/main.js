const url = "https://ws.fanteam.com/match_collections?sport=football&tab=admin_created&statuses[]=waiting&page=0&per_page=30&bearer[white_label]=fanteam";
const trnm_list = [];

// Fetching info from api and render it on the page //

fetch(url)
  .then(res => res.json())
  .then(data => {
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
              <span id="buyIn"><b>Buy In: <button>${newTrnm.buyIn} $</b></button></span></div>
           </div>`
         document.getElementById("render").innerHTML = output;   
      }
    } 
  }   
})

// Filter array by date and buyIn //

function findMatches(word, trnm_list) {
  return trnm_list.filter(info => {
    const regex = new RegExp(word, "gi")
    return info.startTime.match(regex) || info.buyIn.match(regex);
  })
}

// Render filter result on the page //

function displVal () {
  const ourArr = findMatches(this.value, trnm_list);
  const display = ourArr.map(newTrnm => {
    return `
      <div class="trnm">
        <li><span>Gameweek: <b>${newTrnm.gameweeks}</b></span></li>
        <li><span>GW length: <b>${newTrnm.gameweeks.length}</b></span></li>
        <li><span>Gamet type: <b>${newTrnm.gameType}</b></span></li>
        <li><span>Date: <b id="date_time">${moment(newTrnm.startTime).format("LLL")}</b></span></li>
        <span id="buyIn"><b>Buy In: <button>${newTrnm.buyIn} $</b></button></span></div>
      </div>`;
  }).join("")
   document.getElementById("render").innerHTML = display;  
}

document.querySelector("#filter").addEventListener("keyup", displVal);



