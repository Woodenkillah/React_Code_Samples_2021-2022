import { APP_PREFIX_PATH } from "configs/AppConfig";
import history from "../history";
import { nanoid } from "nanoid";

const NANOID_NUM = 3;

export const isFunction = valueOrFunction => {
  return typeof valueOrFunction === "function";
};


export const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};


export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};


export const reloadToEntryRoute = () => {
  history.push(APP_PREFIX_PATH);
  window.location.reload();
};


export const setMultipartForm = (formItem) => {
  const form = new FormData();

  const arrayKeys = ["words", "truth", "dare", "texts"];

  for (let key in formItem) {
    if (key !== "image" && !arrayKeys.includes(key)) {
      form.append(key, typeof formItem[key] === "object"
      ? JSON.stringify(formItem[key])
      : formItem[key]);
    }

    if (key === "image") {
      if (formItem[key]?.includes("data:image/")) {
        const ext = formItem[key].split(";")[0].split("/")[1];
        const name = `image-${nanoid(NANOID_NUM)}.${ext}`;
    
        const file = dataURLtoFile(formItem[key], name);
          
        form.append(key, file);
      }

      if (!formItem[key]) {
        form.append(key, null);
      }
    }

    if (arrayKeys.includes(key)) {

      if (formItem[key].length) {
        formItem[key].forEach(item => {
          form.append(key, item);
        })
      }

      if (!formItem[key].length) {
        form.append(key, JSON.stringify(formItem[key]));
      }
    }
  }

  return form;
};