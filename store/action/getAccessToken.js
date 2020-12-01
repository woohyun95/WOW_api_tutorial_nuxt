import secret from '../apiAccount'


export function getAccessToken(store) {
  let data = `client_id=${secret.clientID}&client_secret=${secret.clientSecret}&grant_type=client_credentials`
  return this.$axios.$post('https://us.battle.net/oauth/token', data)
    .then(function (response) {
      console.log(response)
      store.commit('setAccessToken', response.access_token)
      return true
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
}

