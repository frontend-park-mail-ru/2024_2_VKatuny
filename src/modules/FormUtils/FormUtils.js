export const getFormData = (formHtml) => {
  const formData = new FormData(formHtml);
  const dataObj = {};
  formData.entries().forEach((entry) => {
    dataObj[entry[0]] = entry[1];
  });
  return dataObj;
};
