export const validateForm = form => {
  return Boolean(form.username && form.name && form.avatarURL);
};
