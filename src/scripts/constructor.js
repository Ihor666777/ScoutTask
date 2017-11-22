class Tournaments {
  constructor(ipp, sportType) {
    this.ipp = ipp,
    this.sportType = sportType
  }
  
  makeUrl(page){
    return `https://ws.fanteam.com/match_collections?sport=${this.sportType}&tab=admin_created&statuses[]=waiting&page=${page}&per_page=${this.ipp}&bearer[white_label]=fanteam`
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
      let countGW = (tournament.matchColections[0].gameweeks.length > 10) ? `... ${tournament.matchColections[0].gameweeks.slice(-5)}` : tournament.matchColections[0].gameweeks;
      return `<div class="trnm">
                <li>Gameweek: <b>${countGW}</b> </li>
                <li>GW length: <b>${tournament.matchColections[0].gameweeks.length}</b> </li>
                <li>Gamet type: <b>${tournament.gameType}</b> </li>
                <li>Date: <b>${moment(tournament.matchColections[0].startTime).format("LLL")}</b> </li>
                <span id="buyIn"> Buy In: <button><b>${tournament.buyIn}</b></button></span>
              </div>`
    })
  }
  
 render(page, input){
    return this.getTournaments(page)
      .then(data => {
         return data.filter(info => {
         const regex = new RegExp(input, "gi")
           return info.buyIn.match(regex) || info.matchColections[0].startTime.match(regex);
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
 
