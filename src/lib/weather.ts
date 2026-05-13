export async function getWeatherData() {
  const location = 'Guaíra,SP';
  const encodedLocation = encodeURIComponent(location);
  
  try {
    const response = await fetch(`https://wttr.in/${encodedLocation}?format=j1`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) throw new Error('Weather fetch failed');
    
    const data = await response.json();
    const current = data.current_condition?.[0];
    const today = data.weather?.[0];
    
    if (!current || !today) throw new Error('Invalid weather data');
    
    return {
      temp: current.temp_C || '28',
      condition: current.lang_pt?.[0]?.value || current.weatherDesc?.[0]?.value || 'Ensolarado',
      feelsLike: current.FeelsLikeC || '30',
      max: today.maxtempC || '31',
      min: today.mintempC || '19',
      humidity: current.humidity ? current.humidity + '%' : '45%',
      wind: current.windspeedKmph ? current.windspeedKmph + ' km/h' : '10 km/h'
    };
  } catch (e) {
    console.error('Weather error:', e);
    return {
      temp: '28',
      condition: 'Ensolarado',
      feelsLike: '30',
      max: '31',
      min: '19',
      humidity: '45%',
      wind: '10 km/h'
    };
  }
}
