/**
 * Given a parent element, event type, and target, creates a high level event handler
 * to prevent having to add and remove event handlers on individual elements
 *
 * @param {*} el A parent element to attach an event handler to
 * @param {*} type An event type (ie. click)
 * @param {*} target A target element to attach an event handler to
 * @param {*} callback The event handler
 */
export function delegateEvent(el, type, targets, callback) {
  el.addEventListener(type, (e) => {
    if (targets.some((target) => e.target.matches(target))) {
      callback(e);
    }
  });
}

/**
 * Moderate shorthand for creating dom elements
 *
 * @param {*} tagName The type of element being created
 * @param {*} attributes a map of attributes
 * @param {*} classes A list of string classes
 * @param {*} children A list of elements/strings
 * @returns
 */
export function createElement(
  tagName,
  attributes = {},
  classes = [],
  children = []
) {
  const calculatedAttributes =
    typeof attributes === "function" ? attributes() : attributes;
  const calculatedClasses = typeof classes === "function" ? classes() : classes;
  const calculatedChildren =
    typeof children === "function" ? children() : children;

  const element = document.createElement(tagName);
  Object.entries(calculatedAttributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  calculatedClasses.forEach((c) => element.classList.add(c));
  calculatedChildren.forEach((c) => element.append(c));
  return element;
}

export function emptyElement(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
