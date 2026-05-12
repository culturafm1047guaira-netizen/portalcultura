import path from 'path';
import { readdirSync } from 'fs';

export default function handler(req, res) {
  try {
    const publicitiesDir = path.join(process.cwd(), 'Publicidades');
    const files = readdirSync(publicitiesDir)
      .filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f))
      .map(f => `/Publicidades/${f}`);
    
    res.status(200).json(files);
  } catch (e) {
    res.status(200).json([]);
  }
}