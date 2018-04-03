import React, {Component} from 'react';

export default class EditableLabel extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }
  
  onKeyPress(e) {
    if (e.keyCode === 13) {
      this.setState({ editMode: false });
    }
  }
  
  renderEditMode() {
    const {value, onChange} = this.props;
    return (
        <textarea ref="input"
                  value={value}
                  onBlur={() => {
                    this.setState({editMode: false});
                  }}
                  onKeyPress={e => this.onKeyPress(e.nativeEvent)}
                  onChange={v => onChange(v.target.value)}>
        
        </textarea>
    );
  }
  
  renderViewMode() {
    const {value, readOnly, placeholder} = this.props;
    if (readOnly) {
      return (
        <span className="">{ value || placeholder }</span>
      );
    }
    
    return (
      <span className="" onClick={() => this.setState({ editMode: true }, () => this.refs.input.focus())}>
        { value || placeholder }&nbsp;
        <span className="oi oi-pencil" />
      </span>
    );
  }
  
  render() {
    return (
      <span className="">
        {this.state.editMode ? this.renderEditMode() : this.renderViewMode()}
      </span>
    );
  }
}