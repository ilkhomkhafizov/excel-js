class Dom {
  constructor(selector) {
    // this.$$listeners = {};
    this.$el = typeof selector === 'string' ?
    document.querySelector(selector) :
    selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    // this.$$listeners[eventType] = callback;
    this.$el.addEventListener(eventType, callback);
  }

  // off(eventType) {
  //   this.$el.removeEventListener(eventType, this.$$listeners[eventType]);
  // }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  get data() {
    return this.$el.dataset;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    // for in не использовать, он пробежит по prototype
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagname, classes = '') => {
  const el = document.createElement(tagname);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
