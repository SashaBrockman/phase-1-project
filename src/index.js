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

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-form")
    searchBar.addEventListener(submit, e =>{

    })
    const results = document.querySelector("#results-button")
    results.addEventListener
} )