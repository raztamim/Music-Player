import { useEffect, useState } from "react"
import {BsHeart,BsHeartFill} from "react-icons/bs"
import axios from 'axios'

const SongList = ({song,setCurrentsong,isLiked,username,getQuery,setLikedSongs,setRecentlyPlayed}) => {

  const [liked,setLiked] = useState(false)

 
 const query = getQuery()
 
 

 // set state of liked song on render
  useEffect(()=>{
      setLiked(isLiked)
  },[isLiked])
    

    const likedIcon = <BsHeart className="likedIcon"/>
    const notLikedIcon = <BsHeartFill className="likedIcon"/> 
    
    const switchSong = async ()=> {

      setCurrentsong(song.id-1)
      axios.post('/recentlyPlayed/'+query,{song:song.title}).then((response)=>{
        
        setRecentlyPlayed(response.data)
        
      })
      
    }
    const  handleLike = async (e) =>
    {       e.stopPropagation()
            setLiked((prev)=>!prev)
            if(liked===true){
             await axios.delete('/likedSongs/'+query,{data:{song:song.title}}).then((response)=>{
                  setLikedSongs(response.data)
             })
            }   
            else{
                await axios.post('/likedSongs/'+query,{song:song.title}).then((response)=>{
                  setLikedSongs(response.data)
                })
                
              
            }
    } 
    
    return (
        <div className="songList">
          <label className="songTitle" onClick={()=>switchSong()}>{song.title} 
          <br/> <label className="songSubTitle">{song.artist}
           {/*display liked icon */}
          <label onClick={(e)=>{handleLike(e)}}>
            {liked?(<label className="PlayerIcon">{notLikedIcon}</label>):
            (<label className="PlayerIcon">{likedIcon}</label>)}</label>
              </label></label>   
        
        </div>
    )
}


export default SongList