class Adapter{
  constructor(baseURL){
    this.baseURL = baseURL
  }

  fetchAll(){
    return fetch(`${this.baseURL}`)
                .then(res => res.json())
  }
  patch(obj, id){
    fetch(`${this.baseURL}/${id}`,{
      method: "PATCH",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(obj)
    }).then(res => res.json())
      .then(json => console.log(json))

  }



}
