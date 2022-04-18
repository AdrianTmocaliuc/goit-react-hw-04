import { Component } from "react";
import s from "./Modal.module.scss";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.backdropCloseByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.backdropCloseByEscape);
  }
  backdropCloseByEscape = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  closeOnBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImage } = this.props;
    console.log(largeImage);
    return (
      <div className={s.Overlay} onClick={this.closeOnBackDropClick}>
        <div className={s.Modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
