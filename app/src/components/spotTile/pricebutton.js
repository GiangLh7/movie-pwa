import React, {Component} from 'react';
import classnames from 'classname';

const renderBigFigureDisplay = (bigFigureDisplay) => {

}

class PriceButton extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const classes = classnames('price-button', this.props.className);
    const {onClick, direction} = this.props;
    return (
      <div className={classes} onClick={() => onClick()}>
        <div className="price-button__wrapper">
          <span className="price-button__big-figure">
          <span className="price-button__direction">
            {direction}
          </span><br />
            {renderBigFigureDisplay(bigFigure)}
        </span>
        </div>
      </div>
    );
  }
}

export default PriceButton;