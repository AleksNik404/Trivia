class Control<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, dataSet = '', tagname = 'div', className = '', content = '') {
    const el = document.createElement(tagname);
    el.className = className;
    el.textContent = content;
    el.dataset.set = dataSet;

    if (parentNode) {
      parentNode.append(el);
    }

    this.node = el as NodeType;
  }

  destroy() {
    this.node.remove();
  }
}

export default Control;
