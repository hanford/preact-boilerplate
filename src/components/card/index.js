import { h, render, Component } from 'preact'
import style from './style'

export default class Card extends Component {
  render ({ repoName }) {
    return (
      <div class={ style.card }>
        { repoName }
      </div>
    )
  }
}
