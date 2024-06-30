const set_session = (req, user_Id) => {
  if (req.session) {
    req.session.user_id = user_Id.toString()
  }
}

const get_session_loggedIn = (req) => {
  if (req.session && req.session.user_id) {
    return req.session.user_id
  } else {
    return null
  }
}

module.exports = {
  get_session_loggedIn,
  set_session
}
