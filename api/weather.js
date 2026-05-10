export default async function handler(req, res) {
  try {
    const response = await fetch('https://wttr.in/Gua%C3%ADra,SP?format=j1');
    const data = await response.json();
    const current = data.current_condition[0];
    
    res.status(200).json({
      temp: current.temp_C + '°C',
      condition: current.lang_pt[0].value,
      icon: current.weatherIcon[0],
      humidity: current.humidity + '%',
      wind: current.windspeedKmph + ' km/h'
    });
  } catch (e) {
    res.status(200).json({ temp: 'N/D', condition: 'Indisponível' });
  }
}