import { h, Component } from 'preact'
import style from './style'
import GitHub from 'github-api'

const gh = new GitHub()


export default class Github extends Component {
	state = {
		user: '',
		repos: []
	}

	fetchUser () {
		var user = gh.getUser(this.state.user)
		user.listRepos().then(function (err, data) {
			console.log(data)
		})
	}

	render ({}, {login, password}) {
		return (
			<div class={style.container}>
				<input onInput={this.linkState('user')} type="text" placeholder="user"></input>
				<button onClick={ ::this.fetchUser }>login</button>
			</div>
		)
	}
}
