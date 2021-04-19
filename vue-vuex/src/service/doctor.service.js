import authHeader from "./auth-header";

const getCategories = () => {
    return fetch('http://localhost:8080/api/categories', {
      method: "GET"
    })
  }

  const getMedtypeByTypeId = (id) =>
  {
    return fetch('http://localhost:8080/api/doctor/medtypeById/'+id, {
      method: "GET"
    })
  }

  const createRecord = (record)=>
  {
    return fetch('http://localhost:8080/api/doctor/createRecord/', {
    method: "POST",
    body: JSON.stringify(record),
    headers: authHeader()
  })
  }

  const getFreeRecords = () =>
  {
    return fetch('http://localhost:8080/api/doctor/free', {
      method: "GET",
      headers: authHeader()
    })
  }

  const getBusyRecords = () =>
  {
    return fetch('http://localhost:8080/api/doctor/busy', {
      method: "GET",
      headers: authHeader()
    })
  }

  const getArchiveRecords = () =>
  {
    return fetch('http://localhost:8080/api/doctor/archive', {
      method: "GET",
      headers: authHeader()
    })
  }

  const deleteRecord = (id) =>{
    return fetch('http://localhost:8080/api/doctor/records/'+id, {
      method: "DELETE",
      headers: authHeader()
    })
  }

  export default {
    createRecord,
    getCategories,
    getMedtypeByTypeId,
    getFreeRecords,
    deleteRecord,
    getArchiveRecords,
    getBusyRecords
  };
