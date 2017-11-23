import * as React from 'react';
import { Modal }from 'react-bootstrap';
import cx from 'classnames';

class Props {
}

class State {
  title: string;
  content: string;
  error: boolean;
  noteIndex: number;
  modalShow: boolean;
  data: any;
}

export class TmForm extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      error: false,
      noteIndex: -1,
      modalShow: false,
      data: [
        {title: "title a string", content: "Lorem ipsum dolor sit amet, consectetue"},
        {title: "title another string", content: "nteger tincidunt. Cras dapibu"},
        {title: "title thrid string", content: "mcorper ultricies nis"},
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
    const { title, content } = this.state;

    if (title === '' && content === '') {
      this.setState({ error: true });
      console.log('Error: one of the field must be entered');
      return false;
    }

    const array = this.state.data;
    const newNote = { title: title, content: content };
    array.push(newNote);

    this.setState({ data: array, title: '', content: '' });
  }

  handleEdit(i: number) {
    this.setState({
      modalShow: true,
      noteIndex: i,
      error: false
    });
  }

  handleEditSubmit() {
    const { title, content, noteIndex } = this.state;
    let newNote = this.state.data.slice(); //copy the array

    if (title === '' && content === '') {
      this.setState({ error: true });
      console.log('Error: one of the field must be entered');
      return false;
    }

    newNote[noteIndex] = { title: title, content: content };
    this.setState({ data: newNote,  modalShow: false, title: '', content: '' });
  }

  handleDelete(i: number) {
    const array = this.state.data;
    array.splice(i, 1);
    this.setState({ data: array })
  }

  public render() {
    const { title, content } = this.state;
    let close = () => this.setState({ modalShow: false });

    const renderModel = (
      <div className="modal-container">
        <Modal
          show={this.state.modalShow}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title">Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="h-spacing-x-small">
              <input
                type="text"
                name="title"
                className={cx({'tm-note-input': true, 'is-error':this.state.error})}
                placeholder="title"
                value={title}
                onChange={this.onChange}
              />
            </div>
            <div className="h-spacing-x-small">
              <textarea
                name="content"
                className={cx({'tm-note-input': true, 'is-error':this.state.error})}
                placeholder="content"
                value={content}
                onChange={this.onChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="tm-button" onClick={() => this.handleEditSubmit()}>Save</button>
            <button className="tm-button" onClick={close}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    const renderNote = this.state.data.map((data, i) => {
      return (
        <div className="tm-note-card" key={i} data-note-id={data.id}>
          <div className="h-spacing-x-small">
            <span className="tm-note-card__title">{data.title || "Title"}</span>
          </div>
          <div className="h-spacing-x-small">
            <span className="tm-note-card__content">{data.content || "Content"}</span>
          </div>
          <div className="tm-note-card__control">
            <div className="l-grid">
              <div className="l-grid__item l-grid__item--auto-margin-right">
                <button
                  type="button"
                  className="tm-button tm-button--small"
                  onClick={this.handleEdit.bind(this, i)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="tm-button tm-button--small"
                  onClick={this.handleDelete.bind(this, i)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="tm-note">
        {renderModel}
        <div className="tm-note-form">
          <form onSubmit={this.onSubmit}>
            <div className="h-spacing-x-small">
              <input
                type="text"
                name="title"
                className={cx({'tm-note-input': true, 'is-error':this.state.error})}
                placeholder="title"
                value={title}
                onChange={this.onChange}
              />
            </div>
            <div className="h-spacing-x-small">
              <textarea
                name="content"
                className={cx({'tm-note-input': true, 'is-error':this.state.error})}
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
          {renderNote}
        </div>
      </div>
    );
  }
}
