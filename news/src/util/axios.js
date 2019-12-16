
import axios from 'axios';
import qs from 'qs';
// axios.defaults.baseURL = 'http://localhost:9999';
axios.defaults.baseURL = 'http://xuyanjie.cn:8001';
// axios.defaults.withCredentials = true;  // 携带cookie
axios.defaults.transformRequest = function(data){
	return qs.stringify(data);
}
export default axios;
