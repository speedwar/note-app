import * as React from 'react';
//import * as ReactDOM from "react-dom";
//import cx from 'classnames';

class Props {
}

class State {
  title: string;
  content: string;
  data: any;
}

export class TmForm extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      data: [
        {id: 1, title: "title a string", content: "Lorem ipsum dolor sit amet, consectetue"},
        {id: 2, title: "title another string", content: "nteger tincidunt. Cras dapibu"},
        {id: 3, title: "title thrid string", content: "mcorper ultricies nis"},
      ]
    };
  }

  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    //const { title, content } = this.state;
  }

  handleEdit(e) {
    // TODO: add note edit function
  }

  handleDelete(e) {
    // TODO: add note delete function
  }

  public render() {
    const { title, content } = this.state;

    const card = (
      <div className="tm-note-card">
        <div className="h-spacing-x-small">
          <span className="tm-note-card__title">{title || "Title"}</span>
        </div>
        <div className="h-spacing-x-small">
          <span className="tm-note-card__content">{content || "Content"}</span>
        </div>
        <div className="tm-note-card__control">
          <div className="l-grid">
            <div className="l-grid__item l-grid__item--auto-margin-right">
              <button
                type="button"
                className="tm-button tm-button--small"
                onClick={(e) => this.handleEdit(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="tm-button tm-button--small"
                onClick={(e) => this.handleDelete(e)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="tm-note">
        <div className="tm-note-form">
          <form onSubmit={this.onSubmit}>
            <div className="h-spacing-x-small">
              <input
                type="text"
                name="title"
                className="tm-note-input"
                placeholder="title"
                value={title}
                onChange={this.onChange}
              />
            </div>
            <div className="h-spacing-x-small">
              <textarea
                name="content"
                className="tm-note-input"
                placeholder="content"
                value={content}
                onChange={this.onChange}
              />
            </div>
            <div className="tm-note-form__btn-group">
              <button className="tm-button" type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="tm-note-content">
          {card}
          {card}
          {card}
        </div>
      </div>
    );
  }
}
