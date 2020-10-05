import React, { useEffect, useState } from "react";
import Modal from "react-modal";
// import { Select, Input, MenuItem } from "@material-ui/core";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Select from "react-select";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  campaignAddNew,
  campaignRemoveActive,
  campaignUpdated,
} from "../../actions/campaign";

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
const now = moment().minutes(0).seconds(0).add(1, "hours");
const end = now.clone().add(1, "hours");
const initForm = {
  title: "",
  subtitle: "",
  country: [],
  img: "",
  description: "",
  imageBody: "",
  startDate: now.toDate(),
  endDate: end.toDate(),
  userCreate: { name: "Pedro" },
};
export const CountriesOptions = [
  { value: "MEX", label: "México" },
  { value: "PER", label: "Perú" },
  { value: "SAL", label: "El Salvador" },
  { value: "PAN", label: "Panamá" },
  { value: "BOL", label: "Bolivia" },
  { value: "USA", label: "United States" },
];
Modal.setAppElement("#root");
export const CampaignModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeCampaign } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  const [showBodyImgInput, setShowBodyImgInput] = useState(false);
  const [validateForm, setValidateForm] = useState({
    titleValid: true,
    subtitleValid: true,
    descriptionValid: true,
    imgValid: true,
  });
  const [formValues, setFormValues] = useState(initForm);
  const { startDate, endDate } = formValues;
  useEffect(() => {
    if (activeCampaign) {
      console.log("activeCampaign", activeCampaign);
      setFormValues(activeCampaign);
    } else {
      setFormValues(initForm);
    }
  }, [activeCampaign, setFormValues]);
  const closeModal = () => {
    console.log("GOLA");
    dispatch(uiCloseModal());
    dispatch(campaignRemoveActive());
    setFormValues(initForm);
  };
  const handleStartDateChange = (e) => {
    setFormValues({
      ...formValues,
      startDate: e,
    });
  };
  const handleEndDateChange = (e) => {
    setFormValues({
      ...formValues,
      endDate: e,
    });
  };
  const handleSelectChange = (e) => {
    let value = [];
    e !== null
      ? e.map((event) => {
          value.push(event);
        })
      : (value = []);
    setFormValues({
      ...formValues,
      country: value,
    });
  };
  const handleCheckImgBodyChange = (e) => {
    setShowBodyImgInput(!showBodyImgInput);
  };
  const handleChangeInput = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const handleSumitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(startDate);
    const momentEnd = moment(endDate);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "La fecha de fin debe ser mayor a la fecha de inicio =(",
        "error"
      );
    }
    if (formValues.title.trim() < 2) {
      return setValidateForm({ titleValid: false });
    }
    if (formValues.subtitle.trim() < 2) {
      return setValidateForm({ subtitleValid: true });
    }
    if (formValues.description.trim() < 2 && !showBodyImgInput) {
      return setValidateForm({ descriptionValid: false });
    }
    if (formValues.country.length === 0) {
      return Swal.fire("Error", "No has seleccionado ningún país =(", "error");
    }

    if (activeCampaign) {
      dispatch(campaignUpdated(formValues));
    } else {
      dispatch(
        campaignAddNew({
          ...formValues,
          id: new Date().getTime(),
        })
      );
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      {activeCampaign !== null ? (
        <h1>Editar Campaña</h1>
      ) : (
        <h1> Nueva Campaña </h1>
      )}
      <hr />
      <form className="container" onSubmit={handleSumitForm}>
        <div className="form-group">
          <label>Fecha y hora de inicio</label>
          <br />
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora de fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo</label>
          <input
            type="text"
            className={`form-control ${
              !validateForm.titleValid && "is-invalid"
            }`}
            placeholder="Título de la campaña"
            name="title"
            value={formValues.title}
            autoComplete="off"
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            Tutulo principal de la campaña
          </small>
        </div>
        <div className="form-group">
          <label>Subtitulo</label>
          <input
            type="text"
            className={`form-control ${
              !validateForm.subtitleValid && "is-invalid"
            }`}
            placeholder="Subtitulo de la campaña"
            name="subtitle"
            autoComplete="off"
            value={formValues.subtitle}
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>
        <div className="form-group">
          <label>Países</label>
          <Select
            isMulti
            name="country"
            value={formValues.country}
            options={CountriesOptions}
            placeholder="Seleccionar países"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />

          <small className="form-text text-muted">
            Países donde se verá la campaña
          </small>
        </div>
        <div className="form-group ">
          <label>Imagen principal</label>
          <input
            type="file"
            className="form-control"
            value={formValues.img}
            autoComplete="off"
            name="img"
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            La imagen principal del campaña
          </small>
        </div>

        <div className="form-group">
          <input type="checkbox" onClick={handleCheckImgBodyChange} />
          <label style={{ marginLeft: 4 }}>
            {" "}
            Imagen como cuerpo de la campaña
          </label>
        </div>

        {!showBodyImgInput ? (
          <div className="form-group">
            <textarea
              type="text"
              className={`form-control ${
                !validateForm.descriptionValid && "is-invalid"
              }`}
              placeholder="Descripcion de la campaña"
              rows="5"
              value={formValues.description}
              name="description"
              onChange={handleChangeInput}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Cuerpo de la campaña
            </small>
          </div>
        ) : (
          <div className="form-group ">
            <label>Imagen para el cuerpo de la campaña</label>
            <input
              type="file"
              className="form-control"
              autoComplete="off"
              name="imageBody"
              value={formValues.imageBody}
              onChange={handleChangeInput}
            />
            <small id="emailHelp" className="form-text text-muted">
              La imagen para el cuerpo de la campaña
            </small>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
          style={{ marginBottom: 15 }}
        >
          <i className="far fa-save"></i>
          <span> {activeCampaign !== null ? "Editar" : "Guardar"}</span>
        </button>
      </form>
    </Modal>
  );
};
