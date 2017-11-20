import * as React from 'react';
//import cx from 'classnames';

class Props {
}

class State {
}

export class TmHeader extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
    };
  }


  public render() {

    return (
      <div className="tm-header">
        <div className="l-grid l-grid--align-middle">
          <div className="l-grid__item">
            <span className="tm-header__title">Note Application</span>
          </div>
        </div>
      </div>
    );
  }
}
