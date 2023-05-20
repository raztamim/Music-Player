import {FaPlay} from "react-icons/fa"
import {GiPauseButton} from "react-icons/gi"
import {ImNext2} from "react-icons/im"
import {ImPrevious2} from "react-icons/im"
import useAudio from "../hooks/useAudio"


const Player = ({src,len,currSong,setCurrentsong}) =>{
    

    
    //set icons to display 
    const playButton = <FaPlay className="PlayerIcon" color="white "/>
    const puseButton = <GiPauseButton className="PlayerIcon" color="white"/>
    const prevButton = <ImPrevious2 className="PlayerIcon" color="white"/>
    const nextButton = <ImNext2 className="PlayerIcon" color="white" />

    const handlePrev = () =>{
        if(currSong!==0){setCurrentsong((curr) => curr-1)}} 
            
        
       
    const handleNext = () =>{
        if(currSong!==len){setCurrentsong((curr)=>curr+1)}

    }  

   const [playing, toggle] = useAudio(src,handleNext)

   
   

   
   

    return(
        <div className="PlayerContiner">
           <h1 className="text"> 
           
           <label className="PlayerIcon" onClick={()=>handlePrev()}>{prevButton}</label> 

           <label onClick={()=>toggle()}>{playing?(puseButton):(playButton)}</label> 

           <label className="PlayerIcon" onClick={()=>handleNext()}>{nextButton}</label></h1> 
        </div>
    )
}

export default Player