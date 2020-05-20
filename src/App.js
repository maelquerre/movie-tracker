import React from 'react'
import './App.css'

import * as firebase from 'firebase'
import config from './config'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    firebase.initializeApp(config)

    this.state = {
      developers: []
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData()
    }
  }

  writeUserData = () => {
    firebase
      .database()
      .ref('/')
      .set(this.state)
    console.log('DATA SAVED')
  }

  getUserData = () => {
    let ref = firebase.database().ref('/')
    ref.on('value', snapshot => {
      const state = snapshot.val()
      this.setState(state)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let titre = this.refs.titre.value
    let genre = this.refs.genre.value
    let note = this.refs.note.value
    let uid = this.refs.uid.value

    if (uid && titre && genre && note) {
      const { developers } = this.state
      const devIndex = developers.findIndex(data => {
        return data.uid === uid
      })
      developers[devIndex].titre = titre
      developers[devIndex].genre = genre
      this.setState({ developers })
    } else if (titre && genre && note) {
      const uid = new Date().getTime().toString()
      const { developers } = this.state
      developers.push({ uid, titre, genre, note })
      this.setState({ developers })
    }

    this.refs.titre.value = ''
    this.refs.genre.value = ''
    this.refs.note.value = ''
    this.refs.uid.value = ''
  }

  removeData = developer => {
    const { developers } = this.state
    const newState = developers.filter(data => {
      return data.uid !== developer.uid
    })
    this.setState({ developers: newState })
  }

  updateData = developer => {
    this.refs.uid.value = developer.uid
    this.refs.titre.value = developer.titre
    this.refs.note.value = developer.note
    this.refs.genre.value = developer.genre
  }

  render() {
    const { developers } = this.state
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-xl-12'>
            <h1>Add new team member here</h1>
            <form onSubmit={this.handleSubmit}>
              <div className='form-row'>
                <input type='hidden' ref='uid' />
                <div className='form-group col-md-6'>
                  <label>Titre du film</label>
                  <input
                    type='text'
                    ref='titre'
                    className='form-control'
                    placeholder='titre'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label> Genre du film</label>
                  <input
                    type='text'
                    ref='genre'
                    className='form-control'
                    placeholder='genre'
                  />
                </div>
              </div>
              <div className='form-group col-md-6'>
                <label>note</label>
                <input
                  type='text'
                  ref='note'
                  className='form-control'
                  placeholder='Note'
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Save
              </button>
            </form>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12'>
              <h1>Firebase Development Team</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-12'>
              {developers.map(developer => (
                <div
                  key={developer.uid}
                  className='card float-left'
                  style={{ width: '18rem', marginRight: '1rem' }}
                >
                  <div className='card-body'>
                    <h5 className='card-title'>
                      {' '}
                      Le titre est {developer.titre}
                    </h5>
                    <p className='card-text'>le genre est {developer.genre}</p>
                    <p className='card-text'>
                      la note est de {developer.note} sur 100
                    </p>
                    <button
                      onClick={() => this.removeData(developer)}
                      className='btn btn-link'
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.updateData(developer)}
                      className='btn btn-link'
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='row'>
            <div className='col-xl-12'>
              <h3>
                Tutorial{' '}
                <a href='https://sebhastian.com/react-firebase-real-time-database-guide'>
                  here
                </a>
              </h3>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
