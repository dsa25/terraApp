function getTime() {
  let time = new Date()
  let dd = time.getDate()
  let mo = time.getMonth() + 1
  let yy = time.getFullYear().toString()
  if (mo < 10) mo = "0" + mo
  if (dd < 10) dd = "0" + dd
  return `${dd}.${mo}.${yy}`
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function checkEmpty(arr) {
  let result = false
  for (const item of arr) {
    if (item.trim().length == 0) {
      result = true
      break
    }
  }
  return result
}

function checkEmptyChild(arr) {
  let result = false
  for (const item of arr) {
    if (item.input.trim().length == 0) {
      result = true
      break
    }
  }
  return result
}

function checkOneChecked(arr) {
  let result = false
  for (const item of arr) {
    if (item.check) {
      result = true
      break
    }
  }
  return result
}

export { deepClone, getTime, checkEmpty, checkEmptyChild, checkOneChecked }
