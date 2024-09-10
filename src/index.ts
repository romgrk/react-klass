import {
  useRef,
  useState as useStateReact,
  ReactNode
} from 'react'

// class ButtonComponent extends Component {
//   count: State<number>
//   status: State<string>
//   theme: Theme
//
//   setup(props) {
//     this.count = useState(0)
//     this.status = useState('')
//     this.theme = useContext(ThemeProvider)
//
//     useEffect(this.updateStatusEffect, [props.status])
//   }
//
//   updateStatusEffect = (props) => {
//     const id = setTimeout(() => {
//       this.status.set('new status')
//     }, 1000)
//     return () => clearTimeout(id)
//   }
//
//   onClick = () => {
//     this.count.set(this.count.value + 1)
//   }
//
//   render(props) {
//     return (
//       <button onClick={this.onClick} style={{ color: this.theme.color }}>
//         {this.count.value} {this.status.value}
//       </button>
//     )
//   }
// }
// const Button = create(ButtonComponent)

export class Component<State = {}, Props = {}> {
  state: State = {} as State;

  constructor(props: Props) {
    this.setup(props)
  }

  setup(props: Props) {}

  render(props: Props): ReactNode {
    return null
  }
}

const UNINITIALIZED = {}

function useInstance<S, P, T extends Component<S, P>>(init: (props: P) => T, props: P) {
  const ref = useRef(UNINITIALIZED as T)
  if (ref.current === UNINITIALIZED) {
    ref.current = init(props)
  } else {
    ref.current.setup(props)
  }
  return ref.current
}

export function useState<T>(init: T | (() => T)) {
  const [value, set] = useStateReact(init)
  return {
    value,
    set,
  }
}

export function create<S, P, T extends Component<S, P>>(klass: { new(props: P): T }) {
  function initialize(props: P) {
    return new klass(props)
  }

  function ComponentFunction(props: any) {
    const instance = useInstance(initialize, props)

    return instance.render(props)
  }

  return ComponentFunction
}
