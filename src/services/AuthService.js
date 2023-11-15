import $api from "../http";

export default class AuthService {
  static async login(email, password){
    const formData = new FormData()
    formData.append("username", email)
    formData.append("password", password)
    return $api.post("users/login", formData)
      .then(response => response.data)
  }

  static async register(email, password, username){
    return $api.post("users", {email, password, "name": username})
        .then(response => response.data)
  }

  static async logout(){
    return $api.get("users/log_out", )
        .then(response => response.data)
  }
}
