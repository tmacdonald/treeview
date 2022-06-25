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

export function emptyElement(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
