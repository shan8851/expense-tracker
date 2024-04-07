declare module '@tawk.to/tawk-messenger-react' {
  interface TawkMessengerReactProps {
    propertyId: string;
    widgetId: string;
  }

  export default class TawkMessengerReact extends React.Component<TawkMessengerReactProps> {}
}
