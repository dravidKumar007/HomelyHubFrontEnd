import './ListComp.css';
function ListComp({head, sub,loc,price}){
  
    return (

  <div className="contain">
    
    <div className='rel'><div>
    <img className='img' src={head} />
    

    <div className='hidden'>
     
    <h1>{sub}</h1>
    <h3>{loc}</h3>
    <p>$ <div>{price}</div> :per night</p>
    </div>
    <div className='txt'>
<center>
  {sub}
  </center>
    </div>
    </div>
    </div>


   

  </div>
       )
}

export default ListComp;