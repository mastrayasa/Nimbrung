export default function (Vue) {
	Vue.auth = {
		setLogin (isLogin) {
			localStorage.setItem('isLogin', isLogin)
		},

		getLogin () {
			var isLogin = localStorage.getItem('isLogin')

			if (!isLogin) {
				return null
			}

			return isLogin
		},

		destroy () {
			localStorage.removeItem('isLogin')
		},

		isLogin () {
			if (this.getLogin()) {
				return true
			} else {
				return false
			}
		}
	}

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get: () => {
				return Vue.auth
			}
		}
	})
}