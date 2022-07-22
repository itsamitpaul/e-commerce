export const AuthorizeUser = () =>{
    const userData = localStorage.getItem("userData");
    if(userData && JSON.parse(userData).userLoggedIn){
        return true;
    }
    else{
        return false;
    }
}