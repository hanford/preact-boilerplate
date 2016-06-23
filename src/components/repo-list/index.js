import { h, render, Component } from 'preact'
import Card from '../card'
import style from './style'

export default class RepoList extends Component {
  render ({ repos }, {}) {
    return (
      <div class={ style.repolist }>
        { repos.map(repo => <Card repoName={ repo.name } />) }
      </div>
    )
  }
}
