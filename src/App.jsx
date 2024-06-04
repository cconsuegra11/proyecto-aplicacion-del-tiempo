import './App.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import WeatherCard from "./components/WeatherCard"

const key = `80f371d7f8f15ed6abbe126f294c1af6`

function App() {

  const [weather, setWeather] = useState()
  const [coords, setCoords] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const succes = (pos) => {
    setCoords ( {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
      })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
  }, [])
    
  useEffect(() => {
    if (coords) {
      const {lat, lon} = coords
        
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

      axios.get(url)
        .then(res => {
          const kel = res.data.main.temp
          const cel = (kel - 273.15).toFixed(2)
          const fah = (cel * 9/5 + 32).toFixed(2)
          setTemp({cel: cel, fah: fah})
          setWeather(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setTimeout(() => { setIsLoading(false) }, 1000)
        })
    }
  }, [coords])

  
  return (
    <div className='app'>
      {
        isLoading ? 
        <figure className='app_img'>
          <img src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"  alt='Está cargando'/>
        </figure> :
      <WeatherCard 
        weather = {weather}
        temp = {temp} />
      }
    </div>
  )
}

export default App;
