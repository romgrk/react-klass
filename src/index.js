import { useRef } from 'react';
// class ButtonComponent {
//   render() {
//   }
// }
// const Button = component(ButtonComponent)
const UNINITIALIZED = {};
function useInit(init) {
    const ref = useRef(UNINITIALIZED);
    if (ref.current === UNINITIALIZED) {
        ref.current = init();
    }
    return ref.current;
}
class ComponentBase {
    render() {
        return null;
    }
}
function component(klass) {
    function initialize() {
        return new klass();
    }
    function Component(props) {
        const instance = useInit(initialize);
        return instance.render();
    }
}
