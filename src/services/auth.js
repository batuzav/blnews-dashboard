export const loginQuery = ({ email, password, tokkenApp = "none" }) => `query {
    login(dibNumber: "${email}", password: "${password}", tokkenApp:"${tokkenApp}") {
      user {
        _id,
        dibNumber, email, timezone,
        firstName, lastName, tokkenApp, img, countriesToSee
      },
      token,
    }
  }`;
