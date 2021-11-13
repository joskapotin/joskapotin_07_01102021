/**
 * Sanitize a string
 * @param {string} string - raw string
 * @return {string} sanitized string
 */
const sanitize = string => {
  const regex = new RegExp(/"/g)
  return string.toLowerCase().replace(regex, " ")
}

export { sanitize }
