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
    debugger
    document.querySelector('.results-list').innerHTML = '';
    fetch(`https://www.dnd5eapi.co/api/monsters`)
    .then(res => {
        const resp = res.json()
        console.log(resp)
    })
    .then(monsters => searchMonsters(monsters.results, name))
    .then(results => createList(results))
}

function searchMonsters(monsters, name){
    debugger
    const results = []
    monsters.forEach(monster => {
        if(monster.name.toLowerCase().includes(name.toLowerCase())){
	        results.push(monster.index)
	    }
    })
    return results
}

function createList(results){
    debugger
    results.forEach(monster =>{
        const div = document.createElement('div')
        const p = document.createElement('p')
        const table = document.createElement('table')
	table.hidden = true
	fetch(`https://www.dnd5eapi.co/api/monsters/${monster}`)
        .then(res => res.json())
        .then(stats => {
            debugger
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
	        hp.innerHTML = stats.hit_points
	        ac.innerHTML = stats.armor_class
	        str.innerHTML = stats.strength
	        dex.innerHTML = stats.dexterity
	        con.innerHTML = stats.constitution
	        wis.innerHTML = stats.wisdom
	        cha.innerHTML = stats.charisma
	        int.innerHTML = stats.intelligence
	})
	div.appendChild(p)
	div.appendChild(table)
	div.addEventListener("mouseover", () => table.hidden = false)
	div.addEventListener("mouseout", () => table.hidden = true)
	document.querySelector(".results-list").appendChild(div)
    })
}

function createStatBlock(activeMonster){
	const div = document.createElement('div')
	fetch(`https://www.dnd5eapi.co/api/monsters/${monster}`)
        .then(res => res.json())
        .then(stats => {
            debugger
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
		const conImmun = document.createElement('p')
		const senses = document.createElement('p')
		const langs = document.createElement('p')
		const chall = document.createElement('p')
		name.innerHTML = stats.name
		sizeTypeAlign.innerHTML = `${stats.size} ${stats.type}, `
	        hp.innerHTML = 'Hit points: ' + stats.hit_points
	        ac.innerHTML = 'Armor Class: ' + stats.armor_class
	        str.innerHTML = 'STR: ' + stats.strength
	        dex.innerHTML = 'DEX: ' + stats.dexterity
	        con.innerHTML = 'CON: ' + stats.constitution
	        wis.innerHTML = 'WIS: ' + stats.wisdom
	        cha.innerHTML = 'CHA: ' + stats.charisma
	        int.innerHTML = 'INT: ' + stats.intelligence
		profs.innerHTML = 'Proficiencies: ' + stats.prof
	})
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-form")
    searchBar.addEventListener("submit", e => {
        e.preventDefault
        debugger
        handleForm(e.target[0].value)
    })
    const results = document.querySelector("#clear-results")
    results.addEventListener("click", e => clear(e))
    const active = document.querySelector("#clear-active")
    active.addEventListener("click", e => clear(e))
} )
