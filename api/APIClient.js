import superagent from 'superagent';

const baseAPIUrl = 'http://localhost:8080';

export default class APIClient {
  constructor() {
    this.getInventoryList = () => {
      return sendRequest('/stock', 'GET');
    }
    this.postStockItem = (params) => {
      return sendRequest(`/stock`, 'POST', params);
    }
    this.getStockItemByUuid = (uuid) => {
      return sendRequest(`/stock/${uuid}`, 'GET');
    }

    function sendRequest(query, type, params) {
      return new Promise((resolve, reject) => {
        let request;
        if (type === 'GET') {
          request = superagent.get(`${baseAPIUrl}${query}`);
        } else {
          request = superagent.post(`${baseAPIUrl}${query}`);
          request.send(params)
        }
        request.end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
      });
    }
  }
}
