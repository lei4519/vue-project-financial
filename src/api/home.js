import axios from 'axios'

export default () => {
  return axios.get('https://ms.jr.jd.com/gw/generic/base/h5/m/baseGetOutH5MessageListNew')
}