import AbstractView from '../views/abstract-view';

const Positions = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const createElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.insertAdjacentHTML('beforeend', template);

  return wrapper.firstChild;
};

const render = (container, child, position) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  container.insertAdjacentElement(position, child);
};

const replace = (oldItem, newItem) => {
  if (oldItem instanceof AbstractView) {
    oldItem = oldItem.getElement();
  }

  if (newItem instanceof AbstractView) {
    newItem = newItem.getElement();
  }

  if (oldItem === null || newItem === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  oldItem.replaceWith(newItem);
};

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { Positions, createElement, render, replace, remove, isEscape };
