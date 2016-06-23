import { h, Component } from 'preact'
import { bind } from 'decko'
import GitHub from 'github-api'

import RepoList from '../repo-list'
import style from './style'

const gh = new GitHub({
  token: process.env.GH
})

export default class Github extends Component {
  state = {
    user: 'hanford',
    repos: []
  }

  @bind
  fetchUser (e) {
    e.preventDefault()

    return gh
      .getUser(this.state.user)
      .listRepos()
      .then(res => this.setState({ repos: res.data }))
  }

  render ({}, { user, repos }) {
    return (
      <div class={ style.container }>
        <h2>{ user }</h2>
        <div>
          <form onSubmit={ this.fetchUser } class={ style.collector }>
            <input onInput={ this.linkState('user') } value={ user } type="text" placeholder="user"></input>
            <button class={ style.fetchbttn } type="submit">Fetch</button>
          </form>
        </div>
        <RepoList repos={ repos } />
      </div>
    )
  }
}
