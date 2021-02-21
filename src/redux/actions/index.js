export function fetchArticleDetails() {
    return function(dispatch) {
      return axios.get(`https://mfl-capn.herokuapp.com/Mfl/deadCapInfo`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000'
        }
        }).then(({ data }) => {
            dispatch(loadOwners(data));
        });
        };
  }