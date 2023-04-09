export const wrapPromise = (promise)=>{
  let result;
  let status = 'pending';
  let suspender = promise.then(
    value => {
      result = value;
      status = 'success'
    },
    error =>{
      result = error;
      status = 'error'
    }
  )


  return {
    read (){
      if(status === 'pending'){
        throw suspender;
      }else if(status === 'error'){
        throw result
      }else {
        return result;
      }
    }
  }
}