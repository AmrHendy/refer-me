import store from './store';

function get_attr(key_str){
    console.log('key_str', key_str);
    if(key_str === "email"){
        console.log('enter');
        return localStorage.getItem('email');
    }
    return null;
}

export default get_attr;
  