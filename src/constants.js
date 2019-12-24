import Cookies from 'universal-cookie';
const cookies = new Cookies();


// 'X-Auth-Token': '4906a86a-b306-489b-b85b-e1995b8f6800'



if (false) { //window.location.hostname.indexOf("localhost") != -1
    var CONSTANTS = {
        BASE_URL:"https://billsbe.payboard.in/api/v1/",
        HEADERS: {
            'Content-Type': 'application/json',
            'X-Auth-Id' : 'a02ffd91ece5e7efeb46db8f10a74059'
        }
    }
} else {
    var CONSTANTS = {
        BASE_URL:"https://billsbe.payboard.in/api/v1/",
        HEADERS: {
              'Content-Type': 'application/json',
        }
    }
    if(cookies.get("X-Auth-Token")){
      CONSTANTS.HEADERS['X-Auth-Token']=cookies.get("X-Auth-Token")
    }
}
export default CONSTANTS;