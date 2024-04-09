import React, { useState } from 'react'


let SCREENS = [
    {
        id: 1,
        time: "10:00am",
        seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1]
    },
    {
        id: 2,
        time: "2:00am",
        seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1]
    },
    {
        id: 3,
        time: "6:00am",
        seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1]
    },
];

const MOVIES = [
    {
        id: 1,
        title: "The Goat Life",
        image: "../src/assets/images/goatlife.jpg"
    },
    {
        id: 2,
        title: "Premalu",
        image: "../src/assets/images/premalu.jpg"
    },
    {
        id: 3,
        title: "Lover",
        image: "../src/assets/images/lover.jpg"
    },

]

const MovieBooking = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedScreen,setSelectedScreen]=useState(null);
    const[selectedSeats,setSelectedSeats]=useState([]);


    const handleSeatSelect=(index,screen)=>{
        if(screen?.id!==selectedScreen?.id){
            setSelectedSeats([index]);
            setSelectedScreen(screen);
            return

        }
        setSelectedScreen(screen)
        if(selectedSeats.includes(index)){
            setSelectedSeats(selectedSeats.filter((i)=>i !==index));
            if(selectedSeats.filter((i)=>i !==index).length<1){
                selectedScreen(null);
            }
        }
        else{
            setSelectedSeats((seats)=>[...seats,index])
        }
    }
const handleBooking=()=>{
    alert(`Seats ${selectedSeats.map((index)=>index+1).join(",")} booked for${selectedScreen.movie.title} at${selectedScreen.time}`)
  SCREENS=SCREENS.map(screen=>{
    if(screen.id===selectedScreen?.id){
        let seats =screen.seats;
        selectedSeats.map((seat)=>(seats[seat]=0))
        return {
            ...screen,
            seats
        }
    }
    return screen
})
setSelectedMovie(null)
setSelectedSeats(null)
setSelectedSeats(null)
}


    return (
        <div>
            <h1>Movie Booking App</h1>
            <h2>Choose Your Movie</h2>
            <div className='movie-selection'>
                {
                    MOVIES.map((movie) => (
                        <div className='movie' key={movie.id} onClick={() => setSelectedMovie(movie)}>
                            <img className='movie-poster' src={movie.image} alt={movie.title} />
                            <div className='movie-title'>{movie.title}</div>
                        </div>
                    ))
                }
            </div>
            {
                selectedMovie && (
                    <>
                        <h2>Choose Your Screen</h2>
                        <div className='screen-selection'>
                            {SCREENS.map((screen) => {
                                return (
                                    <div key={screen.id} className={`screen
                            ${screen?.id === selectedScreen?.id ? 'selected' : ''}
                            ${screen.seats.includes(1) ? 'available' : ''}`}
                                    >
                                        <div className='screen-number'>Screen{screen.id}</div>
                                        <div className='screen-time'>{screen.time}</div>
                                        <div className='movie-title'>{selectedMovie.title}</div>
                                        <div className='screen-seats'>
                                            {screen.seats.map((seat, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`seat ${seat ? 'availavle' : 'unavailabe'
                                                            } ${selectedSeats.includes(index)&&selectedScreen.id===screen.id?'selected':''}
                                                            $selectedSeats.includes(index)? "booked" :''`}
                                                            onClick={()=>{
                                                                if(seat){
                                                                    handleSeatSelect(index,
                                                                        {
                                                                         ...screen,
                                                                        movie:selectedMovie
                                                                        })
                                                                       
                                                                }
                                                            }}
                                                    >
                                                        <div className='seat-number'>{index+1}</div>

                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </>
                )}
                <div className='booking-summary'>
                    <div className='selected-screen'>
                        {
                            selectedScreen&&(
                                <div>
                                    <h3>Selected Screen:{selectedScreen.id}</h3>
                                    <p>Time:{selectedScreen.time}</p>
                                    <p>Movie:{selectedScreen.movie.title}</p>
                                    </div>
                            )
                        }
                    </div>
                    <div className='selected-seat'>
                        {selectedScreen&&selectedSeats?.length>0 &&(
                            <div>
                                <h3>
                                    Selected Seats:<>{selectedSeats.map(index=>index+1).join(",")}</></h3>
                                    <h3> No of Tickets:{selectedSeats?.length}</h3>
                                 </div>

                        )}
                    </div>

                </div>
                <button className='payment-button' onClick={handleBooking} disabled={!selectedScreen||selectedSeats.lenght==0}>
                    Book Now
                </button>
        </div>
    )
}

export default MovieBooking