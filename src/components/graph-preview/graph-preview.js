import * as styles from './graph-preview.scss';

export default class GraphPreviewComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    this._chart = value;
    this._renderGraphs();
  }

  get chart() {
    return this._chart;
  }

  connectedCallback() {
    this.viewportPreviewEl.addEventListener('boundsChange', ({ detail }) =>
      this._dispatchBoundsChangeEvent(detail),
    );
  }

  _dispatchBoundsChangeEvent(detail) {
    const event = new CustomEvent('boundsChange', { detail });

    this.dispatchEvent(event);
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    this.viewportPreviewEl = document.createElement('viewport-preview');
    this.viewportPreviewEl.parentEl = this;

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.viewportPreviewEl);
  }

  _renderGraphs() {
    this.chart.graphs.forEach(g => {
      const graphView = document.createElement('graph-view');
      graphView.graph = g;

      this.shadowRoot.appendChild(graphView);
    });
  }
}
