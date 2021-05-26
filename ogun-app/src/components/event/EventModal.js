import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import { uiCloseModal } from "../../actions/ui";
import { eventAddNew } from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment();
const nowClone = now.clone().add(1, "hours");

export const EventModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowClone.toDate());
  const [tittleValid, setTittleValid] = useState(true);

  const [formValues, setformValues] = useState({
    tittle: "",
    location: "",
    notes: "",
    start: now.toDate(),
    end: nowClone.toDate(),
  });

  const { tittle, location, notes, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setformValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setformValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "La fecha fin debe de ser mayor a la de inicio"
      );
    }
    if (tittle.trim().length < 2) {
      return setTittleValid(false);
    }
    
    dispatch( eventAddNew({
      ...formValues,
      id: new Date().getTime(),
      
    })
       );

    setTittleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo</label>
          <input
            type="text"
            className={`form-control ${!tittleValid && "is-invalid"} `}
            placeholder="Título del evento"
            name="tittle"
            autoComplete="off"
            value={tittle}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>
        <div className="form-group">
          <label>Ubicacion</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ubicacion"
            name="location"
            autoComplete="off"
            value={location}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Ubicacion del trabajo
          </small>
        </div>

        <div className="form-group">
          <label>Notas</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="2"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
