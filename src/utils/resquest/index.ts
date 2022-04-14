import Resquest from './classResquest';

export default new Resquest({
  timeout: 5000,
  baseURL: '/api',
  instanceConfig: {
    resquest(config) {
      return config;
    },
    resquestCatch(err) {
      return err;
    },
    response(res) {
      return res.data;
    },
    responseCatch(err) {
      return err;
    }
  }
});
