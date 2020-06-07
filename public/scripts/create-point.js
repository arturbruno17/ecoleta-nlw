function populateUFs() {
  const ufSelect =  document.querySelector('select[name="uf"]')

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
  .then( res => res.json() )
  .then( states => {
    
    for (state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }

  } )
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector('select[name="city"]')
  const stateInput = document.querySelector('input[name="state"]')

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option value="">Selecione a Cidade</option>'
  citySelect.disabled = true

  fetch(url)
  .then( res => res.json() )
  .then( cities => {
    
    for (city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
  } )
}

document
  .querySelector('select[name="uf"]')
  .addEventListener("change", getCities)

// Itens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li')

for (item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector('input[name="itens"]');

let selectedItems = []

function handleSelectedItem(event) {

  const itemLi = event.target
  
  // Add or remove a class with JavaScript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // Check for selected items, if yes, pick the selected items

  const alreadySelected =  selectedItems.findIndex( item => {
    const itemFound = item == itemId
    return itemFound 
  })

  // If selected

  if (alreadySelected >= 0) {
    // Remove from array
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
  }

  // If not selected

  else {
    // Add to the array
    selectedItems.push(itemId)
  }


  // Update the hidden field with the selected data

  collectedItems.value = selectedItems

}