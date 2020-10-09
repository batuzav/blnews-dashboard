export const loginQuery = ({ email, password, tokkenApp = "none" }) => `query {
    login(dibNumber: "${email}", password: "${password}", tokkenApp:"${tokkenApp}") {
      user {
        _id,
        dibNumber, email, timezone,
        firstName, lastName, tokkenApp, img, countriesToSee, systemType
      },
      token,
    }
  }`;

export const checkAuthQuery = () => `query{
  checkLogin{
    isAuth,
    uid,
    user{
      _id,
      dibNumber,
      firstName,
      lastName,
      email,
      phone,
      systemType,
      img,
      active 
    }
  }
}`;

export const getUserByIdQuery = (id) => `query{
  getUserById(id:"${id}"){
    _id,
    dibNumber,
    firstName,
    lastName,
    email,
    phone,
    systemType,
    img,
    active   
  }
}`;
