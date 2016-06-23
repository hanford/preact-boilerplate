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
  fetchUser () {
    var user = gh.getUser(this.state.user)

    return user.listRepos()
      .then(res => this.setState({repos: res.data}))
  }

  render ({}, { user, repos }) {
    return (
      <div class={style.container}>
        <h2>{ user }</h2>
        <div class={style.collector}>
          <input onInput={this.linkState('user')} type="text" placeholder="user" value={ user }></input>
          <button class={style.fetchbttn} onClick={ this.fetchUser }>Fetch</button>
        </div>
        <RepoList repos={ repos } />
      </div>
    )
  }
}
