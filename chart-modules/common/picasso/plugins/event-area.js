export default function init(Picasso) {
  // Transparent component, placed on top of the data area and used to register event on
  Picasso.component('event-area', {
    mounted(element) {
      element.classList.add('event-area');
      element.style.pointerEvents = 'auto';
      element.style.zIndex = 1;
    },
    render() {
      const nodes = [];
      return nodes;
    },
  });
}
