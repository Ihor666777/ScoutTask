let num = 0;
const tournaments = new Tournaments(10, "football")
tournaments.render(0, '');


class Settings {
  constructor(){
    this.inp = document.getElementById("ipp");
    this.sportType = document.getElementById("sportType");
    this.filter = document.getElementById("filter");
  }
  custSport() {
    let custList = new Tournaments(ipp.value, sportType.value);
    return custList.render(num, '')
  }
  nextPage() {
    let custList = new Tournaments(ipp.value,sportType.value);
    return  custList.render(++num, '')
  }
  previousPage() {
    let custList = new Tournaments(ipp.value,sportType.value);
    return  custList.render(--num, '')
  }
  filterTrnm() {
    let custList = new Tournaments(ipp.value,sportType.value);
    return custList.render(num, filter.value);
  }
}

let custSettings = new Settings()

document.getElementById("settings_btn").addEventListener('click', custSettings.custSport)
document.getElementById("next").addEventListener('click', custSettings.nextPage)
document.getElementById("back").addEventListener('click', custSettings.previousPage)
document.getElementById("filter").addEventListener('keyup', custSettings.filterTrnm)
document.getElementById("settings_btn").addEventListener('click', function(){
  document.getElementById("filter").value = ''; 
})
