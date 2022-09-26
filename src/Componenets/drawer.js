import React from 'react';
import DesignDrawer from './DesignDrawer';

class Edito extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        design: {}, // design attributes
        elements: [], // key-value pair elementId and the current element, array index=z-index order
        zoom: 0.5,
        selection: null,
        selected: {}, // kv pair or array index and element, with or without eleId
        loading: false,
        // undoHistory: [], array of key-value pair of elementId and the element copy before
      };
      this.changeZoomFactor = this.changeZoomFactor.bind(this);
      this.updateDesign = this.updateDesign.bind(this);
      this.setSelected = this.setSelected.bind(this);
      this.setSelection = this.setSelection.bind(this);
      this.updateElement = this.updateElement.bind(this);
      this.addElement = this.addElement.bind(this);
    }
  
    
  
    setSelection(idx) {
      this.setState({ selection: idx });
    }
  
    setSelected(id) {
      const { elements } = this.props;
      if (id === null) {
        this.setState({ selected: {} });
      } else {
        this.setState({ selected: { [id]: elements[id] } });
      }
    }
  
    changeZoomFactor(fact) {
      this.setState({ zoom: fact });
    }
  
    updateElement(idx, element) {
      const { receiveElement } = this.props;
      receiveElement(element);
    }
  
    // addElement(element) {
    //   const { elements } = this.state;
    //   elements.push(element);
    //   this.setState({ elements, selected: { [elements.length - 1]: element } });
    // }
    addElement(element) {
      const { createElement, design } = this.props;
      createElement(design.id, { ...element, id: `temp-${Date.now()}` });
    }
  
    screenshot() {
      const { design: { id, width, height } } = this.state;
      return fetch(`${process.env.SCREENSHOT_URL}screenshot?id=${id}&width=${width}&height=${height}`)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'File name', { type: 'image/png' });
          return file;
        });
    }
  
   
  
    render() {
      const {
        design, zoom, selected, loading, selection
      } = this.state;
      const { elements } = this.props;
      // return <Viewer design={design} elements={elements} zoom={zoom} />
      return (
        <div>

            <DesignDrawer addElement={this.addElement} zoom={zoom} />
          </div>
      
      );
    }
  }
  
  export default Edito;