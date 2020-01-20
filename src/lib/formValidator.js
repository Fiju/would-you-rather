export const validateForm = form => {
  return Boolean(form.id && form.name && form.avatarURL);
};
