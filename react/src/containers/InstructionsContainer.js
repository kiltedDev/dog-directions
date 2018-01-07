import React, { Component } from 'react';
import StepTile from '../components/StepTile';
import ItemTile from '../components/ItemTile';
import FetchButton from '../components/FetchButton';

class InstructionsContainer
 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    }

    this.handleTaskClick = this.handleTaskClick.bind(this)
    this.getFetch = this.getFetch.bind(this);
  }

  handleTaskClick( id ) {
    this.setState( { selectedId: id }  )
  }

  getFetch() {
    fetch('http://localhost:4567/api/v1/favorite_things.json')
      .then((response) => response.json())
      .then((json) => this.setState({ data: json }))
  }

  render(){
    let supplies = this.props.data.supplies
    let directions = this.props.data.directions

    if (!this.state.data) {
      return(
        <FetchButton getFetch={this.getFetch}/>
      )
    } else {
      let items = supplies.map(supply => {
        return(
          <ItemTile
          item={supply.item}
          key={supply.id}
          id={supply.id}
          />
        )
      })

      let steps = directions.map(direction => {
        let className;

        if(direction.id === this.state.selectedId) {
          className = "selected"
        } else {
          className = ""
        }

      let onTaskClick = () => this.handleTaskClick(direction.id)

        return(
          <StepTile
            step={direction.step}
            key={direction.id}
            className = {className}
            handleClick={onTaskClick}
            id={direction.id}
          />
        )
      })

      return(
        <div>
          <h1>How To {this.props.data.activity}</h1>
          <h3>Supplies:</h3>
          <ul>
            {items}
          </ul>
          <h3>Instructions:</h3>
          <ol>
            {steps}
          </ol>
          <FetchButton />
        </div>
      )
    }
  }
}

export default InstructionsContainer
;
