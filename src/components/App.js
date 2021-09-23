import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilters = (type) => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  fetchPets = () => {
    if (this.state.filters.type !== 'all') {
    fetch(`/api/pets?type=${this.state.filters.type}`)
    .then(res => res.json())
    .then(res => this.setState({
      pets: res
    }))
    } else {
      fetch('/api/pets')
      .then(res => res.json())
      .then(res => this.setState({
        pets: res
      }))
    }
  }

  adoptPet = (id) => {
    let petToAdopt = this.state.pets.find(pet => pet.id === id)
    petToAdopt.isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFilters} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
