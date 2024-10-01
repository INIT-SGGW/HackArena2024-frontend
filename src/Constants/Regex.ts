const PasswordRegex = String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,=?\/\\<>+_\{\}\[\]\|\(\)\;\:'"\-]).{8,}$`;
const TextRegex = String.raw`^[A-Za-zÀ-ÖØ-öø-ÿąćółżźńęĄĆÓŁŻŹŃĘ' \-]+$`;
const EmailRegex = String.raw`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`;
export { PasswordRegex, TextRegex, EmailRegex };