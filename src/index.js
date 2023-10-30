/* add event listener to document (when loaded)
	add event listener to search form (when submitted, parameter event => 
		access monsters object
		then make it json readable
		then check the results array with Search(results)
	)
	add event listener to clear results (when clicked, event => Clear (results))
	add event listener to clear active (when clicked, event => Clear (active))

function Search (results)
	iterate through the objects in the array, checking the name key and looking for any matches, 	complete or partial (callback object =>
		create a div element, class "results"
		create a paragraph element 
		create a  table element
		set the table to hidden
		set the paragraph text to the name
		populate table with stats using Preview (object index, table id)
		add event listener to div element (when mouse enters, callback event => set table to 			visible)
		add event listener to div element (when mouse leaves, callback event => set table to 			hidden)
		add event listener to div element (when clicked, callback event => 					createStatBlock(object index))
		add new div to the results div
	)
 */

function handleForm(name){
    document.querySelector('.results-list').innerHTML = '';
    fetch(`https://www.dnd5eapi.co/api/monsters`)
    .then(res => res.json())
    .then(monsters => searchMonsters(monsters.results, name))
    .then(results => createList(results))
}

function searchMonsters(monsters, name){
    const results = []
    monsters.forEach(monster => {
        if(monster.name.toLowerCase().includes(name.toLowerCase())){
	        results.push(monster.index)
	    }
    })
    return results
}

function createList(results){
    results.forEach(monster =>{
        const div = document.createElement('div')
        const p = document.createElement('p')
        const table = document.createElement('table')
	table.hidden = true
	fetch(`https://www.dnd5eapi.co/api/monsters/${monster}`)
        .then(res => res.json())
        .then(stats => {
	        p.innerHTML = stats.name
	        const row = table.insertRow(0)
	        const hp = row.insertCell(-1)
	        const ac = row.insertCell(-1)
	        const str = row.insertCell(-1)
	        const dex = row.insertCell(-1)
	        const con = row.insertCell(-1)
	        const wis = row.insertCell(-1)
	        const cha = row.insertCell(-1)
	        const int = row.insertCell(-1)
	        hp.innerHTML = "HP: " + stats.hit_points
	        ac.innerHTML = "AC: " + stats.armor_class[0].value
	        str.innerHTML = "STR: " + stats.strength
	        dex.innerHTML = "DEX: " + stats.dexterity
	        con.innerHTML = "CON: " + stats.constitution
	        wis.innerHTML = "WIS: " + stats.wisdom
	        cha.innerHTML = "CHA: " + stats.charisma
	        int.innerHTML = "INT: " + stats.intelligence
	})
	div.appendChild(p)
	div.appendChild(table)
	div.addEventListener("mouseover", () => table.hidden = false)
	div.addEventListener("mouseout", () => table.hidden = true)
	div.addEventListener("click", e => createStatBlock(e.target.innerHTML.toLowerCase()))
	document.querySelector(".results-list").appendChild(div)
    })
}

function createStatBlock(activeMonster){
	console.log(activeMonster)
	fetch(`https://www.dnd5eapi.co/api/monsters/${activeMonster.replaceAll(" ","-")}`)
        .then(res => res.json())
        .then(stats => {
			console.log(stats)
		const div = document.createElement('div')
		const titleDiv = document.createElement('div')
		const name = document.createElement('p')
		const sizeTypeAlign = document.createElement('p')
		const physicalDiv = document.createElement('div')
		const hp = document.createElement('p')
	    const ac = document.createElement('p')
		const statDiv = document.createElement('div')
	    const str = document.createElement('p')
	    const dex = document.createElement('p')
	    const con = document.createElement('p')
	    const wis = document.createElement('p')
	    const cha = document.createElement('p')
	    const int = document.createElement('p')
		const infoDiv = document.createElement('div')
		const profs = document.createElement('p')
		const vulns = document.createElement('p')
		const resists = document.createElement('p')
		const immuns = document.createElement('p')
		const conImmuns = document.createElement('p')
		const langs = document.createElement('p')
		const chall = document.createElement('p')
		
		name.innerHTML = stats.name
		sizeTypeAlign.innerHTML = `${stats.size} ${stats.type}, `
	        hp.innerHTML = 'Hit points: ' + stats.hit_points
	        ac.innerHTML = 'Armor Class: ' + stats.armor_class[0].value
	        str.innerHTML = 'STR: ' + stats.strength
	        dex.innerHTML = 'DEX: ' + stats.dexterity
	        con.innerHTML = 'CON: ' + stats.constitution
	        wis.innerHTML = 'WIS: ' + stats.wisdom
	        cha.innerHTML = 'CHA: ' + stats.charisma
	        int.innerHTML = 'INT: ' + stats.intelligence
		if(typeof stats.proficiencies[0] !== "undefined"){
			profs.innerHTML = 'Proficiencies: ' + stats.proficiencies.forEach(prof => profs.innerHTML.concat(', ', `${prof.proficiency.name} ${prof.value}`))
		}
		if(typeof stats.damage_vulnerabilities[0] !== "undefined"){
			vulns.innerHTML = 'Vulnerabilities: ' + stats.damage_vulnerabilities.forEach(vuln => vulns.innerHTML.concat(', ', vuln))
		}
		if(typeof stats.damage_resistances[0] !== "undefined"){
			resists.innerHTML = 'Resistances: ' + stats.damage_resistances.forEach(resist => resists.innerHTML.concat(', ', resist))
		}
		if(typeof stats.damage_immunities[0] !== "undefined"){
			immuns.innerHTML = 'Immunities: ' + stats.damage_immunities.forEach(immun => immuns.innerHTML.concat(', ', immun))
		}
		if(typeof stats.condition_immunities[0] !== "undefined"){
			conImmuns.innerHTML = 'Condition Immunities: ' + stats.condition_immunities.forEach(conImmun => conImmuns.innerHTML.concat(', ', conImmun))
		}
		langs.innerHTML = 'Languages: ' + stats.languages
		chall.innerHTML = 'CR: ' + stats.challenge_rating + ` (${stats.xp} XP)`

		titleDiv.appendChild(name)
		titleDiv.appendChild(sizeTypeAlign)
		physicalDiv.appendChild(hp)
		physicalDiv.appendChild(ac)
		statDiv.appendChild(str)
		statDiv.appendChild(dex)
		statDiv.appendChild(con)
		statDiv.appendChild(wis)
		statDiv.appendChild(cha)
		statDiv.appendChild(int)
		infoDiv.appendChild(profs)
		infoDiv.appendChild(vulns)
		infoDiv.appendChild(resists)
		infoDiv.appendChild(immuns)
		infoDiv.appendChild(conImmuns)
		infoDiv.appendChild(langs)
		infoDiv.appendChild(chall)
		div.appendChild(titleDiv)
		div.appendChild(physicalDiv)
		div.appendChild(statDiv)
		div.appendChild(infoDiv)
		document.querySelector('.active-list').appendChild(div)
	})
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-form")
    searchBar.addEventListener("submit", e => {
        e.preventDefault()
        handleForm(e.target[0].value)
    })
    const results = document.querySelector("#clear-results")
    results.addEventListener("click", () => document.querySelector(".results-list").innerHTML = "")
    const active = document.querySelector("#clear-active")
    active.addEventListener("click", () => document.querySelector(".active-list").innerHTML = "")
} )
