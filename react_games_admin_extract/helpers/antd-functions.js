import { message } from "antd";
import { FORM_MESSAGES } from "configs/AppConfig";
import { isFunction } from "helpers/native-functions";

export const requestWithLoader = (request=null, onSuccess=null, onFail=null, messages=FORM_MESSAGES) => {
  
  if (!isFunction(request)) {
    console.error("Please provide a request funcion reference");
    return;
  }

  const { loading, success, error } = messages;
  const MESSAGE_KEY = "KEY";

  return (...args) => {
    message.loading({ content: loading, duration: 0, key: MESSAGE_KEY });
    return request(...args)
      .then(() => {
        message.success({ content: success, duration: 1, key: MESSAGE_KEY });
        onSuccess && onSuccess();
    })
      .catch(() => {
        message.error({ content: error, duration: 1, key: MESSAGE_KEY });
        onFail && onFail();
      });
  }
};