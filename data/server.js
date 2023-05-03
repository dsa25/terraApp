// const url = "http://127.0.0.1:5000"
const url = import.meta.env.SERVER_URL


export const server = {
  users: url + "/users",
  addInspect: url + "/addInspect",
  updateInspect: url + "/updateInspect"
  // allInspects: url + "/allInspects",
  // allNewInspects: url + "/allNewInspects",
  // getEditedInspects: url + "/getEditedInspects",
  // allVers: url + "/allVers",
}
