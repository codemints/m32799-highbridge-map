export const setAttrs = (el, attrs, cased) => {
  for ( const key in attrs ) {
    cased ? el.setAttribute(key, attrs[key]) : el.setAttribute(key.replace(/[A-Z]/g, (str) => `-${str.toLowerCase()}`), attrs[key])
  }
}

export const addStyles = (el, styles) => {
  for ( const key in styles ) el.style[key] = styles[key]
}

export const defaultConfig = {

}

export const createConfig = () => {

}