import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ModesList from "views/other/components/ModesList";
import AliasService from "services/AppServices/AliasService";
import { useStateAsync } from "helpers/custom-hooks";
import { requestWithLoader } from "helpers/antd-functions";
import { APP_MAIN_PREFIX_PATH, FULL_DATA_REQUEST } from "configs/AppConfig";
import { message } from "antd";


const AliasList = () => {

  const history = useHistory();

  const requestModes = useCallback(() => AliasService.get(), []);
  const  { request, isLoading, state } = useStateAsync(requestModes, []);

  const handleModeDelete = modeID => {
    const deleteMode = requestWithLoader(AliasService.del);

    deleteMode(modeID)
      .then(() => request())
  };

  const moveToAddMode = () => {
    history.push(`${APP_MAIN_PREFIX_PATH}/alias/add`);
  };

  const moveToEditMode = id => {
    history.push(`${APP_MAIN_PREFIX_PATH}/alias/edit/${id}`);
  };

  const handleDownloadClick = () => {
    AliasService.get(FULL_DATA_REQUEST)
      .then((json) => {

        const JSONdata = "data: text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json, null, 2));

        const link = document.createElement("a");
        link.download = "data.json";
        link.href = JSONdata;
        link.click();
        link.remove();
      })
      .catch(() => message.error("Не удалось скачать файл. Пожалуйста, попробуйте позже."));
  };

  return (
    <ModesList 
      isLoading={isLoading}
      data={state}
      onAddClick={moveToAddMode}
      onEditClick={moveToEditMode}
      onDelClick={handleModeDelete}
      onDownloadClick={handleDownloadClick}
    />
  );
};

export default AliasList;