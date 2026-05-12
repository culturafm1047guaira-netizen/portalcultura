export default async function handler(req, res) {
  const location = process.env.WEATHER_LOCATION || 'Guaíra,SP';
  const encodedLocation = encodeURIComponent(location);
  
  try {
    const response = await fetch(`https://wttr.in/${encodedLocation}?format=j1`);
    if (!response.ok) return res.status(200).json({ temp: 'N/D', condition: 'Indisponível' });
    
    const data = await response.json();
    const current = data.current_condition?.[0];
    const today = data.weather?.[0];
    
    if (!current || !today) {
      return res.status(200).json({ temp: 'N/D', condition: 'Indisponível' });
    }
    
    res.status(200).json({
      temp: current.temp_C || 'N/D',
      condition: current.lang_pt?.[0]?.value || 'Indisponível',
      feelsLike: current.FeelsLikeC || 'N/D',
      max: today.maxtempC || 'N/D',
      min: today.mintempC || 'N/D',
      humidity: current.humidity ? current.humidity + '%' : 'N/D',
      wind: current.windspeedKmph ? current.windspeedKmph + ' km/h' : 'N/D'
    });
  } catch (e) {
    res.status(200).json({ temp: 'N/D', condition: 'Clima indisponível' });
  }
}