import * as React from 'react';
import { TmForm } from './components/index';
import { TmHeader } from './components/index';

class Props {
}

export default class App extends React.Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="tm-app">
        <TmHeader />
        <TmForm />
      </div>
    );
  }
}
