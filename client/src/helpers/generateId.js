export const generateId = (str) => {
  let id = str;
  id = 'a' + id.replace(/ /g,"-")
  return id;
}
