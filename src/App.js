import './Style.css';
import React from 'react';

  class Feature extends React.Component {
    constructor() {
        super();
        this.state = {
            prodData: [],
            prodConfig:[],
            currentTab: "1"
        }
    }

  function
    componentDidMount() {
        // recupero i dati del json li inserisco nello stato 
        fetch('https://jumpcomm.ams3.digitaloceanspaces.com/test-json/shirt-configurator.json')
        .then(response => response.json())
        .then((jsonData) => {
        
        console.log(jsonData)   
        
        this.setState({prodData: jsonData}); 
        })
        .catch((error) => {
            console.error(error)
        })
        window.addEventListener("hashchange", this.SetTab, false);
        this.SetTab()
    }

    // La funzione che mi fa il POST del json
    SaveData = () => {
      fetch('https://www.toptal.com/developers/postbin/b/1642417767819-6454468646552', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.state.prodConfig)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', JSON.stringify(response)))
    }

    // Funzione per settare il TAB
    SetTab = () =>{
      const location = window.location.hash;
      const currentTab = location.replace("#tab", "")
      if(currentTab == "1" || currentTab == "2" ) this.setState({currentTab : currentTab})
    }

    
    ToogleTab = (val) =>{
      this.setState({currentTab : val})
      // Andrebbe controllato se ci sono altri # nell'url
      window.location.hash = "#tab" + val
    }



    render() {

       
        const prodData = this.state.prodData; 

        return (
        <> 
        <button onClick={()=>{this.ToogleTab("1")}}>TAB 1</button> 
        <button onClick={()=>{this.ToogleTab("2")}}>TAB 2</button>
        <br></br>
        <br></br> 
        
        {/* Tab 1 */}
        {this.state.currentTab === "1" && 
        <>
        { prodData["shirt-configuration"] && 
          <div>
           {/* Feature Image */}
            {prodData["shirt-configuration"]["featured-image"] && Array.isArray(prodData["shirt-configuration"]["featured-image"]) &&
                <div>
                {prodData["shirt-configuration"]["featured-image"].map((item, index) => {
                      return(
                      <img key={index} src={item.photo} width={100} height={100}></img>)
                })}
                </div>                
            } 

            {/* Secondary Image */}
            {prodData["shirt-configuration"]["secondary-image"] && Array.isArray(prodData["shirt-configuration"]["secondary-image"]) &&
                <div>
                {prodData["shirt-configuration"]["secondary-image"].map((item, index) => {
                      return(
                      <img key={index} src={item.photo} width={100} height={100}></img>)
                })}
                </div>                
            } 

            <br></br>
            <br></br> 
             {/* description */}
            {prodData["shirt-configuration"]["description"]}

            <br></br>
            <br></br>

            {/* Size */}
            {prodData["shirt-configuration"]["size"] && Array.isArray(prodData["shirt-configuration"]["size"]) &&
                <>
                <span>Size: </span><select onChange={(event) => {this.setState({prodConfig:{...this.state.prodConfig, "size" : event.target.value }}, () => {console.log(this.state)}); 
              }} >
                {prodData["shirt-configuration"]["size"].map((item, index) => {
                      return(
                      <option key={index} value={item}>{item}</option>)
                })}
                </select> 
                </>               
            } 

            <br></br>
            <br></br>

           {/* Colors */}
           {prodData["shirt-configuration"]["colors"] && Array.isArray(prodData["shirt-configuration"]["colors"]) &&
                <>
                <span>Color: </span><select onChange={(event) => {this.setState({prodConfig:{...this.state.prodConfig, "colors" : event.target.value }}, () => {console.log(this.state)}); 
              }} >
                {prodData["shirt-configuration"]["colors"].map((item, index) => {
                      return(
                      <option key={index} value={item.slug}>{item.slug}</option>)
                })}
                </select> 
                </>               
            } 

            <br></br>
            <br></br>



        </div>
        }
        </>
    }

        {/* Tab 2 */}
        {this.state.currentTab === "2" && 
        <>
        { prodData["draw"] &&  
        
          <div>
            {/* Draw Image */}
            {prodData["draw"]["image"] && Array.isArray(prodData["draw"]["image"]) &&
                <div>
                {prodData["draw"]["image"].map((item, index) => {
                      return(
                      <img key={index} src={item.image} width={100} height={100}></img>)
                })}
                </div>                
            } 


            {/* Print Type */}
            {prodData["draw"]["print-type"] && Array.isArray(prodData["draw"]["print-type"]) &&
                
               <><span>Print Type: </span> <select onChange={(event) => {this.setState({prodConfig:{...this.state.prodConfig, "print-type" : event.target.value }}, () => {console.log(this.state)}); 
              }} >
                {prodData["draw"]["print-type"].map((item, index) => {
                      return(
                      <option key={index} value={item}>{item}</option>)
                })}
                </select>   
                </>             
            } 

            <br></br>
            <br></br>


          </div>



        } 
        </>
    }
        


        <button onClick={() =>{this.SaveData()}}>SALVA CONFIGURAZIONE</button>
        </>
      
          )
        }
    }
    
    export default Feature;