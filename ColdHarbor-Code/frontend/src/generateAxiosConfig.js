const generateAxiosConfig = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Handle the case where the user is not logged in
      return null;
    }
  
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
  };
  
  export default generateAxiosConfig;
  