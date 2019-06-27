import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Puzzle extends React.Component {

  renderBlocks(index){
    return (
      // initialize problem
      <div className="Block" style={{backgroundColor: this.props.order[index]}} onClick={() => this.props.handleClick(index)}></div>
    );
  }

  render() {
    return (
      <div className="Puzzle">
        {this.renderBlocks(0)}
        {this.renderBlocks(1)}
        {this.renderBlocks(2)}
        {this.renderBlocks(3)}
        {this.renderBlocks(4)}
        {this.renderBlocks(5)}
        {this.renderBlocks(6)}
      </div>
    );
  }
}

//-----Question-----

class Question extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      order: ['indigo', 'green', 'blue', 'red', 'yellow', 'violet', 'orange'],
      selected: -1,
      selectedBlock: null,
      won: false
    };
  }

  handleClick(index){
    if (!evaluateSolution(this.state.order)){
      if ((this.state.selectedBlock === null)){
        this.setState({
          selected : index,
          selectedBlock : this.state.order[index],
        });
      } else{
        // swap
        const currentorder = this.state.order.slice();
        let tmp = currentorder[index];
        currentorder[index] = this.state.selectedBlock;
        currentorder[this.state.selected] = tmp;
        this.setState({
          order: currentorder,
          selected: -1,
          selectedBlock: null,
        });
      }
    } else {
      this.setState({won: true,});
    }
    return ;
  }

  render() {
    let feedback = genFeedback(this.state.order);
    return (
      <div className = "Question">
        <h3>Problem: Arrange the blocks in the order in which colors appear on a rainbow.</h3>
        <div className = "row">
          <Puzzle 
            order={this.state.order} 
            handleClick={i => this.handleClick(i)}
          />
          <br /><br />
          <div>{feedback}</div>
        </div>
      </div>
    );
  }
}

// evaluate if the blocks in current state are the solution
function evaluateSolution(blocks){
  const solution = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  for (let i=0; i<blocks.length; i++){
    if (solution[i] !== blocks[i]){
      return false;
    }
  }
  return true;
}

function genFeedback(blocks){
  const solution = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  let matches = 0;
  for (let i=0; i<blocks.length; i++){
    if (solution[i] === blocks[i]){
      matches ++;
    }
  }
  if (matches === 7){
    return 'Perfect! Congratulations on solving the problem!';
  } else if(matches > 5){
    return 'Almost there!';
  } else if (matches > 3) {
    return 'Some are correct, but not quite there yet...';
  } else {
    return 'Click on blocks to swap them!';
  }
}

ReactDOM.render(
  <Question />,
  document.getElementById('root')
);