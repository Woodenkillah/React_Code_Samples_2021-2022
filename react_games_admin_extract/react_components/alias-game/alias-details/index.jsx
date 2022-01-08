import { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { message } from "antd";
import ModeDetails from "views/other/components/ModeDetails";
import { useStateAsync } from "helpers/custom-hooks";
import { setMultipartForm, getBase64 } from "helpers/native-functions";
import { requestWithLoader } from "helpers/antd-functions";
import AliasService from "services/AppServices/AliasService";

const gameOptions = [
  { 
    key: "words",
    adderTitle: "Описание на карточке",
    listTitle: "Состав подборки"
  }
];

const initState = {
  words: [],
  name: "",
  paid: false,
  image: null
};


const AliasDetails = () => {

  const history = useHistory();

  const params = useParams();

  const modeID = parseInt(params.id, 10) || null;
  const isModeEdit = !!modeID;

  const requestModes = useCallback(() => AliasService.getById(modeID), [modeID]);
  const { state, setState } = useStateAsync(requestModes, initState, isModeEdit);

  const moveBack = () => {
    history.go(-1);
  };

  const handleAccessChange = value => {
    setState(prev => ({
    ...prev,
    paid: value
  }))};

  const handleInputChange = (value, key) => {
    setState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleValueAdd = (key, value) => setState(prev => {
    if (!value) {
      return prev;
    }

    const optionsList = [...prev[key]];

    if (optionsList.includes(value)) {
      message.warning("Такое слово уже добавлено!");
      return prev;
    }

    optionsList.push(value);

    return ({
      ...prev,
      [key]: optionsList
    });
  });

  const handleValueRemove = (key, value) => setState(prev => {
    const optionsList = (prev[key] || []).filter(item => item !== value);

    return ({
      ...prev,
      [key]: optionsList
    });
  });

  const handleImageAdd = async data => {
    await getBase64(data.file)
    .then((image) => setState(prev => ({
      ...prev,
      image
    })));
  };

  const handleImageRemove = () => setState(prev => ({
    ...prev,
    image: null
  }));

  const handleFormSubmit = () => {
    if (!state.image) {
      message.warning("Пожалуйста, добавьте изображение для обложки");
      return;
    }
    
    const submittedForm = setMultipartForm(state);

    const addGameMode = requestWithLoader(AliasService.post, moveBack);
    const editGameMode = requestWithLoader(AliasService.patch, moveBack);

    if (isModeEdit) {
      editGameMode(modeID, submittedForm);
    } else {
      addGameMode(submittedForm);
    }
  };

  return (
    <ModeDetails
      data={state}
      options={gameOptions}
      onCancelClick={moveBack}
      onAccessChange={handleAccessChange}
      onInputChange={handleInputChange}
      onItemAdd={handleValueAdd}
      onItemRemove={handleValueRemove}
      onFormSubmit={handleFormSubmit}
      onImageRemove={handleImageRemove}
      onImageAdd={handleImageAdd}
    />
  );
};

export default AliasDetails;