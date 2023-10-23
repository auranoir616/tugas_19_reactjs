import React, {Component} from "react"
import axios from "axios"
var h1={
  backgroundColor:"#faf36e",
  textAlign:"center"

}
var delet={
  backgroundColor:"red",
  border:"solid",
  borderRadius:"5px",
  padding:"10px",
  fontSize:"15px",
  width:"100px",
  margin:"10px",
  cursor: "pointer",
  fontWeight:"bold" 
 


}

var edit={
  backgroundColor:"yellow",
  border:"solid",
  borderRadius:"5px",
  padding:"10px",
  fontSize:"15px",
  width:"100px",
  margin:"10px",
  cursor: "pointer",
  fontWeight:"bold" 
 


}
var container={
  border:"solid 5px",
  width:"400px",
  margin:"15px 0 5px 15px",
  padding:"5px",
  fontSize:"20px",

}
var input={
  height:"20px",
  padding:"5px",
  margin: "2px"

}
var dropdown={
  height:"35px",
  padding:"5px",
  margin: "2px"

}
var save={
  backgroundColor:"#46f274",
  border:"solid",
  borderRadius:"5px",
  padding:"10px",
  fontSize:"15px",
  width:"100px",
  margin:"10px",
  cursor: "pointer",
  fontWeight:"bold" 
}
class App extends Component{

  constructor(props){
    super(props)
    this.state={
      dataAPI:[],

      dataPOST:{
      id:0,
      nama_karyawan: "",
      jabatan: "",
      jenis_kelamin: "",
      tanggal_lahir: ""
      },

      edit:false
    }
  }
  //load database
  loadData=()=>{
    axios.get('http://localhost:3001/data-karyawan').then(
      response=>{
        this.setState({
          dataAPI:response.data,
          edit:false
        })
      }
    )
  }
  //input ke database
  inputData=(e)=>{
    let newdataPOST = {...this.state.dataPOST}
    if(this.state.edit === false){
      newdataPOST["id"] = new Date().getTime()
    }
    newdataPOST[e.target.name] = e.target.value
    this.setState({
      dataPOST:newdataPOST
    })
  }
  //remove data
  removeData=(e)=>{
    console.log(e.target.value)
    axios.delete(` http://localhost:3001/data-karyawan/${e.target.value}`).then(
      response =>this.loadData()
      
    )
  }
  //clear input
  clearData=()=>{
    let newdataPOST = {...this.state.dataPOST}
    newdataPOST["id"]=""
    newdataPOST["nama_karyawan"]=""
    newdataPOST["jabatan"]=""
    newdataPOST["jenis_kelamin"]=""
    newdataPOST["tanggal_lahir"]=""
    this.setState({
      dataPOST:newdataPOST
    })

  }
  //edit data
  getDataId=(e)=>{
      axios.get(`http://localhost:3001/data-karyawan/${e.target.value}`).then(response=>{
     this.setState({
      dataPOST: response.data,
      edit: true
     })
      }) 
  }
submitData=()=>{
  if(this.state.edit === false){
    axios.post(`http://localhost:3001/data-karyawan/`,this.state.dataPOST).then(()=>{
      this.loadData()
      this.clearData()
    })
  }else{
    axios.put(`http://localhost:3001/data-karyawan/${this.state.dataPOST.id}`,this.state.dataPOST).then(()=>{
      this.loadData()
      this.clearData()
    })
  }
}
  componentDidMount(){
    this.loadData()
  }
  
  render(){
    return(
      <div>
        <h1 style={h1}>data karyawan</h1>
        <input style={input} type="text" name="nama_karyawan" placeholder="masukkan nama" value={this.state.dataPOST.nama_karyawan} onChange={this.inputData} />
        <input style={input} type="text" name="jabatan" placeholder="masukkan jabatan" value={this.state.dataPOST.jabatan} onChange={this.inputData} />
        <select style={dropdown} value={this.state.dataPOST.jenis_kelamin} onChange={this.inputData} name="jenis_kelamin">
          <option  value="" disabled>pilih jenis kelamin</option>
          <option >Laki-laki</option>
          <option >Perempuan</option>
        </select>
        <input style={input} type="date" name="tanggal_lahir" placeholder="masukkan tanggal lahir" value={this.state.dataPOST.tanggal_lahir} onChange={this.inputData} />
        <button onClick={this.submitData} type="submit" style={save}>save data</button>

      {this.state.dataAPI.map((data,index)=>
      {
        return(
          <div key={index} style={container}>
            <table>
              <tr>
              <td>nama</td>
              <td>:</td>
              <td>{data.nama_karyawan}</td>
              </tr>
              <tr>
              <td>jabatan</td>
              <td>:</td>
              <td>{data.jabatan}</td>
              </tr>
              <tr>
              <td>jenis kelamin</td>
              <td>:</td>
              <td>{data.jenis_kelamin}</td>
              </tr>
              <tr>
              <td>tanggal lahir</td>
              <td>:</td>
              <td>{data.tanggal_lahir}</td>
              </tr>
            </table>
            <hr/>
          <button onClick={this.removeData} value={data.id} style={delet}>delete</button>
          <button onClick={this.getDataId} value={data.id} style={edit}>edit data</button>
          </div>
        )
      }
      )}
      </div>
    )
  }
}

export default App

