import authHeader from "./auth-header";

const getFreeRecordsByType = (id) => {
    return fetch('http://localhost:8080/api/user/free/category/'+id, {
      method: "GET",
      headers: authHeader()
    })

  }
  const getActiveRecords = () => {
    return fetch('http://localhost:8080/api/user/active', {
      method: "GET",
      headers: authHeader()
    })

  }
  const getArchiveRecords = () => {
    return fetch('http://localhost:8080/api/user/archive', {
      method: "GET",
      headers: authHeader()
    })

  }
  const createRecord = (id) => {
    return fetch('http://localhost:8080/api/user/record/'+id, {
      method: "POST",
      headers: authHeader()
    })

  }
  export default {
    getFreeRecordsByType,
    createRecord,
    getActiveRecords,
    getArchiveRecords
  };