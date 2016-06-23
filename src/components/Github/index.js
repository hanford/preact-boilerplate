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

    var user = gh.getUser(this.state.user)

    return user.listRepos()
      .then(res => this.setState({repos: res.data}))
  }

  render ({}, { user, repos }) {
    return (
      <div class={style.container}>
        <h2>{ user }</h2>
        <div>
          <form onSubmit={ this.fetchUser } class={style.collector}>
            <input onInput={this.linkState('user')} type="text" placeholder="user" value={ user }></input>
            <button type="submit" class={style.fetchbttn}>Fetch</button>
          </form>
        </div>
        <RepoList repos={ repos } />
      </div>
    )
  }
}
