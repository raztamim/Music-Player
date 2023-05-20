import Player from "./Player"

const SongIndex = ({songList,currentSong,setCurrentsong}) =>{
    const song = songList[currentSong]  

    return(
     
        <div className="SongIndexContiner">
        <h1 className="Title">{song?.title}</h1>
        <label className="text">artist:  {song?.artist}</label>
        <label className="text">year:  {song?.year}</label>
        <label className="text">genere:  {song?.genere}</label>
        <img className="SongImg" src={song?.artwork} alt=""/>
        <Player len={songList.length} currSong={song?.id} src={song?.url} setCurrentsong={setCurrentsong}/>
        </div>

       
    )
}

export default SongIndex