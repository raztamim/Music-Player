import { useState,useEffect } from "react" 
import SongIndex from "./SongIndex"
import SongDisplay from './SongDisplay'
import axios from 'axios'

const MainPage = (username) => {
    
    const [songList,setSongList] = useState([{}])
    const [currentSong,setCurrentsong] = useState(0)

    const [likedSongs,setLikedSongs] = useState([])
    const [recentlyPlayed,setRecentlyPlayed] = useState([])
    
    //functions 

    //get the username to use in the query to the server
    const getQuery = () =>{
        const value = Object.values(username)
        return value[0]
    }

    // check if a song is liked to set its state 
    const checkLiked = (song) =>{
         if(likedSongs.includes(song.title)){
            return true
         }
         else{
             return false
         }
          
    }
    
  

    useEffect(()=> {

           const query = getQuery()

            axios.get('songList').then((response)=>{
                setSongList(response.data)
            })

            axios.get('/likedSongs/'+query).then((response)=>{
                setLikedSongs(response.data)
                
            })

            axios.get('/recentlyPlayed/'+query).then((response)=>{
                setRecentlyPlayed(response.data)
               
            })
    },[])
    
   
    
    
    
    
    return(
        <>
        <div className="MainPageContiner">
            <SongIndex songList={songList} currentSong={currentSong} setCurrentsong={setCurrentsong}/>
        </div> 
         <div>
              {songList.map((song)=>(
              <SongDisplay key={song.id} username getQuery={getQuery} setLikedSongs={setLikedSongs} isLiked={checkLiked(song)} setRecentlyPlayed={setRecentlyPlayed} song={song} setCurrentsong={setCurrentsong}/>
             ))}
              
              {/*prints the lists of liked and played songs*/}
             <div className="listsDisplay">
                <label className="Title">Liked Songs:</label>
               {likedSongs.map((song)=>(
               <label key={song} className="SubTitle"><br/>{song}</label>
             ))} 
                 <br/>
                 <br/>
                 <br/>
                 <br/>

                 <label className="Title">Recently Played:</label>
               { recentlyPlayed.map((song)=>(
               <label key={song} className="SubTitle"><br/>{song}</label>
            ))}  
            
          </div>
            
        </div>
        </>
    )

}


export default MainPage