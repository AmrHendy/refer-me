import store from './store';

function get_attr(key_str){
    if(key_str === "email"){
        return localStorage.getItem('email');
    }
    return null;
}

export default get_attr;
  